import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { api } from "./_generated/api"

// Rate limit configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_COMMENTS_PER_WINDOW = 10

// Add a new comment or reply
export const add = mutation({
  args: {
    extensionId: v.id("extensions"),
    parentId: v.optional(v.id("comments")),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("You must be signed in to comment")
    }

    // Validate content
    const trimmedContent = args.content.trim()
    if (!trimmedContent) {
      throw new Error("Comment cannot be empty")
    }
    if (trimmedContent.length > 5000) {
      throw new Error("Comment is too long (max 5000 characters)")
    }

    // Rate limiting check
    const now = Date.now()
    const windowStart = now - RATE_LIMIT_WINDOW_MS

    const recentComments = await ctx.db
      .query("rateLimits")
      .withIndex("by_user_action", (q) =>
        q.eq("userId", identity.subject).eq("action", "comment")
      )
      .filter((q) => q.gte(q.field("timestamp"), windowStart))
      .collect()

    if (recentComments.length >= MAX_COMMENTS_PER_WINDOW) {
      throw new Error(
        "Rate limit exceeded. You can post up to 10 comments per hour. Please try again later."
      )
    }

    // Record this comment for rate limiting
    await ctx.db.insert("rateLimits", {
      userId: identity.subject,
      action: "comment",
      timestamp: now,
    })

    // Verify extension exists
    const extension = await ctx.db.get(args.extensionId)
    if (!extension) {
      throw new Error("Extension not found")
    }

    // If replying, verify parent comment exists and belongs to same extension
    if (args.parentId) {
      const parentComment = await ctx.db.get(args.parentId)
      if (!parentComment) {
        throw new Error("Parent comment not found")
      }
      if (parentComment.extensionId !== args.extensionId) {
        throw new Error("Invalid parent comment")
      }
      // Don't allow nested replies (only one level deep)
      if (parentComment.parentId) {
        throw new Error("Cannot reply to a reply")
      }
    }

    // Create the comment
    const authorName = identity.name || "Anonymous"

    const commentId = await ctx.db.insert("comments", {
      extensionId: args.extensionId,
      parentId: args.parentId,
      content: trimmedContent,
      author: {
        userId: identity.subject,
        name: authorName,
      },
      createdAt: now,
    })

    // Send notification email to extension author (if not commenting on own extension)
    if (extension.author.userId !== identity.subject && !args.parentId) {
      await ctx.scheduler.runAfter(0, api.email.sendNewCommentEmail, {
        to: extension.author.email,
        authorName: extension.author.name,
        extensionName: extension.displayName,
        productId: extension.productId,
        commenterName: authorName,
        commentPreview:
          trimmedContent.length > 200
            ? trimmedContent.slice(0, 200) + "..."
            : trimmedContent,
      })
    }

    return commentId
  },
})

// Remove (soft delete) a comment
export const remove = mutation({
  args: {
    commentId: v.id("comments"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const comment = await ctx.db.get(args.commentId)
    if (!comment) {
      throw new Error("Comment not found")
    }

    // Only the comment author can delete their own comment
    // (Admin deletion is handled in admin.ts)
    if (comment.author.userId !== identity.subject) {
      throw new Error("You can only delete your own comments")
    }

    // Soft delete to preserve thread structure
    await ctx.db.patch(args.commentId, {
      isDeleted: true,
    })

    return { success: true }
  },
})

// List all comments for an extension (with like counts)
export const listByExtension = query({
  args: {
    extensionId: v.id("extensions"),
    sortBy: v.optional(v.union(v.literal("newest"), v.literal("oldest"), v.literal("popular"))),
  },
  handler: async (ctx, args) => {
    const sortBy = args.sortBy ?? "newest"

    // Get all comments for this extension
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_extension", (q) => q.eq("extensionId", args.extensionId))
      .collect()

    // Get like counts for all comments
    const commentIds = comments.map((c) => c._id)
    const allLikes = await Promise.all(
      commentIds.map((id) =>
        ctx.db
          .query("commentLikes")
          .withIndex("by_comment", (q) => q.eq("commentId", id))
          .collect()
      )
    )

    // Create a map of comment ID to like count
    const likeCounts = new Map<string, number>()
    commentIds.forEach((id, i) => {
      likeCounts.set(id, allLikes[i].length)
    })

    // Enrich comments with like counts
    const enrichedComments = comments.map((comment) => ({
      ...comment,
      likeCount: likeCounts.get(comment._id) ?? 0,
    }))

    // Separate top-level and replies
    const topLevel = enrichedComments.filter((c) => !c.parentId)
    const replies = enrichedComments.filter((c) => c.parentId)

    // Sort top-level comments
    if (sortBy === "newest") {
      topLevel.sort((a, b) => b.createdAt - a.createdAt)
    } else if (sortBy === "oldest") {
      topLevel.sort((a, b) => a.createdAt - b.createdAt)
    } else if (sortBy === "popular") {
      topLevel.sort((a, b) => b.likeCount - a.likeCount)
    }

    // Sort replies by oldest first (chronological within thread)
    replies.sort((a, b) => a.createdAt - b.createdAt)

    // Group replies by parent
    const repliesByParent = new Map<string, typeof replies>()
    replies.forEach((reply) => {
      const parentId = reply.parentId!
      if (!repliesByParent.has(parentId)) {
        repliesByParent.set(parentId, [])
      }
      repliesByParent.get(parentId)!.push(reply)
    })

    // Build threaded structure
    const threaded = topLevel.map((comment) => ({
      ...comment,
      replies: repliesByParent.get(comment._id) ?? [],
    }))

    return threaded
  },
})

// Get comment count for an extension
export const getCount = query({
  args: {
    extensionId: v.id("extensions"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_extension", (q) => q.eq("extensionId", args.extensionId))
      .filter((q) => q.neq(q.field("isDeleted"), true))
      .collect()

    return comments.length
  },
})

// Toggle like on a comment
export const toggleLike = mutation({
  args: {
    commentId: v.id("comments"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("You must be signed in to like comments")
    }

    // Verify comment exists
    const comment = await ctx.db.get(args.commentId)
    if (!comment) {
      throw new Error("Comment not found")
    }

    // Check if user already liked
    const existingLike = await ctx.db
      .query("commentLikes")
      .withIndex("by_user_comment", (q) =>
        q.eq("userId", identity.subject).eq("commentId", args.commentId)
      )
      .first()

    if (existingLike) {
      // Unlike
      await ctx.db.delete(existingLike._id)
      return { liked: false }
    } else {
      // Like
      await ctx.db.insert("commentLikes", {
        commentId: args.commentId,
        userId: identity.subject,
        createdAt: Date.now(),
      })
      return { liked: true }
    }
  },
})

// Get which comments the current user has liked (for UI state)
export const getUserLikes = query({
  args: {
    extensionId: v.id("extensions"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return []
    }

    // Get all comments for this extension
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_extension", (q) => q.eq("extensionId", args.extensionId))
      .collect()

    // Get user's likes for these comments
    const likes = await Promise.all(
      comments.map((comment) =>
        ctx.db
          .query("commentLikes")
          .withIndex("by_user_comment", (q) =>
            q.eq("userId", identity.subject).eq("commentId", comment._id)
          )
          .first()
      )
    )

    // Return IDs of liked comments
    return comments
      .filter((_, i) => likes[i] !== null)
      .map((comment) => comment._id)
  },
})
