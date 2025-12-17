"use client"

import Link from "next/link"
import { useQuery } from "convex/react"
import { Clock, CheckCircle, XCircle, Package, Upload } from "lucide-react"

import { api } from "@/convex/_generated/api"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const isAdmin = useQuery(api.admin.isAdmin)
  // Only fetch counts after confirming user is admin to avoid unauthorized errors
  const counts = useQuery(api.admin.getCounts, isAdmin ? {} : "skip")

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Header />
        <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
          <div className="mx-auto max-w-[67.5rem]">
            <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">Access Denied</h1>
          </div>
        </section>
        <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
          <div className="mx-auto max-w-[67.5rem]">
            <p className="text-[var(--color-text)]">You do not have permission to access the admin area.</p>
          </div>
        </main>
      </div>
    )
  }

  if (isAdmin === undefined || counts === undefined) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Header />
        <div className="mx-auto max-w-[67.5rem] px-[var(--padding)] py-[var(--vertical-padding)]">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded bg-[var(--color-bg-weak)]" />
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 rounded-md border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">Admin Dashboard</h1>
          <p className="mt-1 text-[var(--color-text)]">Manage extension submissions and approvals</p>
        </div>
      </section>

      {/* Content */}
      <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="size-4 text-[var(--color-text-weak)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--color-text-strong)]">{counts.pending}</div>
              <p className="text-xs text-[var(--color-text-weak)]">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="size-4 text-[var(--color-success)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--color-text-strong)]">{counts.approved}</div>
              <p className="text-xs text-[var(--color-text-weak)]">Published extensions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="size-4 text-[var(--color-danger)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--color-text-strong)]">{counts.rejected}</div>
              <p className="text-xs text-[var(--color-text-weak)]">Declined submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Package className="size-4 text-[var(--color-text-weak)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--color-text-strong)]">{counts.total}</div>
              <p className="text-xs text-[var(--color-text-weak)]">All submissions</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-strong)]">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Review Queue</CardTitle>
                <CardDescription>
                  {counts.pending === 0
                    ? "No extensions pending review"
                    : `${counts.pending} extension${counts.pending === 1 ? "" : "s"} waiting for review`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/pending">
                  <Button disabled={counts.pending === 0}>
                    Review Pending Submissions
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Extensions</CardTitle>
                <CardDescription>View and manage all submitted extensions</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/extensions">
                  <Button variant="outline">View All Extensions</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Import</CardTitle>
                <CardDescription>Import multiple extensions from JSON</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/import">
                  <Button variant="outline">
                    <Upload className="mr-2 size-4" />
                    Import Extensions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </main>
    </div>
  )
}
