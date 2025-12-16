"use client"

import Image from "next/image"
import Link from "next/link"
import { Authenticated, Unauthenticated, AuthLoading, useQuery } from "convex/react"
import { UserButton } from "@clerk/nextjs"

import { api } from "@/convex/_generated/api"

export function Header() {
  const isAdmin = useQuery(api.admin.isAdmin)

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--color-border-weak)] bg-[var(--color-bg)] px-[var(--padding)]">
      <div className="mx-auto flex h-14 max-w-[67.5rem] items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/opencode_cafe.svg"
            alt="opencode.cafe"
            width={150}
            height={17}
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#extensions"
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
        <div className="flex items-center gap-4">
          <AuthLoading>
            <div className="h-8 w-16 animate-pulse rounded bg-[var(--color-bg-weak)]" />
          </AuthLoading>
          <Authenticated>
            <Link
              href="/submit"
              className="rounded border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium text-[var(--color-text-strong)] transition-colors hover:bg-[var(--color-bg-weak)]"
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
              className="rounded border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium text-[var(--color-text-strong)] transition-colors hover:bg-[var(--color-bg-weak)]"
            >
              Sign In
            </Link>
          </Unauthenticated>
        </div>
      </div>
    </header>
  )
}
