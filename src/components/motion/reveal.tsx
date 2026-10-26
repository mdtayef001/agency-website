"use client";

import { useGSAP } from "@gsap/react";
import { useRef, type ElementType, type ReactNode } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay, for staggering siblings. */
  delay?: number;
  className?: string;
  as?: ElementType;
  /** Direction the content travels in from. */
  from?: "up" | "down" | "left" | "right" | "none";
  /** Stagger each direct child instead of moving the wrapper as one block. */
  stagger?: boolean;
};

const offsets = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  none: { x: 0, y: 0 },
} as const;

/**
 * Lifts content into place as it scrolls into view.
 *
 * Animated with `gsap.from()` inside `useGSAP`, which runs before paint — so
 * the markup ships visible (good for crawlers and for a failed JS load) and
 * there's still no flash of the un-animated state.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  from = "up",
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;

      const targets = stagger
        ? Array.from(ref.current.children)
        : [ref.current];

      gsap.from(targets, {
        opacity: 0,
        ...offsets[from],
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
