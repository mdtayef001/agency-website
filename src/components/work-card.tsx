import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CaseStudy } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Case-study card. Falls back to a typographic panel when a project has no
 * screenshot yet, so the grid never shows a broken or empty image slot.
 */
export function WorkCard({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line ring-inset transition-all duration-300 hover:ring-line-strong",
        className,
      )}
    >
      <Link
        href={`/work/${study.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`${study.client} case study`}
      />

      <div className="relative aspect-16/10 overflow-hidden border-b border-line bg-surface-2">
        {study.image ? (
          <Image
            src={study.image}
            alt={`${study.client} website`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="relative grid h-full place-items-center overflow-hidden">
            <div
              aria-hidden
              className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-accent/8 blur-3xl"
            />
            <span className="relative font-display text-4xl font-semibold tracking-tight text-bright/90 sm:text-5xl">
              {study.client}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono tracking-[0.12em] text-accent-dim uppercase">
            {study.category}
          </span>
          <span aria-hidden className="h-3 w-px bg-line-strong" />
          <span className="text-faint">{study.year}</span>
        </div>

        <h3 className="text-xl leading-snug font-semibold sm:text-2xl">
          {study.title}
        </h3>

        <p className="text-sm leading-relaxed text-muted">{study.teaser}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <ul className="flex flex-wrap gap-1.5">
            {study.platforms.map((p) => (
              <li
                key={p}
                className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-body ring-1 ring-line ring-inset"
              >
                {p}
              </li>
            ))}
          </ul>
          <span className="flex items-center gap-1 text-sm font-medium whitespace-nowrap text-bright">
            Read
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
