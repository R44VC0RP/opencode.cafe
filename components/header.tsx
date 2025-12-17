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
        <Link href="/" className="flex items-center">
          <Image
            src="/opencode_cafe.svg"
            alt="opencode.cafe"
            width={150}
            height={17}
            className="logo-invert"
          />
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
            href="https://opencode.ai/docs"
            className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-text-strong)]"
          >
            Docs
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
              href="https://opencode.ai/docs"
              className="px-2 py-2 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-weak)] hover:text-[var(--color-text-strong)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
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
