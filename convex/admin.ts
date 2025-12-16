import { v } from "convex/values"
import { mutation, query, QueryCtx, MutationCtx } from "./_generated/server"

// Helper to check if user is admin based on Clerk metadata
async function checkIsAdmin(ctx: QueryCtx | MutationCtx): Promise<boolean> {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) return false
  
  // Check for admin role in Clerk public metadata (snake_case from JWT)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metadata = (identity as any).public_metadata as { role?: string } | undefined
  return metadata?.role === "admin"
}

// Query to check if current user is admin (for UI)
export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    return await checkIsAdmin(ctx)
  },
})

// Debug query to see what's in the identity object
export const debugIdentity = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    return identity
  },
})

// List all pending extensions (admin only)
export const listPending = query({
  args: {},
  handler: async (ctx) => {
    const admin = await checkIsAdmin(ctx)
    if (!admin) {
      throw new Error("Unauthorized: Admin access required")
    }

    return await ctx.db
      .query("extensions")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect()
  },
})

// List all extensions with optional status filter (admin only)
export const listAll = query({
  args: {
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    )),
  },
  handler: async (ctx, args) => {
    const admin = await checkIsAdmin(ctx)
    if (!admin) {
      throw new Error("Unauthorized: Admin access required")
    }

    if (args.status) {
      return await ctx.db
        .query("extensions")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect()
    }

    return await ctx.db.query("extensions").collect()
  },
})

// Get extension counts by status (admin only)
export const getCounts = query({
  args: {},
  handler: async (ctx) => {
    const admin = await checkIsAdmin(ctx)
    if (!admin) {
      throw new Error("Unauthorized: Admin access required")
    }

    const all = await ctx.db.query("extensions").collect()
    
    return {
      pending: all.filter((e) => e.status === "pending").length,
      approved: all.filter((e) => e.status === "approved").length,
      rejected: all.filter((e) => e.status === "rejected").length,
      total: all.length,
    }
  },
})

// Approve an extension (admin only)
export const approve = mutation({
  args: {
    extensionId: v.id("extensions"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    const admin = await checkIsAdmin(ctx)
    if (!admin || !identity) {
      throw new Error("Unauthorized: Admin access required")
    }

    const extension = await ctx.db.get(args.extensionId)
    if (!extension) {
      throw new Error("Extension not found")
    }

    await ctx.db.patch(args.extensionId, {
      status: "approved",
      rejectionReason: undefined,
      reviewedAt: Date.now(),
      reviewedBy: identity.email || identity.subject,
    })

    return { success: true }
  },
})

// Reject an extension with reason (admin only)
export const reject = mutation({
  args: {
    extensionId: v.id("extensions"),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    const admin = await checkIsAdmin(ctx)
    if (!admin || !identity) {
      throw new Error("Unauthorized: Admin access required")
    }

    const extension = await ctx.db.get(args.extensionId)
    if (!extension) {
      throw new Error("Extension not found")
    }

    await ctx.db.patch(args.extensionId, {
      status: "rejected",
      rejectionReason: args.reason,
      reviewedAt: Date.now(),
      reviewedBy: identity.email || identity.subject,
    })

    return { success: true }
  },
})

// Delete an extension (admin only)
export const deleteExtension = mutation({
  args: {
    extensionId: v.id("extensions"),
  },
  handler: async (ctx, args) => {
    const admin = await checkIsAdmin(ctx)
    if (!admin) {
      throw new Error("Unauthorized: Admin access required")
    }

    const extension = await ctx.db.get(args.extensionId)
    if (!extension) {
      throw new Error("Extension not found")
    }

    await ctx.db.delete(args.extensionId)

    return { success: true }
  },
})
