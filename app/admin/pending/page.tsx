"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery, useMutation } from "convex/react"
import { ExternalLink, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"

import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const TYPE_LABELS: Record<string, string> = {
  "mcp-server": "MCP Server",
  "slash-command": "Slash Command",
  hook: "Hook",
  theme: "Theme",
  "web-view": "Web View",
  plugin: "Plugin",
  fork: "Fork",
  tool: "Tool",
}

export default function AdminPendingPage() {
  const isAdmin = useQuery(api.admin.isAdmin)
  // Only fetch pending extensions after confirming user is admin
  const pendingExtensions = useQuery(api.admin.listPending, isAdmin ? {} : "skip")
  const approve = useMutation(api.admin.approve)
  const reject = useMutation(api.admin.reject)

  const [rejectingId, setRejectingId] = useState<Id<"extensions"> | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Header />
        <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
          <div className="mx-auto max-w-[67.5rem]">
            <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">Access Denied</h1>
          </div>
        </section>
        <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
          <div className="mx-auto max-w-[67.5rem]">
            <p className="text-[var(--color-text)]">You do not have permission to access this page.</p>
          </div>
        </main>
      </div>
    )
  }

  if (isAdmin === undefined || pendingExtensions === undefined) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Header />
        <div className="mx-auto max-w-[67.5rem] px-[var(--padding)] py-[var(--vertical-padding)]">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded bg-[var(--color-bg-weak)]" />
            <div className="mt-8 flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 rounded-md border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  async function handleApprove(extensionId: Id<"extensions">) {
    setIsSubmitting(true)
    try {
      await approve({ extensionId })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleReject() {
    if (!rejectingId || !rejectReason.trim()) return
    setIsSubmitting(true)
    try {
      await reject({ extensionId: rejectingId, reason: rejectReason.trim() })
      setRejectingId(null)
      setRejectReason("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      <div className="mx-auto max-w-[67.5rem] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mb-8">
          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--color-text-weak)] hover:text-[var(--color-text)]"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">Pending Review</h1>
          <p className="mt-1 text-sm text-[var(--color-text-weak)]">
            {pendingExtensions.length === 0
              ? "No extensions pending review"
              : `${pendingExtensions.length} extension${pendingExtensions.length === 1 ? "" : "s"} awaiting review`}
          </p>
        </div>

        {pendingExtensions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="mb-4 size-12 text-[var(--color-success)]" />
              <h2 className="text-lg font-medium text-[var(--color-text-strong)]">All caught up!</h2>
              <p className="text-sm text-[var(--color-text-weak)]">There are no extensions waiting for review.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-6">
            {pendingExtensions.map((ext) => (
              <Card key={ext._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {ext.displayName}
                        <Badge variant="secondary">{TYPE_LABELS[ext.type] || ext.type}</Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        <span className="font-mono text-xs">{ext.productId}</span>
                        <span className="mx-2">·</span>
                        by {ext.author.name}
                        <span className="mx-2">·</span>
                        submitted {new Date(ext.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={ext.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[var(--color-text-weak)] hover:text-[var(--color-text)]"
                      >
                        Repository <ExternalLink className="size-3" />
                      </a>
                      {ext.homepageUrl && (
                        <a
                          href={ext.homepageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-weak)] hover:text-[var(--color-text)]"
                        >
                          Homepage <ExternalLink className="size-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-1 text-sm font-medium text-[var(--color-text-strong)]">Description</h3>
                      <p className="text-sm text-[var(--color-text)]">{ext.description}</p>
                    </div>
                    {ext.tags.length > 0 && (
                      <div>
                        <h3 className="mb-1 text-sm font-medium text-[var(--color-text-strong)]">Tags</h3>
                        <div className="flex flex-wrap gap-1">
                          {ext.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <h3 className="mb-1 text-sm font-medium text-[var(--color-text-strong)]">Installation</h3>
                      <div className="prose prose-sm max-w-none rounded-md border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
                        <ReactMarkdown>{ext.installation}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRejectingId(ext._id)
                      setRejectReason("")
                    }}
                    disabled={isSubmitting}
                  >
                    <XCircle className="size-4" />
                    Reject
                  </Button>
                  <Button onClick={() => handleApprove(ext._id)} disabled={isSubmitting}>
                    <CheckCircle className="size-4" />
                    Approve
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Rejection Dialog */}
      <Dialog open={rejectingId !== null} onOpenChange={() => setRejectingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Extension</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this extension. This will be visible to the author.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 py-4">
            <Label htmlFor="reason">Rejection Reason</Label>
            <Textarea
              id="reason"
              placeholder="e.g., Missing installation instructions, broken repository link, etc."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectingId(null)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason.trim() || isSubmitting}
            >
              Reject Extension
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
