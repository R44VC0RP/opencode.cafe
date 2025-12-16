import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-24 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text-strong)] transition-all duration-150",
        "placeholder:text-[var(--color-text-weak)]",
        "focus-visible:border-[var(--color-bg-strong)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-bg-interactive)]",
        "dark:focus-visible:border-[var(--color-bg-interactive)] dark:focus-visible:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
