#!/usr/bin/env bun
/**
 * Script to import extensions from awesome-opencode GitHub repo
 * Run with: bun run scripts/import-awesome-list.ts
 */

import { ConvexHttpClient } from "convex/browser"
import { api } from "../convex/_generated/api"

const AWESOME_OPENCODE_RAW_URL =
  "https://raw.githubusercontent.com/awesome-opencode/awesome-opencode/main/README.md"

// Map awesome-opencode categories to our extension types
const CATEGORY_TO_TYPE: Record<string, string> = {
  plugins: "plugin",
  themes: "theme",
  agents: "plugin", // We'll tag these as agents
  projects: "tool",
  resources: "tool",
}

interface ParsedExtension {
  name: string
  url: string
  description: string
  category: string
  repoOwner?: string
  repoName?: string
}

function extractGitHubInfo(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/\)]+)/)
  if (match) {
    return { owner: match[1], repo: match[2].replace(/\/$/, "") }
  }
  return null
}

function generateProductId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50)
}

function parseMarkdownTable(section: string, category: string): ParsedExtension[] {
  const extensions: ParsedExtension[] = []
  
  // Split into lines and process each table row
  const lines = section.split("\n")
  
  for (const line of lines) {
    // Skip non-table lines
    if (!line.startsWith("|")) continue
    // Skip header and separator rows
    if (line.includes("|---|") || line.match(/\|Name\|Stars\|Description\|/i)) continue
    
    // Match: |[Name](url)|stars badge or -|Description|
    const match = line.match(/^\|\[([^\]]+)\]\(([^)]+)\)\|[^|]*\|([^|]+)\|?$/)
    if (!match) continue
    
    const [, name, url, description] = match
    
    // Skip if it's just a header row or empty
    if (!name || !url || name === "Name") continue
    
    const extension: ParsedExtension = {
      name: name.trim(),
      url: url.trim(),
      description: description.trim(),
      category,
    }
    
    const githubInfo = extractGitHubInfo(url)
    if (githubInfo) {
      extension.repoOwner = githubInfo.owner
      extension.repoName = githubInfo.repo
    }
    
    extensions.push(extension)
  }
  
  return extensions
}

function parseReadme(content: string): ParsedExtension[] {
  const allExtensions: ParsedExtension[] = []
  
  // Split by sections
  const sections = [
    { name: "plugins", header: "## Plugins" },
    { name: "themes", header: "## Themes" },
    { name: "agents", header: "## Agents" },
    { name: "projects", header: "## Projects" },
    { name: "resources", header: "## Resources" },
  ]
  
  for (const section of sections) {
    const startIdx = content.indexOf(section.header)
    if (startIdx === -1) {
      console.log(`Section ${section.name} not found`)
      continue
    }
    
    // Find the next section or end
    let endIdx = content.length
    for (const other of sections) {
      if (other.name === section.name) continue
      const otherIdx = content.indexOf(other.header, startIdx + section.header.length)
      if (otherIdx !== -1 && otherIdx < endIdx) {
        endIdx = otherIdx
      }
    }
    
    // Also check for "---" separator
    const separatorIdx = content.indexOf("\n---\n", startIdx + section.header.length)
    if (separatorIdx !== -1 && separatorIdx < endIdx) {
      endIdx = separatorIdx
    }
    
    const sectionContent = content.slice(startIdx, endIdx)
    console.log(`Parsing section ${section.name}: ${sectionContent.length} chars`)
    const parsed = parseMarkdownTable(sectionContent, section.name)
    console.log(`  Found ${parsed.length} items`)
    allExtensions.push(...parsed)
  }
  
  return allExtensions
}

async function fetchReadme(): Promise<string> {
  console.log("Fetching awesome-opencode README...")
  const response = await fetch(AWESOME_OPENCODE_RAW_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch README: ${response.status}`)
  }
  return response.text()
}

async function importToConvex(extensions: ParsedExtension[], dryRun: boolean = true) {
  if (dryRun) {
    console.log("\n=== DRY RUN MODE ===")
    console.log("No data will be imported. Remove --dry-run flag to actually import.\n")
  }
  
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
  if (!convexUrl && !dryRun) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is required")
  }
  
  const client = convexUrl ? new ConvexHttpClient(convexUrl) : null
  
  console.log(`\nFound ${extensions.length} extensions to import:\n`)
  
  const byCategory: Record<string, ParsedExtension[]> = {}
  for (const ext of extensions) {
    if (!byCategory[ext.category]) byCategory[ext.category] = []
    byCategory[ext.category].push(ext)
  }
  
  for (const [category, exts] of Object.entries(byCategory)) {
    console.log(`\n${category.toUpperCase()} (${exts.length}):`)
    for (const ext of exts) {
      const productId = generateProductId(ext.name)
      const type = CATEGORY_TO_TYPE[category] || "plugin"
      
      console.log(`  - ${ext.name}`)
      console.log(`    productId: ${productId}`)
      console.log(`    type: ${type}`)
      console.log(`    url: ${ext.url}`)
      console.log(`    description: ${ext.description.slice(0, 80)}...`)
      
      if (!dryRun && client) {
        try {
          // Check if already exists
          const existing = await client.query(api.extensions.getByProductId, { productId })
          if (existing) {
            console.log(`    ⏭️  Already exists, skipping`)
            continue
          }
          
          // Note: We can't directly call submit mutation without auth
          // This would need to be done via admin API or internal mutation
          console.log(`    ⚠️  Would need admin API to import`)
        } catch (error) {
          console.log(`    ❌ Error: ${error}`)
        }
      }
    }
  }
  
  return extensions
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = !args.includes("--import")
  
  try {
    const readme = await fetchReadme()
    const extensions = parseReadme(readme)
    
    // Filter out official repositories (we don't want to import those)
    const filtered = extensions.filter(ext => {
      // Skip official SST repos
      if (ext.repoOwner === "sst") return false
      // Skip non-GitHub links (gists, discussions, etc.)
      if (!ext.url.includes("github.com") || ext.url.includes("gist.github") || ext.url.includes("discussions")) return false
      return true
    })
    
    console.log(`\nParsed ${extensions.length} total entries`)
    console.log(`Filtered to ${filtered.length} importable extensions`)
    
    await importToConvex(filtered, dryRun)
    
    if (dryRun) {
      console.log("\n" + "=".repeat(60))
      console.log("To actually import, run: bun run scripts/import-awesome-list.ts --import")
      console.log("=".repeat(60))
    }
    
    // Output JSON for manual import or further processing
    const outputPath = "./scripts/awesome-opencode-parsed.json"
    const fs = await import("fs/promises")
    await fs.writeFile(outputPath, JSON.stringify(filtered, null, 2))
    console.log(`\nParsed data saved to ${outputPath}`)
    
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

main()
