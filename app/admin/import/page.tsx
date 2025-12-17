"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useQuery, useMutation } from "convex/react"
import { ArrowLeft, Upload, FileJson, CheckCircle, XCircle, AlertCircle } from "lucide-react"

import { api } from "@/convex/_generated/api"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const VALID_TYPES = ["mcp-server", "slash-command", "hook", "theme", "web-view", "plugin", "fork", "tool"] as const

interface ExtensionInput {
  productId: string
  type: string
  displayName: string
  description: string
  repoUrl: string
  homepageUrl?: string
  tags: string[]
  installation: string
}

interface ImportResult {
  productId: string
  success: boolean
  error?: string
}

interface BulkImportResponse {
  total: number
  succeeded: number
  failed: number
  results: ImportResult[]
}

export default function AdminImportPage() {
  const isAdmin = useQuery(api.admin.isAdmin)
  const bulkImport = useMutation(api.admin.bulkImport)

  const [jsonInput, setJsonInput] = useState("")
  const [parseError, setParseError] = useState<string | null>(null)
  const [parsedExtensions, setParsedExtensions] = useState<ExtensionInput[]>([])
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<BulkImportResponse | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const parseJson = (jsonString: string): boolean => {
    setParseError(null)
    setParsedExtensions([])
    setImportResult(null)

    if (!jsonString.trim()) {
      setParseError("Please enter JSON data")
      return false
    }

    try {
      const parsed = JSON.parse(jsonString)
      
      // Handle both array and single object
      const items = Array.isArray(parsed) ? parsed : [parsed]
      
      if (items.length === 0) {
        setParseError("No extensions found in JSON")
        return false
      }

      // Validate each extension
      const validated: ExtensionInput[] = []
      const errors: string[] = []

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const prefix = items.length > 1 ? `Item ${i + 1}: ` : ""

        // Required fields
        if (!item.productId) {
          errors.push(`${prefix}Missing productId`)
          continue
        }
        if (!item.type) {
          errors.push(`${prefix}Missing type`)
          continue
        }
        if (!VALID_TYPES.includes(item.type)) {
          errors.push(`${prefix}Invalid type "${item.type}"`)
          continue
        }
        if (!item.displayName) {
          errors.push(`${prefix}Missing displayName`)
          continue
        }
        if (!item.description) {
          errors.push(`${prefix}Missing description`)
          continue
        }
        if (!item.repoUrl) {
          errors.push(`${prefix}Missing repoUrl`)
          continue
        }
        if (!item.installation) {
          errors.push(`${prefix}Missing installation`)
          continue
        }

        // Normalize tags
        let tags: string[] = []
        if (Array.isArray(item.tags)) {
          tags = item.tags.filter((t: unknown) => typeof t === "string")
        } else if (typeof item.tags === "string") {
          tags = item.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        }

        validated.push({
          productId: item.productId.toLowerCase().replace(/[^a-z-]/g, ""),
          type: item.type,
          displayName: item.displayName,
          description: item.description,
          repoUrl: item.repoUrl,
          homepageUrl: item.homepageUrl || undefined,
          tags,
          installation: item.installation,
        })
      }

      if (errors.length > 0) {
        setParseError(`Validation errors:\n${errors.join("\n")}`)
        return false
      }

      setParsedExtensions(validated)
      return true
    } catch {
      setParseError("Invalid JSON format. Please check your syntax.")
      return false
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".json")) {
      setParseError("Please upload a .json file")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setJsonInput(content)
      parseJson(content)
    }
    reader.onerror = () => {
      setParseError("Failed to read file")
    }
    reader.readAsText(file)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleImport = async () => {
    if (parsedExtensions.length === 0) return

    setIsImporting(true)
    setImportResult(null)

    try {
      const result = await bulkImport({ extensions: parsedExtensions })
      setImportResult(result)
      
      // Clear parsed extensions on success
      if (result.failed === 0) {
        setParsedExtensions([])
        setJsonInput("")
      }
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Import failed")
    } finally {
      setIsImporting(false)
    }
  }

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

  if (isAdmin === undefined) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Header />
        <div className="mx-auto max-w-[67.5rem] px-[var(--padding)] py-[var(--vertical-padding)]">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded bg-[var(--color-bg-weak)]" />
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
          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--color-text-weak)] transition-colors hover:text-[var(--color-text)]"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">Bulk Import Extensions</h1>
          <p className="mt-1 text-[var(--color-text)]">
            Import multiple extensions from JSON. All imported extensions will go to the pending queue.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Column */}
            <div className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>JSON Input</CardTitle>
                  <CardDescription>
                    Paste JSON array of extensions or upload a .json file
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-3">
                    <p className="text-xs text-[var(--color-text-weak)]">Expected format:</p>
                    <pre className="mt-2 overflow-x-auto text-xs text-[var(--color-text)]">
{`[
  {
    "productId": "my-extension",
    "type": "plugin",
    "displayName": "My Extension",
    "description": "Description",
    "repoUrl": "https://github.com/...",
    "homepageUrl": "https://...",
    "tags": ["tag1", "tag2"],
    "installation": "## Installation\\n..."
  }
]`}
                    </pre>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="jsonInput">JSON Data</Label>
                    <Textarea
                      id="jsonInput"
                      placeholder='[{"productId": "my-extension", ...}]'
                      rows={16}
                      value={jsonInput}
                      onChange={(e) => {
                        setJsonInput(e.target.value)
                        setParseError(null)
                        setImportResult(null)
                      }}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={() => parseJson(jsonInput)}>
                      <FileJson className="mr-2 size-4" />
                      Parse JSON
                    </Button>
                    <label className="flex cursor-pointer items-center gap-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-weak)]">
                      <Upload className="size-4" />
                      Upload .json
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {parseError && (
                    <div className="flex items-start gap-2 rounded border border-[var(--color-danger)] bg-[var(--color-danger)]/10 p-3 text-sm text-[var(--color-danger)]">
                      <AlertCircle className="mt-0.5 size-4 shrink-0" />
                      <pre className="whitespace-pre-wrap">{parseError}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Preview & Results Column */}
            <div className="flex flex-col gap-6">
              {/* Parsed Preview */}
              {parsedExtensions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Ready to Import</CardTitle>
                    <CardDescription>
                      {parsedExtensions.length} extension{parsedExtensions.length === 1 ? "" : "s"} parsed successfully
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="max-h-[400px] overflow-y-auto">
                      <div className="flex flex-col gap-3">
                        {parsedExtensions.map((ext, i) => (
                          <div
                            key={i}
                            className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-medium text-[var(--color-text-strong)]">
                                  {ext.displayName}
                                </p>
                                <p className="text-xs text-[var(--color-text-weak)]">
                                  {ext.productId}
                                </p>
                              </div>
                              <Badge variant="secondary">{ext.type}</Badge>
                            </div>
                            <p className="mt-2 text-sm text-[var(--color-text)]">
                              {ext.description.length > 100
                                ? ext.description.slice(0, 100) + "..."
                                : ext.description}
                            </p>
                            {ext.tags.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {ext.tags.slice(0, 5).map((tag, j) => (
                                  <Badge key={j} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {ext.tags.length > 5 && (
                                  <span className="text-xs text-[var(--color-text-weak)]">
                                    +{ext.tags.length - 5} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleImport}
                      disabled={isImporting}
                      className="w-full"
                    >
                      {isImporting
                        ? "Importing..."
                        : `Import ${parsedExtensions.length} Extension${parsedExtensions.length === 1 ? "" : "s"}`}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Import Results */}
              {importResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>Import Results</CardTitle>
                    <CardDescription>
                      {importResult.succeeded} succeeded, {importResult.failed} failed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      {importResult.results.map((result, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2 rounded p-2 text-sm ${
                            result.success
                              ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                              : "bg-[var(--color-danger)]/10 text-[var(--color-danger)]"
                          }`}
                        >
                          {result.success ? (
                            <CheckCircle className="size-4 shrink-0" />
                          ) : (
                            <XCircle className="size-4 shrink-0" />
                          )}
                          <span className="font-medium">{result.productId}</span>
                          {result.error && (
                            <span className="text-xs">- {result.error}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {importResult.succeeded > 0 && (
                      <div className="mt-4">
                        <Link href="/admin/pending">
                          <Button variant="outline" className="w-full">
                            Review Pending Extensions
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Empty state */}
              {parsedExtensions.length === 0 && !importResult && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <FileJson className="mb-4 size-12 text-[var(--color-text-weak)]" />
                    <p className="text-[var(--color-text-weak)]">
                      Paste JSON and click &ldquo;Parse JSON&rdquo; to preview extensions before importing
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
