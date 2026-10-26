import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * next/image renders a broken image for a file that isn't there. These are
 * static assets under /public, so check at render time (server-only) and treat
 * a missing file as "no photo yet" instead.
 */
function photoExists(photo: string) {
  return existsSync(path.join(process.cwd(), "public", photo));
}

/**
 * Founder headshot. Falls back to an initials monogram when `photo` is null,
 * so the cards still look deliberate before real photos are added.
 */
export function Avatar({
  photo,
  name,
  initials,
  className,
  sizes = "64px",
  rounded = "rounded-2xl",
}: {
  photo: string | null;
  name: string;
  initials: string;
  className?: string;
  sizes?: string;
  /** Tailwind radius class — rounded-full for the small contact-page list. */
  rounded?: string;
}) {
  if (!photo || !photoExists(photo)) {
    return (
      <span
        aria-hidden
        className={cn(
          "grid shrink-0 place-items-center bg-surface-2 font-display font-semibold text-accent ring-1 ring-line-strong ring-inset",
          rounded,
          className,
        )}
      >
        {initials}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative shrink-0 overflow-hidden bg-surface-2 ring-1 ring-line-strong ring-inset",
        rounded,
        className,
      )}
    >
      <Image
        src={photo}
        alt={name}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </span>
  );
}
