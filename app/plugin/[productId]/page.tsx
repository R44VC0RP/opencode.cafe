"use client"

import { useQuery } from "convex/react"
import { useParams } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

import { api } from "@/convex/_generated/api"
import { EXTENSION_TYPES } from "@/lib/constants"
import type { ExtensionType } from "@/lib/constants"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function PluginContent({ productId }: { productId: string }) {
  const extension = useQuery(api.extensions.getByProductId, { productId })

  if (extension === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--color-text-weak)]">Loading...</div>
      </div>
    )
  }

  if (extension === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
          Extension not found
        </h2>
        <p className="text-[var(--color-text-weak)]">
          The extension &quot;{productId}&quot; does not exist or has not been approved yet.
        </p>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    )
  }

  const typeInfo = EXTENSION_TYPES[extension.type as ExtensionType]
  const formattedDate = new Date(extension.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold text-[var(--color-text-strong)]">
                {extension.displayName}
              </h1>
              {extension.status === "pending" && (
                <Badge variant="warning">Pending Review</Badge>
              )}
            </div>
            <p className="text-[var(--color-text-weak)]">
              by {extension.author.name} · Published {formattedDate}
            </p>
          </div>
          <Badge variant="secondary">{typeInfo?.label || extension.type}</Badge>
        </div>

        <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-text)]">
          {extension.description}
        </p>

        {/* Tags */}
        {extension.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {extension.tags.map((tag, i) => (
              <Badge key={i} variant="outline">{tag}</Badge>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        {extension.repoUrl && (
          <a href={extension.repoUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="default">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Repository
            </Button>
          </a>
        )}
        {extension.homepageUrl && (
          <a href={extension.homepageUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Homepage
            </Button>
          </a>
        )}
      </div>

      {/* Installation Instructions */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
          Installation
        </h2>
        <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-6">
          <div className="prose prose-sm prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-lg font-semibold text-[var(--color-text-strong)] mb-3 mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-semibold text-[var(--color-text-strong)] mb-3 mt-6 first:mt-0">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-semibold text-[var(--color-text-strong)] mb-2 mt-4">{children}</h3>,
                p: ({ children }) => <p className="text-sm text-[var(--color-text)] mb-4 last:mb-0 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside text-sm text-[var(--color-text)] mb-4 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside text-sm text-[var(--color-text)] mb-4 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="text-sm text-[var(--color-text)]">{children}</li>,
                code: ({ children, className }) => {
                  const isBlock = className?.includes("language-")
                  if (isBlock) {
                    return (
                      <pre className="rounded bg-[var(--color-bg)] p-4 text-sm overflow-x-auto mb-4">
                        <code className="text-[var(--color-text)]">{children}</code>
                      </pre>
                    )
                  }
                  return (
                    <code className="rounded bg-[var(--color-bg)] px-1.5 py-0.5 text-sm text-[var(--color-text-strong)]">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => <>{children}</>,
                a: ({ href, children }) => (
                  <a href={href} className="text-[var(--color-text-strong)] underline underline-offset-2 hover:text-[var(--color-text)]" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-[var(--color-border)] pl-4 italic text-[var(--color-text-weak)] mb-4">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {extension.installation}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-4 border-t border-[var(--color-border-weak)] pt-8">
        <h2 className="text-sm font-medium text-[var(--color-text-weak)]">
          Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-text-weak)]">Product ID</span>
            <code className="text-sm text-[var(--color-text-strong)]">{extension.productId}</code>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-text-weak)]">Type</span>
            <span className="text-sm text-[var(--color-text-strong)]">{typeInfo?.label || extension.type}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-text-weak)]">Author</span>
            <span className="text-sm text-[var(--color-text-strong)]">{extension.author.name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-text-weak)]">Published</span>
            <span className="text-sm text-[var(--color-text-strong)]">{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PluginPage() {
  const params = useParams()
  const productId = params.productId as string

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Content */}
      <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <PluginContent productId={productId} />
        </div>
      </main>
    </div>
  )
}
