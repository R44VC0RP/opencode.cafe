"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery, useMutation } from "convex/react"
import { ExternalLink, Trash2, ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react"

import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

type StatusFilter = "all" | "pending" | "approved" | "rejected"

export default function AdminExtensionsPage() {
  const isAdmin = useQuery(api.admin.isAdmin)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [deletingId, setDeletingId] = useState<Id<"extensions"> | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Only fetch extensions after confirming user is admin
  const extensions = useQuery(
    api.admin.listAll,
    isAdmin
      ? statusFilter === "all"
        ? {}
        : { status: statusFilter }
      : "skip"
  )
  const deleteExtension = useMutation(api.admin.deleteExtension)

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

  if (isAdmin === undefined || extensions === undefined) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Header />
        <div className="mx-auto max-w-[67.5rem] px-[var(--padding)] py-[var(--vertical-padding)]">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded bg-[var(--color-bg-weak)]" />
            <div className="mt-8 flex flex-col gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 rounded-md border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  async function handleDelete() {
    if (!deletingId) return
    setIsDeleting(true)
    try {
      await deleteExtension({ extensionId: deletingId })
      setDeletingId(null)
    } finally {
      setIsDeleting(false)
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "pending":
        return <Badge variant="warning"><Clock className="mr-1 size-3" />Pending</Badge>
      case "approved":
        return <Badge variant="success"><CheckCircle className="mr-1 size-3" />Approved</Badge>
      case "rejected":
        return <Badge variant="destructive"><XCircle className="mr-1 size-3" />Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const deletingExtension = deletingId ? extensions.find((e) => e._id === deletingId) : null

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--color-text-weak)] hover:text-[var(--color-text)]"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">All Extensions</h1>
              <p className="mt-1 text-[var(--color-text)]">
                {extensions.length} extension{extensions.length === 1 ? "" : "s"}
                {statusFilter !== "all" && ` (filtered by ${statusFilter})`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--color-text-weak)]">Filter:</span>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as StatusFilter)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          {extensions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-sm text-[var(--color-text-weak)]">No extensions found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {extensions.map((ext) => (
              <Card key={ext._id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">
                          <Link
                            href={`/plugin/${ext.productId}`}
                            className="hover:underline"
                          >
                            {ext.displayName}
                          </Link>
                        </CardTitle>
                        <Badge variant="secondary">{TYPE_LABELS[ext.type] || ext.type}</Badge>
                        {getStatusBadge(ext.status)}
                      </div>
                      <CardDescription className="mt-1">
                        <span className="font-mono text-xs">{ext.productId}</span>
                        <span className="mx-2">·</span>
                        by {ext.author.name} ({ext.author.email})
                        <span className="mx-2">·</span>
                        {new Date(ext.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={ext.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[var(--color-text-weak)] hover:text-[var(--color-text)]"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingId(ext._id)}
                        className="text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-[var(--color-text)]">{ext.description}</p>
                  {ext.status === "rejected" && ext.rejectionReason && (
                    <div className="mt-3 rounded-md border border-[var(--color-danger)]/20 bg-[var(--color-danger)]/5 p-3">
                      <p className="text-xs font-medium text-[var(--color-danger)]">Rejection reason:</p>
                      <p className="mt-1 text-sm text-[var(--color-text)]">{ext.rejectionReason}</p>
                    </div>
                  )}
                  {ext.reviewedAt && (
                    <p className="mt-2 text-xs text-[var(--color-text-weaker)]">
                      Reviewed on {new Date(ext.reviewedAt).toLocaleDateString()}
                      {ext.reviewedBy && ` by ${ext.reviewedBy}`}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deletingId !== null} onOpenChange={() => setDeletingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Extension</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deletingExtension?.displayName}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingId(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              Delete Extension
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
