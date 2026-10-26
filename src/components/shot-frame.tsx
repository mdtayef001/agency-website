import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Wraps a product screenshot in a browser-chrome frame so app screenshots read
 * as software rather than as flat images.
 */
export function ShotFrame({
  src,
  alt,
  label,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl bg-surface-2 ring-1 ring-line-strong ring-inset",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface px-3.5 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        {label ? (
          <span className="mx-auto truncate rounded-md bg-surface-2 px-3 py-0.5 font-mono text-[0.6875rem] text-faint">
            {label}
          </span>
        ) : null}
      </div>
      <div className="relative aspect-16/10">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}
