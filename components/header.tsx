"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Authenticated, Unauthenticated, AuthLoading, useQuery } from "convex/react"
import { UserButton } from "@clerk/nextjs"
import { Menu, X } from "lucide-react"

import { api } from "@/convex/_generated/api"

export function Header() {
  const isAdmin = useQuery(api.admin.isAdmin)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--color-border-weak)] bg-[var(--color-bg)] px-[var(--padding)]">
      <div className="mx-auto flex h-14 max-w-[67.5rem] items-center justify-between">
        <Link href="/" className="flex flex-col items-start">
          <Image
            src="/opencode_cafe.svg"
            alt="opencode.cafe"
            width={150}
            height={17}
            className="logo-invert"
          />
          <span className="text-[10px] text-[var(--color-text-weaker)]">
            not affiliated with OpenCode
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/search"
            className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-text-strong)]"
          >
            Extensions
          </Link>
          <a
            href="https://github.com/R44VC0RP/opencode.cafe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-text-strong)]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          {isAdmin && (
            <Link
              href="/admin"
              className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-text-strong)]"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-4 md:flex">
          <AuthLoading>
            <div className="h-8 w-16 animate-pulse rounded bg-[var(--color-bg-weak)]" />
          </AuthLoading>
          <Authenticated>
            <Link
              href="/submit"
              className="rounded bg-[var(--color-bg-strong)] px-4 py-1.5 text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
            >
              Submit
            </Link>
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
              className="rounded bg-[var(--color-bg-strong)] px-4 py-1.5 text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
            >
              Sign In
            </Link>
          </Unauthenticated>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-[var(--color-text)]" />
          ) : (
            <Menu className="h-6 w-6 text-[var(--color-text)]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[var(--color-border-weak)] md:hidden">
          <nav className="flex flex-col gap-1 py-4">
            <Link
              href="/search"
              className="px-2 py-2 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-weak)] hover:text-[var(--color-text-strong)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Extensions
            </Link>
            <a
              href="https://github.com/R44VC0RP/opencode.cafe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2 py-2 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-weak)] hover:text-[var(--color-text-strong)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            {isAdmin && (
              <Link
                href="/admin"
                className="px-2 py-2 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-weak)] hover:text-[var(--color-text-strong)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            <div className="my-2 border-t border-[var(--color-border-weak)]" />

            <AuthLoading>
              <div className="px-2 py-2">
                <div className="h-8 w-24 animate-pulse rounded bg-[var(--color-bg-weak)]" />
              </div>
            </AuthLoading>
            <Authenticated>
              <Link
                href="/submit"
                className="mx-2 rounded bg-[var(--color-bg-strong)] px-4 py-2 text-center text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Submit Extension
              </Link>
              <Link
                href="/account"
                className="px-2 py-2 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-weak)] hover:text-[var(--color-text-strong)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Account
              </Link>
              <div className="flex items-center gap-2 px-2 py-2">
                <UserButton />
                <span className="text-sm text-[var(--color-text-weak)]">Profile</span>
              </div>
            </Authenticated>
            <Unauthenticated>
              <Link
                href="/sign-in"
                className="mx-2 rounded bg-[var(--color-bg-strong)] px-4 py-2 text-center text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </Unauthenticated>
          </nav>
        </div>
      )}
    </header>
  )
}
