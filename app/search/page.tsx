"use client"

import { useQuery } from "convex/react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useMemo, useCallback, Suspense } from "react"
import { Search, X } from "lucide-react"

import { api } from "@/convex/_generated/api"
import { EXTENSION_TYPES, EXTENSION_TYPE_LIST } from "@/lib/constants"
import type { ExtensionType } from "@/lib/constants"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
      className="group flex flex-col gap-4 rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-5 transition-colors hover:border-[var(--color-border)] hover:bg-[var(--color-bg-weak-hover)]"
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

function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const typeParam = searchParams.get("type") as ExtensionType | null
  const queryParam = searchParams.get("q") || ""
  const tagParam = searchParams.get("tag") || ""

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const extensions = useQuery(api.extensions.listAllApproved)

  // Update URL with filters
  const updateFilters = useCallback((updates: { type?: string | null; q?: string; tag?: string }) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (updates.type !== undefined) {
      if (updates.type) {
        params.set("type", updates.type)
      } else {
        params.delete("type")
      }
    }
    
    if (updates.q !== undefined) {
      if (updates.q) {
        params.set("q", updates.q)
      } else {
        params.delete("q")
      }
    }
    
    if (updates.tag !== undefined) {
      if (updates.tag) {
        params.set("tag", updates.tag)
      } else {
        params.delete("tag")
      }
    }
    
    const queryString = params.toString()
    router.push(queryString ? `/search?${queryString}` : "/search")
  }, [router, searchParams])

  // Filter extensions based on search params
  const filteredExtensions = useMemo(() => {
    if (!extensions) return []
    
    return extensions.filter((ext) => {
      // Filter by type
      if (typeParam && ext.type !== typeParam) return false
      
      // Filter by tag
      if (tagParam && !ext.tags.some(t => t.toLowerCase() === tagParam.toLowerCase())) return false
      
      // Filter by search query
      if (queryParam) {
        const query = queryParam.toLowerCase()
        const matchesName = ext.displayName.toLowerCase().includes(query)
        const matchesDescription = ext.description.toLowerCase().includes(query)
        const matchesProductId = ext.productId.toLowerCase().includes(query)
        const matchesTags = ext.tags.some(t => t.toLowerCase().includes(query))
        const matchesAuthor = ext.author.name.toLowerCase().includes(query)
        
        if (!matchesName && !matchesDescription && !matchesProductId && !matchesTags && !matchesAuthor) {
          return false
        }
      }
      
      return true
    })
  }, [extensions, typeParam, queryParam, tagParam])

  // Get all unique tags from filtered extensions for tag suggestions
  const availableTags = useMemo(() => {
    if (!extensions) return []
    const tagCounts = new Map<string, number>()
    extensions.forEach((ext) => {
      ext.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      })
    })
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([tag]) => tag)
  }, [extensions])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters({ q: searchQuery })
  }

  const clearFilters = () => {
    setSearchQuery("")
    router.push("/search")
  }

  const hasActiveFilters = typeParam || queryParam || tagParam
  const selectedTypeInfo = typeParam ? EXTENSION_TYPES[typeParam] : null

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">
            {selectedTypeInfo ? selectedTypeInfo.labelPlural : "Search Extensions"}
          </h1>
          {selectedTypeInfo && (
            <p className="mt-1 text-[var(--color-text)]">{selectedTypeInfo.description}</p>
          )}
        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-6">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="flex flex-col gap-6">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-weak)]" />
                <Input
                  type="text"
                  placeholder="Search extensions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            {/* Type Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!typeParam ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ type: null })}
              >
                All Types
              </Button>
              {EXTENSION_TYPE_LIST.map((type) => (
                <Button
                  key={type.value}
                  variant={typeParam === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilters({ type: type.value })}
                >
                  {type.label}
                </Button>
              ))}
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-text-weak)]">Active filters:</span>
                {typeParam && (
                  <Badge variant="secondary" className="gap-1">
                    {EXTENSION_TYPES[typeParam]?.label}
                    <button
                      onClick={() => updateFilters({ type: null })}
                      className="ml-1 hover:text-[var(--color-text-strong)]"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {queryParam && (
                  <Badge variant="secondary" className="gap-1">
                    &quot;{queryParam}&quot;
                    <button
                      onClick={() => {
                        setSearchQuery("")
                        updateFilters({ q: "" })
                      }}
                      className="ml-1 hover:text-[var(--color-text-strong)]"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {tagParam && (
                  <Badge variant="secondary" className="gap-1">
                    #{tagParam}
                    <button
                      onClick={() => updateFilters({ tag: "" })}
                      className="ml-1 hover:text-[var(--color-text-strong)]"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--color-text-weak)] hover:text-[var(--color-text)]"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="grid gap-8 lg:grid-cols-[1fr_250px]">
            {/* Extensions Grid */}
            <div>
              {extensions === undefined ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="h-40 animate-pulse rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)]"
                    />
                  ))}
                </div>
              ) : filteredExtensions.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] py-16">
                  <p className="text-[var(--color-text-weak)]">
                    {hasActiveFilters
                      ? "No extensions match your filters"
                      : "No extensions available yet"}
                  </p>
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <p className="mb-4 text-sm text-[var(--color-text-weak)]">
                    {filteredExtensions.length} {filteredExtensions.length === 1 ? "extension" : "extensions"} found
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredExtensions.map((ext) => (
                      <ExtensionCard key={ext._id} extension={ext} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar - Popular Tags */}
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <h3 className="mb-4 text-sm font-medium text-[var(--color-text-strong)]">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => updateFilters({ tag: tagParam === tag ? "" : tag })}
                      className={`rounded px-2 py-1 text-xs transition-colors ${
                        tagParam === tag
                          ? "bg-[var(--color-bg-strong)] text-[var(--color-text-inverted)]"
                          : "bg-[var(--color-bg-weak)] text-[var(--color-text-weak)] hover:bg-[var(--color-bg-weak-hover)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                  {availableTags.length === 0 && (
                    <p className="text-xs text-[var(--color-text-weak)]">No tags yet</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />
      <Suspense fallback={
        <div className="px-[var(--padding)] py-[var(--vertical-padding)]">
          <div className="mx-auto max-w-[67.5rem]">
            <div className="animate-pulse">
              <div className="h-8 w-48 rounded bg-[var(--color-bg-weak)]" />
            </div>
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </div>
  )
}
