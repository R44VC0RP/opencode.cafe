import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-bg-strong)] text-[var(--color-text-inverted)] hover:bg-[var(--color-bg-strong-hover)] active:scale-[0.98]",
        destructive:
          "bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger)]/90 active:scale-[0.98]",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] hover:bg-[var(--color-bg-weak)] hover:border-[var(--color-bg-strong)] active:scale-[0.98]",
        secondary:
          "bg-[var(--color-bg-weak)] text-[var(--color-text-strong)] hover:bg-[var(--color-bg-weak-hover)] active:scale-[0.98]",
        ghost:
          "text-[var(--color-text-weak)] hover:bg-[var(--color-bg-weak)] hover:text-[var(--color-text)]",
        link: "text-[var(--color-text-strong)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3 text-xs",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
