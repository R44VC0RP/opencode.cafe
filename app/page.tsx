"use client"

import Image from "next/image"
import Link from "next/link"
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"
import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[var(--color-border-weak)] bg-[var(--color-bg)] px-[var(--padding)]">
        <div className="mx-auto flex h-14 max-w-[67.5rem] items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/opencode-wordmark.svg"
              alt="opencode"
              width={117}
              height={21}
              className="dark:invert"
            />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#extensions"
              className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-text-strong)]"
            >
              Extensions
            </a>
            <a
              href="#plugins"
              className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-text-strong)]"
            >
              Plugins
            </a>
            <a
              href="https://opencode.ai/docs"
              className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-text-strong)]"
            >
              Docs
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <AuthLoading>
              <div className="h-8 w-16 animate-pulse rounded bg-[var(--color-bg-weak)]" />
            </AuthLoading>
            <Authenticated>
              <Link
                href="/account"
                className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-text-strong)]"
              >
                Account
              </Link>
              <UserButton />
            </Authenticated>
            <Unauthenticated>
              <Link
                href="/sign-in"
                className="rounded border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium text-[var(--color-text-strong)] transition-colors hover:bg-[var(--color-bg-weak)]"
              >
                Sign In
              </Link>
            </Unauthenticated>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="flex flex-col gap-6 py-16 md:py-24">
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-[var(--color-text-strong)] md:text-5xl">
              Extensions & plugins for OpenCode
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[var(--color-text)]">
              Discover community-built extensions and plugins to enhance your OpenCode
              experience. Share your own creations and collaborate with developers worldwide.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <a
                href="#browse"
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
        </div>
      </section>

      {/* Search */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-8">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search extensions and plugins..."
              className="w-full rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text-weak)] focus:border-[var(--color-bg-strong)] focus:bg-[var(--color-bg-interactive-weak)] focus:outline-none focus:ring-2 focus:ring-[var(--color-bg-interactive)]"
            />
            <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border border-[var(--color-border)] bg-[var(--color-bg-weak)] px-2 py-1 text-xs text-[var(--color-text-weak)] md:block">
              /
            </kbd>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
              Categories
            </h2>
            <a
              href="#all"
              className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-text-strong)]"
            >
              View all
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "MCP Servers", count: 24, icon: "server" },
              { name: "Slash Commands", count: 18, icon: "terminal" },
              { name: "Hooks", count: 12, icon: "git-branch" },
              { name: "Themes", count: 8, icon: "palette" },
            ].map((category) => (
              <a
                key={category.name}
                href={`#${category.name.toLowerCase().replace(" ", "-")}`}
                className="group flex flex-col gap-2 rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-5 transition-colors hover:border-[var(--color-border)] hover:bg-[var(--color-bg-weak-hover)]"
              >
                <span className="text-sm font-medium text-[var(--color-text-strong)] group-hover:text-[var(--color-text-strong)]">
                  {category.name}
                </span>
                <span className="text-xs text-[var(--color-text-weak)]">
                  {category.count} extensions
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Extensions */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
              Featured
            </h2>
            <a
              href="#featured"
              className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-text-strong)]"
            >
              View all
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "GitHub MCP",
                description:
                  "Integrate GitHub issues, PRs, and repositories directly into your workflow.",
                author: "opencode",
                downloads: "12.4k",
                category: "MCP Server",
              },
              {
                name: "Postgres Tools",
                description:
                  "Query and manage PostgreSQL databases with natural language commands.",
                author: "community",
                downloads: "8.2k",
                category: "MCP Server",
              },
              {
                name: "Code Review Hook",
                description:
                  "Automatically review code changes before commits with customizable rules.",
                author: "opencode",
                downloads: "6.1k",
                category: "Hook",
              },
              {
                name: "Linear Integration",
                description:
                  "Create and manage Linear issues without leaving your terminal.",
                author: "community",
                downloads: "5.8k",
                category: "MCP Server",
              },
              {
                name: "Test Runner",
                description:
                  "Run tests intelligently based on changed files and dependencies.",
                author: "community",
                downloads: "4.9k",
                category: "Slash Command",
              },
              {
                name: "Catppuccin Theme",
                description:
                  "A soothing pastel theme for a comfortable coding experience.",
                author: "community",
                downloads: "3.2k",
                category: "Theme",
              },
            ].map((ext) => (
              <a
                key={ext.name}
                href={`#${ext.name.toLowerCase().replace(" ", "-")}`}
                className="group flex flex-col gap-4 rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-5 transition-colors hover:border-[var(--color-border)] hover:bg-[var(--color-bg-weak-hover)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-[var(--color-text-strong)]">
                      {ext.name}
                    </span>
                    <span className="text-xs text-[var(--color-text-weak)]">
                      by {ext.author}
                    </span>
                  </div>
                  <span className="rounded bg-[var(--color-bg-interactive-weak)] px-2 py-1 text-xs text-[var(--color-text)]">
                    {ext.category}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  {ext.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-[var(--color-text-weak)]">
                  <span>{ext.downloads} downloads</span>
                </div>
              </a>
            ))}
          </div>
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
              <a
                href="https://opencode.ai/docs"
                className="inline-flex items-center justify-center rounded bg-[var(--color-bg-strong)] px-6 py-3 text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
              >
                Start Building
              </a>
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
  );
}
