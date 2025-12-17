"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import type { Id } from "@/convex/_generated/dataModel"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface CommentFormProps {
  extensionId: Id<"extensions">
  parentId?: Id<"comments">
  onSuccess?: () => void
  onCancel?: () => void
  placeholder?: string
  autoFocus?: boolean
}

export function CommentForm({
  extensionId,
  parentId,
  onSuccess,
  onCancel,
  placeholder = "Write a comment... (Markdown supported)",
  autoFocus = false,
}: CommentFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addComment = useMutation(api.comments.add)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      await addComment({
        extensionId,
        parentId,
        content: content.trim(),
      })
      setContent("")
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post comment")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="min-h-[100px] resize-y"
        autoFocus={autoFocus}
        disabled={isSubmitting}
      />
      {error && (
        <p className="text-sm text-[var(--color-danger)]">{error}</p>
      )}
      <div className="flex items-center justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting ? "Posting..." : parentId ? "Reply" : "Comment"}
        </Button>
      </div>
    </form>
  )
}
