"use client";

import { useGSAP } from "@gsap/react";
import { useRef, type ElementType, type ReactNode } from "react";

import { SplitText, gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplitHeadingProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Split into lines (big display headings) or words (shorter text). */
  by?: "lines" | "words";
  delay?: number;
  /** Animate on mount rather than waiting to scroll into view. */
  immediate?: boolean;
};

/**
 * Headline that rises line-by-line from behind a mask as it enters view.
 *
 * The text stays plain in the HTML — SplitText rewrites the DOM on the client
 * only, so screen readers and crawlers see one normal heading, not a pile of
 * per-word spans. `revert()` on cleanup puts the original markup back.
 */
export function SplitHeading({
  children,
  className,
  as: Tag = "h2",
  by = "lines",
  delay = 0,
  immediate = false,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) return;

      // Wait for webfonts, or the split measures the fallback face and lines
      // break in the wrong places.
      const run = () => {
        const split = new SplitText(el, {
          type: by === "lines" ? "lines" : "words",
          linesClass: "split-line",
          wordsClass: "split-word",
          // Each line gets a wrapper we can clip against for the mask effect.
          mask: by === "lines" ? "lines" : undefined,
        });

        const targets = by === "lines" ? split.lines : split.words;

        gsap.from(targets, {
          yPercent: 115,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.09,
          delay,
          scrollTrigger: immediate
            ? undefined
            : { trigger: el, start: "top 85%", once: true },
        });

        return () => split.revert();
      };

      let cleanup: (() => void) | undefined;
      if (document.fonts?.status === "loaded") {
        cleanup = run();
      } else {
        document.fonts?.ready.then(() => {
          cleanup = run();
        });
      }
      return () => cleanup?.();
    },
    { scope: ref, dependencies: [by, delay, immediate] },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
