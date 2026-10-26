import Link from "next/link";

import { agency } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark plus a monogram built from the agency name, so renaming the agency
 * in `src/lib/site.ts` updates the logo with it.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  const monogram = agency.name.trim().charAt(0).toUpperCase();

  return (
    <Link
      href="/"
      aria-label={`${agency.name} — home`}
      className={cn("group flex items-center gap-2.5", className)}
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-[0.625rem] bg-accent text-accent-ink ring-1 ring-accent/50 transition-transform duration-300 group-hover:scale-105">
        <span className="font-display text-lg leading-none font-bold">
          {monogram}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 translate-y-full bg-gradient-to-t from-black/25 to-transparent transition-transform duration-300 group-hover:translate-y-0"
        />
      </span>
      {showWordmark ? (
        <span className="font-display text-lg font-semibold tracking-tight text-bright">
          {agency.name}
        </span>
      ) : null}
    </Link>
  );
}
