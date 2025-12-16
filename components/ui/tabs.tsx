"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-0", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex items-center gap-8",
        "border border-[var(--color-border-weak)] border-b-0",
        "rounded-t-md bg-[var(--color-bg-weak)] px-5",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap py-4 text-sm font-medium transition-all",
        "border-b-2 border-transparent",
        "text-[var(--color-text-weak)]",
        "hover:text-[var(--color-text-strong)]",
        "data-[state=active]:border-[var(--color-bg-strong)]",
        "data-[state=active]:text-[var(--color-text-strong)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "outline-none",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "border border-[var(--color-border-weak)] rounded-b-md bg-[var(--color-bg-weak)] p-4",
        "outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
