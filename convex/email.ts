"use node"

import { v } from "convex/values"
import { action } from "./_generated/server"
import { Inbound } from "inboundemail"
import { render } from "@react-email/components"
import { ExtensionApproved } from "../emails/ExtensionApproved"
import { ExtensionRejected } from "../emails/ExtensionRejected"

const FROM_EMAIL = "OpenCode Cafe <hello@opencode.cafe>"

export const sendApprovalEmail = action({
  args: {
    to: v.string(),
    authorName: v.string(),
    extensionName: v.string(),
    productId: v.string(),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.INBOUND_API_KEY
    if (!apiKey) {
      console.error("INBOUND_API_KEY not set")
      return { success: false, error: "Email service not configured" }
    }

    const inbound = new Inbound({ apiKey })

    try {
      const html = await render(
        ExtensionApproved({
          authorName: args.authorName,
          extensionName: args.extensionName,
          productId: args.productId,
        })
      )

      const response = await inbound.emails.send({
        from: FROM_EMAIL,
        to: args.to,
        subject: `Your extension "${args.extensionName}" has been approved`,
        html,
      })

      console.log("Approval email sent:", response.id)
      return { success: true, emailId: response.id }
    } catch (err) {
      console.error("Error sending approval email:", err)
      return { success: false, error: String(err) }
    }
  },
})

export const sendRejectionEmail = action({
  args: {
    to: v.string(),
    authorName: v.string(),
    extensionName: v.string(),
    productId: v.string(),
    rejectionReason: v.string(),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.INBOUND_API_KEY
    if (!apiKey) {
      console.error("INBOUND_API_KEY not set")
      return { success: false, error: "Email service not configured" }
    }

    const inbound = new Inbound({ apiKey })

    try {
      const html = await render(
        ExtensionRejected({
          authorName: args.authorName,
          extensionName: args.extensionName,
          productId: args.productId,
          rejectionReason: args.rejectionReason,
        })
      )

      const response = await inbound.emails.send({
        from: FROM_EMAIL,
        to: args.to,
        subject: `Update on your extension "${args.extensionName}"`,
        html,
      })

      console.log("Rejection email sent:", response.id)
      return { success: true, emailId: response.id }
    } catch (err) {
      console.error("Error sending rejection email:", err)
      return { success: false, error: String(err) }
    }
  },
})
