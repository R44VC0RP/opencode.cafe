"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import ReactMarkdown from "react-markdown"
import { Heart, MessageSquare, Trash2 } from "lucide-react"
import type { Id } from "@/convex/_generated/dataModel"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { CommentForm } from "./comment-form"

interface CommentData {
  _id: Id<"comments">
  content: string
  author: {
    userId: string
    name: string
  }
  isDeleted?: boolean
  createdAt: number
  likeCount: number
  replies?: CommentData[]
}

interface CommentCardProps {
  comment: CommentData
  extensionId: Id<"extensions">
  currentUserId?: string
  isAdmin?: boolean
  isLiked?: boolean
  isAuthenticated?: boolean
  isReply?: boolean
}

export function CommentCard({
  comment,
  extensionId,
  currentUserId,
  isAdmin,
  isLiked = false,
  isAuthenticated = false,
  isReply = false,
}: CommentCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [liked, setLiked] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(comment.likeCount)

  const removeComment = useMutation(api.comments.remove)
  const adminDeleteComment = useMutation(api.admin.deleteComment)
  const toggleLike = useMutation(api.comments.toggleLike)

  const isOwner = currentUserId === comment.author.userId
  const canDelete = isOwner || isAdmin

  const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return

    setIsDeleting(true)
    try {
      if (isAdmin && !isOwner) {
        await adminDeleteComment({ commentId: comment._id })
      } else {
        await removeComment({ commentId: comment._id })
      }
    } catch (err) {
      console.error("Failed to delete comment:", err)
      alert("Failed to delete comment")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleLike = async () => {
    if (!isAuthenticated) return

    // Optimistic update
    const newLiked = !liked
    setLiked(newLiked)
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1))

    try {
      await toggleLike({ commentId: comment._id })
    } catch (err) {
      // Revert on error
      setLiked(!newLiked)
      setLikeCount((prev) => (newLiked ? prev - 1 : prev + 1))
      console.error("Failed to toggle like:", err)
    }
  }

  if (comment.isDeleted) {
    return (
      <div className={`${isReply ? "ml-8 border-l-2 border-[var(--color-border-weak)] pl-4" : ""}`}>
        <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
          <p className="text-sm italic text-[var(--color-text-weak)]">
            [Comment deleted]
          </p>
        </div>
        {/* Still show replies if any */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 flex flex-col gap-3">
            {comment.replies.map((reply) => (
              <CommentCard
                key={reply._id}
                comment={reply}
                extensionId={extensionId}
                currentUserId={currentUserId}
                isAdmin={isAdmin}
                isAuthenticated={isAuthenticated}
                isReply
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`${isReply ? "ml-8 border-l-2 border-[var(--color-border-weak)] pl-4" : ""}`}>
      <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg)] p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--color-text-strong)]">
              {comment.author.name}
            </span>
            <span className="text-xs text-[var(--color-text-weak)]">
              {formattedDate}
            </span>
          </div>
          {canDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-7 px-2 text-[var(--color-text-weak)] hover:text-[var(--color-danger)]"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-2 text-sm leading-relaxed text-[var(--color-text)] last:mb-0">
                  {children}
                </p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-[var(--color-text-strong)] underline underline-offset-2 hover:text-[var(--color-text)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              code: ({ children, className }) => {
                const isBlock = className?.includes("language-")
                if (isBlock) {
                  return (
                    <pre className="my-2 overflow-x-auto rounded bg-[var(--color-bg-weak)] p-3 text-sm">
                      <code className="text-[var(--color-text)]">{children}</code>
                    </pre>
                  )
                }
                return (
                  <code className="rounded bg-[var(--color-bg-weak)] px-1.5 py-0.5 text-sm text-[var(--color-text-strong)]">
                    {children}
                  </code>
                )
              },
              pre: ({ children }) => <>{children}</>,
              ul: ({ children }) => (
                <ul className="mb-2 list-inside list-disc space-y-1 text-sm text-[var(--color-text)]">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-2 list-inside list-decimal space-y-1 text-sm text-[var(--color-text)]">
                  {children}
                </ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-2 border-l-2 border-[var(--color-border)] pl-3 text-sm italic text-[var(--color-text-weak)]">
                  {children}
                </blockquote>
              ),
            }}
          >
            {comment.content}
          </ReactMarkdown>
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center gap-4 border-t border-[var(--color-border-weak)] pt-3">
          <button
            onClick={handleLike}
            disabled={!isAuthenticated}
            className={`flex items-center gap-1.5 text-xs transition-colors ${
              isAuthenticated
                ? "cursor-pointer hover:text-[var(--color-text-strong)]"
                : "cursor-default"
            } ${liked ? "text-[var(--color-text-strong)]" : "text-[var(--color-text-weak)]"}`}
            title={isAuthenticated ? (liked ? "Unlike" : "Like") : "Sign in to like"}
          >
            <Heart
              className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`}
            />
            <span>{likeCount}</span>
          </button>

          {!isReply && isAuthenticated && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1.5 text-xs text-[var(--color-text-weak)] transition-colors hover:text-[var(--color-text-strong)]"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Reply</span>
            </button>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="ml-8 mt-3 border-l-2 border-[var(--color-border-weak)] pl-4">
          <CommentForm
            extensionId={extensionId}
            parentId={comment._id}
            placeholder="Write a reply..."
            autoFocus
            onSuccess={() => setShowReplyForm(false)}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 flex flex-col gap-3">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply._id}
              comment={reply}
              extensionId={extensionId}
              currentUserId={currentUserId}
              isAdmin={isAdmin}
              isAuthenticated={isAuthenticated}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  )
}
