import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  // Rate limiting table
  rateLimits: defineTable({
    userId: v.string(),
    action: v.string(),
    timestamp: v.number(),
  })
    .index("by_user_action", ["userId", "action"])
    .index("by_timestamp", ["timestamp"]),

  extensions: defineTable({
    // Unique product identifier (lowercase, hyphens only)
    productId: v.string(),
    // Extension type
    type: v.union(
      v.literal("mcp-server"),
      v.literal("slash-command"),
      v.literal("hook"),
      v.literal("theme"),
      v.literal("web-view"),
      v.literal("plugin"),
      v.literal("fork"),
      v.literal("tool")
    ),
    // Display name
    displayName: v.string(),
    // Short description
    description: v.string(),
    // Repository URL
    repoUrl: v.string(),
    // Optional homepage URL
    homepageUrl: v.optional(v.string()),
    // Tags (array of strings)
    tags: v.array(v.string()),
    // Installation instructions (markdown)
    installation: v.string(),
    // Author information
    author: v.object({
      userId: v.string(),
      name: v.string(),
      email: v.string(),
    }),
    // Submission status
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    // Review information (set when approved/rejected)
    rejectionReason: v.optional(v.string()),
    reviewedAt: v.optional(v.number()),
    reviewedBy: v.optional(v.string()),
    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_productId", ["productId"])
    .index("by_type", ["type"])
    .index("by_status", ["status"])
    .index("by_author", ["author.userId"]),

  // Comments on extensions
  comments: defineTable({
    // Reference to the extension
    extensionId: v.id("extensions"),
    // Optional parent comment for replies (null = top-level)
    parentId: v.optional(v.id("comments")),
    // Comment content (markdown)
    content: v.string(),
    // Author information
    author: v.object({
      userId: v.string(),
      name: v.string(),
    }),
    // Soft delete support
    isDeleted: v.optional(v.boolean()),
    // Timestamp
    createdAt: v.number(),
  })
    .index("by_extension", ["extensionId"])
    .index("by_parent", ["parentId"])
    .index("by_author", ["author.userId"]),

  // Comment likes (separate table for efficient counting/toggling)
  commentLikes: defineTable({
    commentId: v.id("comments"),
    userId: v.string(),
    createdAt: v.number(),
  })
    .index("by_comment", ["commentId"])
    .index("by_user_comment", ["userId", "commentId"]),
})
