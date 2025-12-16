"use client"

import { use, useState, useEffect } from "react"
import { Authenticated, Unauthenticated, AuthLoading, useMutation, useQuery } from "convex/react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"

import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Info } from "lucide-react"

const EXTENSION_TYPES = [
  { value: "mcp-server", label: "MCP Server", description: "Model Context Protocol server for AI integrations" },
  { value: "slash-command", label: "Slash Command", description: "Custom commands triggered with /" },
  { value: "hook", label: "Hook", description: "Lifecycle hooks for automation" },
  { value: "theme", label: "Theme", description: "Visual themes and color schemes" },
  { value: "web-view", label: "Web View", description: "Custom web-based UI panels" },
  { value: "plugin", label: "Plugin", description: "General purpose plugins" },
  { value: "fork", label: "Fork", description: "Modified versions of OpenCode" },
  { value: "tool", label: "Tool", description: "Standalone tools and utilities" },
]

interface FormData {
  type: string
  productId: string
  displayName: string
  description: string
  repoUrl: string
  homepageUrl: string
  tags: string
  installation: string
}

function EditPreview({ data, authorName }: { data: FormData; authorName: string }) {
  const typeInfo = EXTENSION_TYPES.find((t) => t.value === data.type)
  const tags = data.tags.split(",").map((t) => t.trim()).filter(Boolean)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
            {data.displayName || "Extension Name"}
          </h2>
          <p className="text-sm text-[var(--color-text-weak)]">
            by {authorName}
          </p>
        </div>
        {typeInfo && (
          <Badge variant="secondary">{typeInfo.label}</Badge>
        )}
      </div>

      {/* Description */}
      <div>
        <p className="text-sm leading-relaxed text-[var(--color-text)]">
          {data.description || "No description provided."}
        </p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <Badge key={i} variant="outline">{tag}</Badge>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex flex-col gap-2 text-sm">
        {data.repoUrl && (
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-text-weak)]">Repository:</span>
            <a
              href={data.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-strong)] underline underline-offset-2"
            >
              {data.repoUrl}
            </a>
          </div>
        )}
        {data.homepageUrl && (
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-text-weak)]">Homepage:</span>
            <a
              href={data.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-strong)] underline underline-offset-2"
            >
              {data.homepageUrl}
            </a>
          </div>
        )}
      </div>

      {/* Installation Instructions */}
      {data.installation && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-[var(--color-text-strong)]">
            Installation
          </h3>
          <div className="prose prose-sm prose-invert max-w-none rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-lg font-semibold text-[var(--color-text-strong)] mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-semibold text-[var(--color-text-strong)] mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-semibold text-[var(--color-text-strong)] mb-2">{children}</h3>,
                p: ({ children }) => <p className="text-sm text-[var(--color-text)] mb-3 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside text-sm text-[var(--color-text)] mb-3 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside text-sm text-[var(--color-text)] mb-3 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="text-sm text-[var(--color-text)]">{children}</li>,
                code: ({ children, className }) => {
                  const isBlock = className?.includes("language-")
                  if (isBlock) {
                    return (
                      <pre className="rounded bg-[var(--color-bg)] p-3 text-xs overflow-x-auto mb-3">
                        <code className="text-[var(--color-text)]">{children}</code>
                      </pre>
                    )
                  }
                  return (
                    <code className="rounded bg-[var(--color-bg)] px-1.5 py-0.5 text-xs text-[var(--color-text-strong)]">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => <>{children}</>,
                a: ({ href, children }) => (
                  <a href={href} className="text-[var(--color-text-strong)] underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-[var(--color-border)] pl-4 italic text-[var(--color-text-weak)] mb-3">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {data.installation}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

function EditForm({ productId }: { productId: string }) {
  const { user } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    type: "",
    productId: "",
    displayName: "",
    description: "",
    repoUrl: "",
    homepageUrl: "",
    tags: "",
    installation: "",
  })
  const [isLoaded, setIsLoaded] = useState(false)

  const extension = useQuery(api.extensions.getByProductId, { productId })
  const updateExtension = useMutation(api.extensions.update)

  // Populate form when extension loads
  useEffect(() => {
    if (extension && !isLoaded) {
      setFormData({
        type: extension.type,
        productId: extension.productId,
        displayName: extension.displayName,
        description: extension.description,
        repoUrl: extension.repoUrl,
        homepageUrl: extension.homepageUrl || "",
        tags: extension.tags.join(", "),
        installation: extension.installation,
      })
      setIsLoaded(true)
    }
  }, [extension, isLoaded])

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!extension) return

    setIsSubmitting(true)
    setError(null)

    try {
      // Parse tags from comma-separated string
      const tags = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)

      const result = await updateExtension({
        extensionId: extension._id as Id<"extensions">,
        displayName: formData.displayName,
        description: formData.description,
        repoUrl: formData.repoUrl,
        homepageUrl: formData.homepageUrl || undefined,
        tags,
        installation: formData.installation,
      })

      // Redirect to account page on success
      router.push(`/account?updated=true${result.newStatus === "pending" ? "&resubmitted=true" : ""}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state
  if (extension === undefined) {
    return (
      <div className="animate-pulse">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-20 rounded bg-[var(--color-bg-weak)]" />
            ))}
          </div>
          <div className="h-96 rounded bg-[var(--color-bg-weak)]" />
        </div>
      </div>
    )
  }

  // Not found
  if (extension === null) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <div>
          <AlertTitle>Extension Not Found</AlertTitle>
          <AlertDescription>
            The extension with ID &quot;{productId}&quot; does not exist.
          </AlertDescription>
        </div>
      </Alert>
    )
  }

  // Not the author
  if (user && extension.author.userId !== user.id) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <div>
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You can only edit your own extensions.
          </AlertDescription>
        </div>
      </Alert>
    )
  }

  const authorName = user?.fullName || user?.username || extension.author.name
  const typeInfo = EXTENSION_TYPES.find((t) => t.value === formData.type)

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Form Column */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
          Edit Extension
        </h2>

        {extension.status === "approved" && (
          <Alert>
            <Info className="size-4" />
            <div>
              <AlertTitle>Re-review Required</AlertTitle>
              <AlertDescription>
                Since this extension is currently approved, saving changes will reset it to pending status for re-review.
              </AlertDescription>
            </div>
          </Alert>
        )}

        {extension.status === "rejected" && extension.rejectionReason && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <div>
              <AlertTitle>Previously Rejected</AlertTitle>
              <AlertDescription>
                {extension.rejectionReason}
              </AlertDescription>
            </div>
          </Alert>
        )}

        {error && (
          <div className="rounded border border-[var(--color-danger)] bg-[var(--color-danger)]/10 p-4 text-sm text-[var(--color-danger)]">
            {error}
          </div>
        )}

        {/* Extension Type (read-only) */}
        <div className="flex flex-col gap-3">
          <Label>Type</Label>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{typeInfo?.label || formData.type}</Badge>
            <span className="text-xs text-[var(--color-text-weak)]">(cannot be changed)</span>
          </div>
        </div>

        {/* Product ID (read-only) */}
        <div className="flex flex-col gap-3">
          <Label>Product ID</Label>
          <div className="flex items-center gap-2">
            <code className="rounded bg-[var(--color-bg-weak)] px-2 py-1 text-sm">
              {formData.productId}
            </code>
            <span className="text-xs text-[var(--color-text-weak)]">(cannot be changed)</span>
          </div>
        </div>

        {/* Display Name */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="displayName">Display Name *</Label>
          <Input
            id="displayName"
            name="displayName"
            placeholder="My Awesome Extension"
            value={formData.displayName}
            onChange={(e) => updateField("displayName", e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="A brief description of what your extension does..."
            rows={3}
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            required
          />
        </div>

        {/* Repository URL */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="repoUrl">Repository URL *</Label>
          <Input
            id="repoUrl"
            name="repoUrl"
            type="url"
            placeholder="https://github.com/username/repo"
            value={formData.repoUrl}
            onChange={(e) => updateField("repoUrl", e.target.value)}
            required
          />
          <p className="text-xs text-[var(--color-text-weak)]">
            GitHub, GitLab, or other public repository URL
          </p>
        </div>

        {/* Homepage URL */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="homepageUrl">Homepage URL</Label>
          <Input
            id="homepageUrl"
            name="homepageUrl"
            type="url"
            placeholder="https://my-extension.dev"
            value={formData.homepageUrl}
            onChange={(e) => updateField("homepageUrl", e.target.value)}
          />
          <p className="text-xs text-[var(--color-text-weak)]">
            Optional: Link to documentation or landing page
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            name="tags"
            placeholder="ai, productivity, github"
            value={formData.tags}
            onChange={(e) => updateField("tags", e.target.value)}
          />
          <p className="text-xs text-[var(--color-text-weak)]">
            Comma-separated tags to help users find your extension
          </p>
        </div>

        {/* Installation Instructions */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="installation">Installation Instructions *</Label>
          <Textarea
            id="installation"
            name="installation"
            placeholder="Installation instructions with Markdown support..."
            rows={10}
            value={formData.installation}
            onChange={(e) => updateField("installation", e.target.value)}
            required
          />
          <p className="text-xs text-[var(--color-text-weak)]">
            Supports Markdown formatting. Provide clear steps for users to install and get started.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Link
            href="/account"
            className="text-sm text-[var(--color-text-weak)] transition-colors hover:text-[var(--color-text)]"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Preview Column */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
          Preview
        </h2>
        <div className="sticky top-20 rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-6">
          <EditPreview data={formData} authorName={authorName} />
        </div>
      </div>
    </div>
  )
}

export default function EditExtensionPage({ params }: { params: Promise<{ productId: string }> }) {
  const resolvedParams = use(params)

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <h1 className="mb-2 text-2xl font-semibold text-[var(--color-text-strong)]">
            Edit Extension
          </h1>
          <p className="text-[var(--color-text)]">
            Update your extension details and submit for re-review.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <AuthLoading>
            <div className="text-[var(--color-text-weak)]">Loading...</div>
          </AuthLoading>

          <Authenticated>
            <EditForm productId={resolvedParams.productId} />
          </Authenticated>

          <Unauthenticated>
            <div className="flex flex-col gap-4">
              <p className="text-[var(--color-text)]">
                You need to sign in to edit an extension.
              </p>
              <Link
                href="/sign-in"
                className="inline-flex w-fit items-center justify-center rounded bg-[var(--color-bg-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
              >
                Sign In
              </Link>
            </div>
          </Unauthenticated>
        </div>
      </main>
    </div>
  )
}
