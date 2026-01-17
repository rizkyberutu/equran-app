"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const iconBoxVariants = cva(
  [
    "flex items-center justify-center shrink-0 relative",
    "before:absolute before:w-[calc(100%-0.0616rem)] before:h-[calc(100%-0.1rem)] before:bg-white",
    "after:absolute after:size-full after:bg-linear-to-b",
    "*:[svg]:relative *:[svg]:z-10",
  ],
  {
    variants: {
      variant: {
        primary: "after:bg-primary/80 after:to-primary text-primary-foreground",
        secondary:
          "after:bg-secondary/80 after:to-secondary text-secondary-foreground",
        tertiary:
          "after:bg-tertiary/80 after:to-tertiary text-tertiary-foreground",
        danger: "after:bg-danger/80 after:to-danger text-danger-foreground",
        info: "after:bg-info/80 after:to-info text-info-foreground",
        success: "after:bg-success/80 after:to-success text-success-foreground",
        warning: "after:bg-warning/80 after:to-warning text-warning-foreground",
        cyan: "after:bg-cyan-500/80 after:to-cyan-500 text-white",
        violet: "after:bg-violet-500/80 after:to-violet-500 text-white",
        rose: "after:bg-rose-500/80 after:to-rose-500 text-white",

        // Subtle variants
        "primary-subtle":
          "bg-primary/10 text-primary before:hidden after:hidden",
        "secondary-subtle":
          "bg-secondary/10 text-secondary-foreground before:hidden after:hidden",
        "tertiary-subtle":
          "bg-tertiary/10 text-tertiary before:hidden after:hidden",
        "danger-subtle": "bg-danger/10 text-danger before:hidden after:hidden",
        "info-subtle": "bg-info/10 text-info before:hidden after:hidden",
        "success-subtle":
          "bg-success/10 text-success before:hidden after:hidden",
        "warning-subtle":
          "bg-warning/10 text-warning before:hidden after:hidden",
        "cyan-subtle":
          "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 before:hidden after:hidden",
        "violet-subtle":
          "bg-violet-500/10 text-violet-600 dark:text-violet-400 before:hidden after:hidden",
        "rose-subtle":
          "bg-rose-500/10 text-rose-600 dark:text-rose-400 before:hidden after:hidden",
      },
      size: {
        sm: "size-7 rounded-sm before:rounded-sm after:rounded-sm *:[svg]:size-3.5",
        md: "size-9 rounded before:rounded after:rounded *:[svg]:size-4.5",
        lg: "size-13 rounded-lg before:rounded-lg after:rounded-lg *:[svg]:size-5.5",
        xl: "size-16 rounded-xl before:rounded-xl after:rounded-xl *:[svg]:size-8",
      },
      circle: {
        true: "rounded-full before:rounded-full after:rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export function IconBox({
  variant,
  size,
  circle,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof iconBoxVariants>) {
  return (
    <div
      data-slot="iconbox"
      {...props}
      className={cn(iconBoxVariants({ variant, size, circle, className }))}
    >
      {children}
    </div>
  );
}
