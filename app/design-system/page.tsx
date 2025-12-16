"use client"

import { useState } from "react"
import Image from "next/image"
import { AlertCircle, Check, ChevronDown, Info, Terminal, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[var(--color-border-weak)] bg-[var(--color-bg)] px-[var(--padding)]">
        <div className="mx-auto flex h-14 max-w-[67.5rem] items-center justify-between">
          <a href="/" className="flex items-center">
            <Image
              src="/opencode-wordmark.svg"
              alt="opencode"
              width={117}
              height={21}
              className="dark:invert"
            />
          </a>
          <span className="text-sm text-[var(--color-text-weak)]">Design System</span>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)]">
        <div className="mx-auto max-w-[67.5rem] px-[var(--padding)] py-[var(--vertical-padding)]">
          <h1 className="mb-4 text-3xl font-semibold text-[var(--color-text-strong)]">
            OpenCode Design System
          </h1>
          <p className="max-w-2xl text-[var(--color-text)]">
            A monospace-first, minimal design system inspired by terminal aesthetics. 
            Features warm neutral grays with a yellow-green accent for interactive elements.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-[67.5rem] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="flex flex-col gap-16">

          {/* Colors */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-strong)]">Colors</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-2">
                <div className="h-16 rounded-md bg-[var(--color-bg-strong)]"></div>
                <span className="text-xs text-[var(--color-text-weak)]">bg-strong</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-16 rounded-md bg-[var(--color-bg-weak)] border border-[var(--color-border)]"></div>
                <span className="text-xs text-[var(--color-text-weak)]">bg-weak</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-16 rounded-md bg-[var(--color-bg-interactive)]"></div>
                <span className="text-xs text-[var(--color-text-weak)]">bg-interactive (accent)</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-16 rounded-md bg-[var(--color-danger)]"></div>
                <span className="text-xs text-[var(--color-text-weak)]">danger</span>
              </div>
            </div>
          </section>

          <Separator />

          {/* Buttons */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-strong)]">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button>
                <Terminal className="size-4" />
                With Icon
              </Button>
            </div>
          </section>

          <Separator />

          {/* Cards */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-strong)]">Cards</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here with more details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--color-text)]">
                    This is the card content area where you can put any content.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>MCP Server</CardTitle>
                  <CardDescription>by opencode · 12.4k downloads</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--color-text)]">
                    Integrate GitHub issues, PRs, and repositories directly into your workflow.
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Badge>MCP</Badge>
                  <Badge variant="secondary">Official</Badge>
                </CardFooter>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Form Elements */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-strong)]">Form Elements</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="input">Input</Label>
                <Input id="input" placeholder="Enter text..." />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="input-disabled">Disabled Input</Label>
                <Input id="input-disabled" placeholder="Disabled..." disabled />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="select">Select</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select option..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="textarea">Textarea</Label>
                <Textarea id="textarea" placeholder="Enter longer text..." />
              </div>
            </div>
          </section>

          <Separator />

          {/* Badges */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-strong)]">Badges</h2>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
            </div>
          </section>

          <Separator />

          {/* Tabs */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-strong)]">Tabs</h2>
            <Tabs defaultValue="overview" className="w-full max-w-lg">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="installation">Installation</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p className="text-sm text-[var(--color-text)]">
                  This is the overview tab content. It provides a general introduction.
                </p>
              </TabsContent>
              <TabsContent value="installation">
                <p className="text-sm text-[var(--color-text)]">
                  Installation instructions go here. Run{" "}
                  <code className="rounded bg-[var(--color-bg-weak)] px-1 py-0.5 text-xs">
                    bun install opencode
                  </code>
                </p>
              </TabsContent>
              <TabsContent value="usage">
                <p className="text-sm text-[var(--color-text)]">
                  Usage examples and code snippets would appear here.
                </p>
              </TabsContent>
            </Tabs>
          </section>

          <Separator />

          {/* Alerts */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-strong)]">Alerts</h2>
            <div className="flex flex-col gap-4 max-w-lg">
              <Alert>
                <Info className="size-4" />
                <div>
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational alert message.
                  </AlertDescription>
                </div>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <div>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Something went wrong. Please try again.
                  </AlertDescription>
                </div>
              </Alert>
              <Alert variant="success">
                <Check className="size-4" />
                <div>
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Your changes have been saved successfully.
                  </AlertDescription>
                </div>
              </Alert>
            </div>
          </section>

          <Separator />

          {/* Dialog */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-strong)]">Dialog</h2>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a dialog description. It provides context about the dialog content.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setDialogOpen(false)}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>

          <Separator />

          {/* Dropdown Menu */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-strong)]">Dropdown Menu</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Open Menu
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>

          <Separator />

          {/* Accordion */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-strong)]">Accordion (FAQ)</h2>
            <Accordion type="single" collapsible className="w-full max-w-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is OpenCode?</AccordionTrigger>
                <AccordionContent>
                  OpenCode is an open-source AI coding assistant that runs in your terminal.
                  It helps you write, debug, and understand code using natural language.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I install OpenCode?</AccordionTrigger>
                <AccordionContent>
                  You can install OpenCode using various package managers like npm, bun, or curl.
                  Visit the documentation for detailed installation instructions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is OpenCode free?</AccordionTrigger>
                <AccordionContent>
                  Yes, OpenCode is completely free and open-source. You can use your own API keys
                  or use the Zen subscription for a seamless experience.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator />

          {/* Typography */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-strong)]">Typography</h2>
            <div className="flex flex-col gap-4 max-w-lg">
              <div>
                <span className="text-xs text-[var(--color-text-weak)]">text-strong</span>
                <p className="text-[var(--color-text-strong)]">The quick brown fox jumps over the lazy dog.</p>
              </div>
              <div>
                <span className="text-xs text-[var(--color-text-weak)]">text (default)</span>
                <p className="text-[var(--color-text)]">The quick brown fox jumps over the lazy dog.</p>
              </div>
              <div>
                <span className="text-xs text-[var(--color-text-weak)]">text-weak</span>
                <p className="text-[var(--color-text-weak)]">The quick brown fox jumps over the lazy dog.</p>
              </div>
              <div>
                <span className="text-xs text-[var(--color-text-weak)]">text-weaker</span>
                <p className="text-[var(--color-text-weaker)]">The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border-weak)] px-[var(--padding)] py-8">
        <div className="mx-auto flex max-w-[67.5rem] items-center justify-center">
          <span className="text-sm text-[var(--color-text-weak)]">
            OpenCode Design System · Built with shadcn/ui
          </span>
        </div>
      </footer>
    </div>
  )
}
