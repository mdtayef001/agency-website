import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-accent text-accent-ink hover:bg-accent-dim hover:shadow-[0_0_32px_-6px_var(--color-accent)] active:scale-[0.98]",
  secondary:
    "bg-surface-2 text-bright ring-1 ring-line-strong ring-inset hover:bg-surface-3 hover:ring-faint active:scale-[0.98]",
  ghost: "text-body hover:bg-surface-2 hover:text-bright",
  outline:
    "text-bright ring-1 ring-line-strong ring-inset hover:bg-surface-2 hover:ring-accent/40 active:scale-[0.98]",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
} as const;

type StyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function buttonClasses({ variant = "primary", size = "md" }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button className={cn(buttonClasses({ variant, size }), className)} {...props} />
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={cn(buttonClasses({ variant, size }), className)} {...props} />;
}
