"use client"

import Image from "next/image"
import Link from "next/link"
import { Authenticated, Unauthenticated, useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { EXTENSION_TYPES, HOMEPAGE_CATEGORIES } from "@/lib/constants"
import type { ExtensionType } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

function ExtensionCard({ extension }: { extension: {
  productId: string
  displayName: string
  description: string
  type: string
  author: { name: string }
  tags: string[]
} }) {
  const typeInfo = EXTENSION_TYPES[extension.type as ExtensionType]

  return (
    <Link
      href={`/plugin/${extension.productId}`}
      className="group flex flex-col gap-4 rounded-xl border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-5 transition-all hover:border-[var(--color-border)] hover:bg-[var(--color-bg-weak-hover)] hover:shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-[var(--color-text-strong)]">
            {extension.displayName}
          </span>
          <span className="text-xs text-[var(--color-text-weak)]">
            Submitted by {extension.author.name}
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
  const extensions = useQuery(api.extensions.listAllApproved)

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
  const extensions = useQuery(api.extensions.listAllApproved)

  const counts: Record<string, number> = {}
  HOMEPAGE_CATEGORIES.forEach((type) => {
    counts[type] = 0
  })

  if (extensions) {
    extensions.forEach((ext) => {
      if (counts[ext.type] !== undefined) {
        counts[ext.type]++
      }
    })
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {HOMEPAGE_CATEGORIES.map((type) => {
        const typeInfo = EXTENSION_TYPES[type]
        return (
          <Link
            key={type}
            href={`/search?type=${type}`}
            className="group flex flex-col gap-2 rounded-xl border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-5 transition-all hover:border-[var(--color-border)] hover:bg-[var(--color-bg-weak-hover)] hover:shadow-sm"
          >
            <span className="text-sm font-medium text-[var(--color-text-strong)]">
              {typeInfo.labelPlural}
            </span>
            <span className="text-xs text-[var(--color-text-weak)]">
              {counts[type]} {counts[type] === 1 ? "extension" : "extensions"}
            </span>
          </Link>
        )
      })}
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
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-weak)]">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-bg-interactive)]"></span>
                Community-driven marketplace
              </div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--color-text-strong)] md:text-5xl">
                Grab a seat, browse some extensions
              </h1>
              <p className="text-lg leading-relaxed text-[var(--color-text)]">
                A cozy corner of the internet where developers share extensions, plugins, 
                and tools for OpenCode. Pull up a chair and explore what the community has brewed.
              </p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <a
                  href="#extensions"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--color-bg-strong)] px-6 py-3 text-sm font-medium text-[var(--color-text-inverted)] transition-all hover:bg-[var(--color-bg-strong-hover)] active:scale-[0.98]"
                >
                  Browse the Menu
                </a>
                <Link
                  href="/submit"
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-text-strong)] transition-all hover:bg-[var(--color-bg-weak)] active:scale-[0.98]"
                >
                  Share Your Creation
                </Link>
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-2xl bg-[var(--color-bg-interactive)] opacity-20 blur-3xl"></div>
              <Image
                src="/opencode_cafe_image.jpg"
                alt="OpenCode Cafe"
                fill
                className="relative rounded-2xl object-contain"
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
              On the Menu
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-weak)]">
              Browse by category
            </p>
          </div>
          <CategoryCounts />
        </div>
      </section>

      {/* Extensions */}
      <section id="extensions" className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
              Fresh from the Community
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-weak)]">
              All available extensions
            </p>
          </div>
          <ExtensionsGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="relative overflow-hidden rounded-2xl bg-[var(--color-bg-weak)] p-8 md:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--color-bg-interactive)] opacity-20 blur-3xl"></div>
            <div className="relative flex flex-col items-center gap-6 text-center">
              <h2 className="text-2xl font-semibold text-[var(--color-text-strong)]">
                Got something brewing?
              </h2>
              <p className="max-w-lg text-[var(--color-text)]">
                Share your extensions with the community. Whether it&apos;s an MCP server, 
                a handy slash command, or a beautiful theme - we&apos;d love to feature it.
              </p>
              <div className="flex gap-4">
                <Authenticated>
                  <Link
                    href="/submit"
                    className="inline-flex items-center justify-center rounded-lg bg-[var(--color-bg-strong)] px-6 py-3 text-sm font-medium text-[var(--color-text-inverted)] transition-all hover:bg-[var(--color-bg-strong-hover)] active:scale-[0.98]"
                  >
                    Submit Your Extension
                  </Link>
                </Authenticated>
                <Unauthenticated>
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center justify-center rounded-lg bg-[var(--color-bg-strong)] px-6 py-3 text-sm font-medium text-[var(--color-text-inverted)] transition-all hover:bg-[var(--color-bg-strong-hover)] active:scale-[0.98]"
                  >
                    Sign In to Submit
                  </Link>
                </Unauthenticated>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-[var(--padding)] py-8">
        <div className="mx-auto flex max-w-[67.5rem] flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
            <span className="text-sm text-[var(--color-text-weak)]">
              opencode.cafe
            </span>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://github.com/R44VC0RP/opencode.cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-text-weak)] transition-colors hover:text-[var(--color-text)]"
              >
                GitHub
              </a>
              <Link
                href="/guidelines"
                className="text-sm text-[var(--color-text-weak)] transition-colors hover:text-[var(--color-text)]"
              >
                Guidelines
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[var(--color-text-weak)] transition-colors hover:text-[var(--color-text)]"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-[var(--color-text-weak)] transition-colors hover:text-[var(--color-text)]"
              >
                Privacy
              </Link>
            </div>
          </div>
          <div className="border-t border-[var(--color-border-weak)] pt-6 text-center">
            <p className="text-xs text-[var(--color-text-weaker)]">
              This is a community project and is not affiliated with, endorsed by, or sponsored by{" "}
              <a
                href="https://opencode.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[var(--color-text-weak)]"
              >
                OpenCode
              </a>{" "}
              or{" "}
              <a
                href="https://sst.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[var(--color-text-weak)]"
              >
                SST
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
