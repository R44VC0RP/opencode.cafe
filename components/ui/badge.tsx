import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap px-2 py-0.5 text-xs font-medium transition-colors [&>svg]:size-3 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-bg-strong)] text-[var(--color-text-inverted)]",
        secondary:
          "bg-[var(--color-bg-weak)] text-[var(--color-text-strong)] border border-[var(--color-border-weak)]",
        destructive:
          "bg-[var(--color-danger)] text-white",
        outline:
          "border border-[var(--color-border)] text-[var(--color-text)]",
        success:
          "bg-[var(--color-success)] text-white",
        warning:
          "bg-[var(--color-warning)] text-[var(--color-text-strong)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
