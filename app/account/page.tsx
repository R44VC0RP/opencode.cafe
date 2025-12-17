"use client"

import { Authenticated, Unauthenticated, AuthLoading, useConvexAuth, useQuery } from "convex/react"
import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

import { api } from "@/convex/_generated/api"
import { EXTENSION_TYPES } from "@/lib/constants"
import type { ExtensionType } from "@/lib/constants"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DebugIdentity({ identity }: { identity: any }) {
  if (!identity) return <span className="text-[var(--color-text-weak)]">No identity</span>
  return (
    <pre className="max-h-64 overflow-auto rounded bg-[var(--color-bg)] p-2 text-xs">
      {JSON.stringify(identity, null, 2)}
    </pre>
  )
}

function UserExtensions() {
  const extensions = useQuery(api.extensions.listByAuthor)

  if (extensions === undefined) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)]"
          />
        ))}
      </div>
    )
  }

  if (extensions.length === 0) {
    return (
      <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-6 text-center">
        <p className="mb-4 text-[var(--color-text-weak)]">You haven&apos;t submitted any extensions yet.</p>
        <Link
          href="/submit"
          className="inline-flex items-center justify-center rounded bg-[var(--color-bg-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text-inverted)] transition-colors hover:bg-[var(--color-bg-strong-hover)]"
        >
          Submit Your First Extension
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {extensions.map((ext) => (
        <div
          key={ext._id}
          className="flex items-center justify-between rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/plugin/${ext.productId}`}
                className="font-medium text-[var(--color-text-strong)] hover:underline"
              >
                {ext.displayName}
              </Link>
              <Badge
                variant={
                  ext.status === "approved"
                    ? "success"
                    : ext.status === "rejected"
                    ? "destructive"
                    : "warning"
                }
              >
                {ext.status}
              </Badge>
            </div>
            <span className="text-xs text-[var(--color-text-weak)]">
              {EXTENSION_TYPES[ext.type as ExtensionType]?.label || ext.type}
            </span>
            {ext.status === "rejected" && ext.rejectionReason && (
              <p className="mt-2 text-sm text-[var(--color-danger)]">
                Rejection reason: {ext.rejectionReason}
              </p>
            )}
          </div>
          <Link
            href={`/submit/${ext.productId}/edit`}
            className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-text-strong)]"
          >
            Edit
          </Link>
        </div>
      ))}
    </div>
  )
}

function AccountContent() {
  const { user } = useUser()
  const { isAuthenticated } = useConvexAuth()
  const debugIdentity = useQuery(api.admin.debugIdentity)

  return (
    <div className="flex flex-col gap-8">
      {/* Profile Section */}
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

      {/* My Extensions */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-[var(--color-text-strong)]">
          My Extensions
        </h3>
        <UserExtensions />
      </div>

      {/* Auth Status (collapsible/debug) - Only shown in development */}
      {process.env.NODE_ENV === "development" && (
        <details className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)]">
          <summary className="cursor-pointer p-4 text-sm font-medium text-[var(--color-text-strong)]">
            Debug Info
          </summary>
          <div className="border-t border-[var(--color-border-weak)] p-4">
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
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-weak)]">User ID:</span>
                <code className="text-xs text-[var(--color-text)]">{user?.id}</code>
              </div>
              <div className="mt-4">
                <span className="text-[var(--color-text-weak)]">Convex Identity (from JWT):</span>
                <DebugIdentity identity={debugIdentity} />
              </div>
            </div>
          </div>
        </details>
      )}
    </div>
  )
}

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">
            Account
          </h1>
        </div>
      </section>

      {/* Content */}
      <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
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
        </div>
      </main>
    </div>
  )
}
