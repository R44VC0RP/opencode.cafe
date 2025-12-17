"use client"

import { Authenticated, Unauthenticated, AuthLoading, useMutation, useQuery } from "convex/react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { useRouter } from "next/navigation"

import { api } from "@/convex/_generated/api"
import { EXTENSION_TYPE_LIST } from "@/lib/constants"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Custom hook for debouncing a value
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

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

function SubmissionPreview({ data, authorName }: { data: FormData; authorName: string }) {
  const typeInfo = EXTENSION_TYPE_LIST.find((t) => t.value === data.type)
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

function SubmitForm() {
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

  // Debounce the product ID for availability check (500ms delay)
  const debouncedProductId = useDebounce(formData.productId, 500)

  const submitExtension = useMutation(api.extensions.submit)
  const isProductIdAvailable = useQuery(
    api.extensions.checkProductIdAvailable,
    debouncedProductId.length >= 2 ? { productId: debouncedProductId } : "skip"
  )

  // Track if user is still typing (for showing "Checking..." state)
  const isCheckingProductId = formData.productId !== debouncedProductId && formData.productId.length >= 2

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Parse tags from comma-separated string
      const tags = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)

      await submitExtension({
        productId: formData.productId,
        type: formData.type as "mcp-server" | "slash-command" | "hook" | "theme" | "web-view" | "plugin" | "fork" | "tool",
        displayName: formData.displayName,
        description: formData.description,
        repoUrl: formData.repoUrl,
        homepageUrl: formData.homepageUrl || undefined,
        tags,
        installation: formData.installation,
      })

      // Redirect to account page on success
      router.push("/account?submitted=true")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const authorName = user?.fullName || user?.username || "Anonymous"

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Form Column */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
          Extension Details
        </h2>

        {error && (
          <div className="rounded border border-[var(--color-danger)] bg-[var(--color-danger)]/10 p-4 text-sm text-[var(--color-danger)]">
            {error}
          </div>
        )}

        {/* Extension Type */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="type">Type *</Label>
          <Select value={formData.type} onValueChange={(v) => updateField("type", v)} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select extension type..." />
            </SelectTrigger>
            <SelectContent>
              {EXTENSION_TYPE_LIST.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <span>{type.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formData.type && (
            <p className="text-xs text-[var(--color-text-weak)]">
              {EXTENSION_TYPE_LIST.find((t) => t.value === formData.type)?.description}
            </p>
          )}
        </div>

        {/* Product ID */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="productId">Product ID *</Label>
          <Input
            id="productId"
            name="productId"
            placeholder="my-awesome-extension"
            value={formData.productId}
            onChange={(e) => {
              // Only allow lowercase letters and hyphens
              const value = e.target.value.toLowerCase().replace(/[^a-z-]/g, "")
              updateField("productId", value)
            }}
            pattern="^[a-z][a-z-]*[a-z]$|^[a-z]$"
            required
          />
          <div className="flex items-center gap-2">
            <p className="text-xs text-[var(--color-text-weak)]">
              A unique identifier for your extension (lowercase letters and hyphens only)
            </p>
            {formData.productId.length >= 2 && (
              <span className={`text-xs ${isCheckingProductId || isProductIdAvailable === undefined ? "text-[var(--color-text-weak)]" : isProductIdAvailable ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
                {isCheckingProductId || isProductIdAvailable === undefined ? "Checking..." : isProductIdAvailable ? "Available" : "Taken"}
              </span>
            )}
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
            placeholder={`## Installation

1. Add to your \`opencode.json\` config file
2. Run \`opencode install my-extension\`

## Configuration

\`\`\`json
{
  "extensions": ["my-extension"]
}
\`\`\`

Supports **Markdown** formatting!`}
            rows={10}
            value={formData.installation}
            onChange={(e) => updateField("installation", e.target.value)}
            required
          />
          <p className="text-xs text-[var(--color-text-weak)]">
            Supports Markdown formatting. Provide clear steps for users to install and get started.
          </p>
        </div>

        {/* Author Info (pre-filled) */}
        <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
          <h3 className="mb-3 text-sm font-medium text-[var(--color-text-strong)]">
            Author Information
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-text-weak)]">Name:</span>
              <span className="text-[var(--color-text)]">{authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-text-weak)]">Email:</span>
              <span className="text-[var(--color-text)]">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Extension"}
          </Button>
          <Link
            href="/"
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
          <SubmissionPreview data={formData} authorName={authorName} />
        </div>
      </div>
    </div>
  )
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <h1 className="mb-2 text-2xl font-semibold text-[var(--color-text-strong)]">
            Submit an Extension
          </h1>
          <p className="text-[var(--color-text)]">
            Share your MCP servers, plugins, hooks, themes, and tools with the OpenCode community.
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
            <SubmitForm />
          </Authenticated>

          <Unauthenticated>
            <div className="flex flex-col gap-4">
              <p className="text-[var(--color-text)]">
                You need to sign in to submit an extension.
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
