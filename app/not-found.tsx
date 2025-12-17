import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">
            404 - Page Not Found
          </h1>
          <p className="mt-1 text-[var(--color-text)]">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="flex flex-col items-center justify-center gap-6 rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] py-16">
            <div className="text-6xl font-bold text-[var(--color-text-weak)]">404</div>
            <p className="text-center text-[var(--color-text)]">
              Sorry, we couldn&apos;t find what you were looking for.
            </p>
            <div className="flex gap-4">
              <Link href="/">
                <Button>Go Home</Button>
              </Link>
              <Link href="/search">
                <Button variant="outline">Browse Extensions</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
