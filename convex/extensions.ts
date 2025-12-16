import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const submit = mutation({
  args: {
    productId: v.string(),
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
    displayName: v.string(),
    description: v.string(),
    repoUrl: v.string(),
    homepageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    installation: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    // Validate productId format (lowercase letters and hyphens only)
    if (!/^[a-z][a-z-]*[a-z]$|^[a-z]$/.test(args.productId)) {
      throw new Error("Product ID must contain only lowercase letters and hyphens, and start/end with a letter")
    }

    // Check if productId already exists
    const existing = await ctx.db
      .query("extensions")
      .withIndex("by_productId", (q) => q.eq("productId", args.productId))
      .first()

    if (existing) {
      throw new Error("An extension with this Product ID already exists")
    }

    // Create the extension
    const now = Date.now()
    const extensionId = await ctx.db.insert("extensions", {
      productId: args.productId,
      type: args.type,
      displayName: args.displayName,
      description: args.description,
      repoUrl: args.repoUrl,
      homepageUrl: args.homepageUrl || undefined,
      tags: args.tags,
      installation: args.installation,
      author: {
        userId: identity.subject,
        name: identity.name || "Anonymous",
        email: identity.email || "",
      },
      status: "pending",
      createdAt: now,
      updatedAt: now,
    })

    return extensionId
  },
})

export const getByProductId = query({
  args: { productId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("extensions")
      .withIndex("by_productId", (q) => q.eq("productId", args.productId))
      .first()
  },
})

export const listApproved = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("extensions")
      .withIndex("by_status", (q) => q.eq("status", "approved"))
      .collect()
  },
})

export const listByAuthor = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return []
    }

    return await ctx.db
      .query("extensions")
      .withIndex("by_author", (q) => q.eq("author.userId", identity.subject))
      .collect()
  },
})

export const checkProductIdAvailable = query({
  args: { productId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("extensions")
      .withIndex("by_productId", (q) => q.eq("productId", args.productId))
      .first()

    return !existing
  },
})

export const update = mutation({
  args: {
    extensionId: v.id("extensions"),
    displayName: v.string(),
    description: v.string(),
    repoUrl: v.string(),
    homepageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    installation: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    // Get the existing extension
    const extension = await ctx.db.get(args.extensionId)
    if (!extension) {
      throw new Error("Extension not found")
    }

    // Check if user is the author
    if (extension.author.userId !== identity.subject) {
      throw new Error("You can only edit your own extensions")
    }

    // Update the extension
    // If the extension was previously approved, reset to pending for re-review
    const newStatus = extension.status === "approved" ? "pending" : extension.status

    await ctx.db.patch(args.extensionId, {
      displayName: args.displayName,
      description: args.description,
      repoUrl: args.repoUrl,
      homepageUrl: args.homepageUrl || undefined,
      tags: args.tags,
      installation: args.installation,
      status: newStatus,
      updatedAt: Date.now(),
      // Clear review data if status changes
      ...(newStatus !== extension.status && {
        rejectionReason: undefined,
        reviewedAt: undefined,
        reviewedBy: undefined,
      }),
    })

    return { success: true, newStatus }
  },
})

export const getById = query({
  args: { extensionId: v.id("extensions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.extensionId)
  },
})
