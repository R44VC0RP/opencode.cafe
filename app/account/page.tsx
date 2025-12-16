"use client"

import { Authenticated, Unauthenticated, AuthLoading, useConvexAuth } from "convex/react"
import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"

function AccountContent() {
  const { user } = useUser()
  const { isAuthenticated } = useConvexAuth()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <UserButton />
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
            {user?.fullName || user?.username || "User"}
          </h2>
          <p className="text-sm text-[var(--color-text-weak)]">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
        <h3 className="mb-2 text-sm font-medium text-[var(--color-text-strong)]">
          Authentication Status
        </h3>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-text-weak)]">Clerk:</span>
            <span className="text-[var(--color-success)]">Authenticated</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-text-weak)]">Convex:</span>
            <span className={isAuthenticated ? "text-[var(--color-success)]" : "text-[var(--color-warning)]"}>
              {isAuthenticated ? "Authenticated" : "Syncing..."}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
        <h3 className="mb-2 text-sm font-medium text-[var(--color-text-strong)]">
          User ID
        </h3>
        <code className="text-xs text-[var(--color-text-weak)]">{user?.id}</code>
      </div>
    </div>
  )
}

export default function AccountPage() {
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
          <span className="text-sm text-[var(--color-text-weak)]">Account</span>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-[67.5rem] px-[var(--padding)] py-[var(--vertical-padding)]">
        <h1 className="mb-8 text-2xl font-semibold text-[var(--color-text-strong)]">
          Account
        </h1>

        <AuthLoading>
          <div className="text-[var(--color-text-weak)]">Loading...</div>
        </AuthLoading>

        <Authenticated>
          <AccountContent />
        </Authenticated>

        <Unauthenticated>
          <div className="flex flex-col gap-4">
            <p className="text-[var(--color-text)]">
              You need to sign in to view your account.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex w-fit items-center justify-center rounded bg-[var(--color-bg-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
            >
              Sign In
            </Link>
          </div>
        </Unauthenticated>
      </main>
    </div>
  )
}
