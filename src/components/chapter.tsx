import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { cn } from "@/lib/utils";

/**
 * The opening of a story beat on the home page: a numbered marker, the beat's
 * heading and its one-line setup. Keeps the narrative rhythm identical from
 * section to section.
 */
export function Chapter({
  chapter,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  chapter: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <Reveal
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        <span className="font-mono text-xs tracking-[0.2em] text-accent">
          {chapter}
        </span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>

      <SplitHeading
        by="lines"
        className="text-3xl font-semibold sm:text-4xl lg:text-[3.25rem] lg:leading-[1.05]"
      >
        {title}
      </SplitHeading>

      {lead ? (
        <Reveal delay={0.1}>
          <p className="text-base text-muted sm:text-lg lg:text-xl">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
