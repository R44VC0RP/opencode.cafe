import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text-strong)] transition-all duration-150",
        "placeholder:text-[var(--color-text-weak)]",
        "focus-visible:border-[var(--color-bg-strong)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-bg-interactive)]",
        "dark:focus-visible:border-[var(--color-bg-interactive)] dark:focus-visible:ring-0",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      {...props}
    />
  )
}

export { Input }
