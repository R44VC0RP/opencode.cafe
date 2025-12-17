"use client"

import Image from "next/image"
import Link from "next/link"
import { Authenticated, Unauthenticated, useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

const EXTENSION_TYPES: Record<string, { label: string }> = {
  "mcp-server": { label: "MCP Server" },
  "slash-command": { label: "Slash Command" },
  "hook": { label: "Hook" },
  "theme": { label: "Theme" },
  "web-view": { label: "Web View" },
  "plugin": { label: "Plugin" },
  "fork": { label: "Fork" },
  "tool": { label: "Tool" },
}

function ExtensionCard({ extension }: { extension: {
  productId: string
  displayName: string
  description: string
  type: string
  author: { name: string }
  tags: string[]
} }) {
  const typeInfo = EXTENSION_TYPES[extension.type]

  return (
    <Link
      href={`/plugin/${extension.productId}`}
      className="group flex flex-col gap-4 rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-5 transition-colors hover:border-[var(--color-border)] hover:bg-[var(--color-bg-weak-hover)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-[var(--color-text-strong)]">
            {extension.displayName}
          </span>
          <span className="text-xs text-[var(--color-text-weak)]">
            by {extension.author.name}
          </span>
        </div>
        <Badge variant="secondary">{typeInfo?.label || extension.type}</Badge>
      </div>
      <p className="text-sm leading-relaxed text-[var(--color-text)] line-clamp-2">
        {extension.description}
      </p>
      {extension.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {extension.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-xs text-[var(--color-text-weak)]">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}

function ExtensionsGrid() {
  const extensions = useQuery(api.extensions.listApproved)

  if (extensions === undefined) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)]"
          />
        ))}
      </div>
    )
  }

  if (extensions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] py-16">
        <p className="text-[var(--color-text-weak)]">No extensions yet</p>
        <Authenticated>
          <Link
            href="/submit"
            className="rounded bg-[var(--color-bg-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
          >
            Be the first to submit
          </Link>
        </Authenticated>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {extensions.map((ext) => (
        <ExtensionCard key={ext._id} extension={ext} />
      ))}
    </div>
  )
}

function CategoryCounts() {
  const extensions = useQuery(api.extensions.listApproved)

  const counts: Record<string, number> = {
    "mcp-server": 0,
    "slash-command": 0,
    "hook": 0,
    "theme": 0,
    "web-view": 0,
    "plugin": 0,
    "fork": 0,
    "tool": 0,
  }

  if (extensions) {
    extensions.forEach((ext) => {
      if (counts[ext.type] !== undefined) {
        counts[ext.type]++
      }
    })
  }

  const categories = [
    { type: "mcp-server", name: "MCP Servers" },
    { type: "slash-command", name: "Slash Commands" },
    { type: "hook", name: "Hooks" },
    { type: "theme", name: "Themes" },
    { type: "plugin", name: "Plugins" },
    { type: "tool", name: "Tools" },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <div
          key={category.type}
          className="group flex flex-col gap-2 rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-5 transition-colors hover:border-[var(--color-border)] hover:bg-[var(--color-bg-weak-hover)]"
        >
          <span className="text-sm font-medium text-[var(--color-text-strong)]">
            {category.name}
          </span>
          <span className="text-xs text-[var(--color-text-weak)]">
            {counts[category.type]} {counts[category.type] === 1 ? "extension" : "extensions"}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="grid items-center gap-12 py-8 md:grid-cols-2 md:py-12">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--color-text-strong)] md:text-5xl">
                Extensions & plugins for OpenCode
              </h1>
              <p className="text-lg leading-relaxed text-[var(--color-text)]">
                Discover community-built extensions and plugins to enhance your OpenCode
                experience. Share your own creations and collaborate with developers worldwide.
              </p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <a
                  href="#extensions"
                  className="inline-flex items-center justify-center rounded bg-[var(--color-bg-strong)] px-6 py-3 text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
                >
                  Browse Extensions
                </a>
                <a
                  href="https://opencode.ai/docs"
                  className="inline-flex items-center justify-center rounded border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-text-strong)] transition-colors hover:bg-[var(--color-bg-weak)]"
                >
                  Read the Docs
                </a>
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-full">
              <Image
                src="/opencode_cafe_image.jpg"
                alt="OpenCode Cafe"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
              Categories
            </h2>
          </div>
          <CategoryCounts />
        </div>
      </section>

      {/* Extensions */}
      <section id="extensions" className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
              All Extensions
            </h2>
          </div>
          <ExtensionsGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="flex flex-col items-center gap-6 py-8 text-center">
            <h2 className="text-2xl font-semibold text-[var(--color-text-strong)]">
              Build for the community
            </h2>
            <p className="max-w-lg text-[var(--color-text)]">
              Create extensions and plugins that help developers work smarter. Share your
              tools with thousands of OpenCode users.
            </p>
            <div className="flex gap-4">
              <Authenticated>
                <Link
                  href="/submit"
                  className="inline-flex items-center justify-center rounded bg-[var(--color-bg-strong)] px-6 py-3 text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
                >
                  Submit Extension
                </Link>
              </Authenticated>
              <Unauthenticated>
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center rounded bg-[var(--color-bg-strong)] px-6 py-3 text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
                >
                  Sign In to Submit
                </Link>
              </Unauthenticated>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-[var(--padding)] py-8">
        <div className="mx-auto flex max-w-[67.5rem] flex-col items-center justify-between gap-4 md:flex-row">
          <span className="text-sm text-[var(--color-text-weak)]">
            opencode.cafe
          </span>
          <div className="flex gap-6">
            <a
              href="https://github.com/sst/opencode"
              className="text-sm text-[var(--color-text-weak)] transition-colors hover:text-[var(--color-text)]"
            >
              GitHub
            </a>
            <a
              href="https://opencode.ai/docs"
              className="text-sm text-[var(--color-text-weak)] transition-colors hover:text-[var(--color-text)]"
            >
              Docs
            </a>
            <a
              href="https://discord.gg/opencode"
              className="text-sm text-[var(--color-text-weak)] transition-colors hover:text-[var(--color-text)]"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
