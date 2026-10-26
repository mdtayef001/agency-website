import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn("relative py-20 md:py-28 lg:py-32", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</h2>
      {lead ? (
        <p className="text-base text-muted sm:text-lg lg:text-xl">{lead}</p>
      ) : null}
    </div>
  );
}

/** A hairline divider that fades out at both ends. */
export function Hairline({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-line-strong to-transparent",
        className,
      )}
    />
  );
}
