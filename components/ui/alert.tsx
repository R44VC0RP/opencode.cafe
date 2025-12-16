import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-md border p-4 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4 [&>svg+div]:pl-7",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-text)]",
        destructive:
          "border-[var(--color-danger)]/50 bg-[var(--color-danger)]/10 text-[var(--color-danger)] [&>svg]:text-[var(--color-danger)]",
        success:
          "border-[var(--color-success)]/50 bg-[var(--color-success)]/10 text-[var(--color-success)] [&>svg]:text-[var(--color-success)]",
        warning:
          "border-[var(--color-warning)]/50 bg-[var(--color-warning)]/10 text-[var(--color-warning)] [&>svg]:text-[var(--color-warning)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("font-medium leading-none tracking-tight text-[var(--color-text-strong)]", className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("mt-1 text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
