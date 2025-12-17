"use client"

import { useState } from "react"
import { useQuery } from "convex/react"
import { Authenticated, Unauthenticated } from "convex/react"
import Link from "next/link"
import type { Id } from "@/convex/_generated/dataModel"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { CommentForm } from "./comment-form"
import { CommentCard } from "./comment-card"

type SortOption = "newest" | "oldest" | "popular"

interface CommentSectionProps {
  extensionId: Id<"extensions">
}

export function CommentSection({ extensionId }: CommentSectionProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest")

  const comments = useQuery(api.comments.listByExtension, { extensionId, sortBy })
  const userLikes = useQuery(api.comments.getUserLikes, { extensionId })
  const isAdmin = useQuery(api.admin.isAdmin)

  // Get current user ID from the first comment's context or from likes query
  // We need to get identity info another way - through Clerk
  const identity = useQuery(api.admin.debugIdentity)
  const currentUserId = identity?.subject

  const likedCommentIds = new Set(userLikes ?? [])

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "popular", label: "Popular" },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Comment Form - Only for authenticated users */}
      <Authenticated>
        <CommentForm extensionId={extensionId} />
      </Authenticated>

      <Unauthenticated>
        <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4 text-center">
          <p className="mb-3 text-sm text-[var(--color-text)]">
            Sign in to join the discussion
          </p>
          <Link href="/sign-in">
            <Button size="sm">Sign In</Button>
          </Link>
        </div>
      </Unauthenticated>

      {/* Sort Filter */}
      {comments && comments.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-weak)]">Sort by:</span>
          <div className="flex gap-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`rounded px-2 py-1 text-xs transition-colors ${
                  sortBy === option.value
                    ? "bg-[var(--color-bg-strong)] text-[var(--color-text-inverted)]"
                    : "text-[var(--color-text-weak)] hover:bg-[var(--color-bg-weak)] hover:text-[var(--color-text)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comments List */}
      {comments === undefined ? (
        <div className="py-8 text-center">
          <p className="text-sm text-[var(--color-text-weak)]">Loading comments...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="rounded border border-dashed border-[var(--color-border-weak)] py-12 text-center">
          <p className="text-sm text-[var(--color-text-weak)]">
            No comments yet. Be the first to start the discussion!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              extensionId={extensionId}
              currentUserId={currentUserId}
              isAdmin={isAdmin ?? false}
              isLiked={likedCommentIds.has(comment._id)}
              isAuthenticated={!!currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
