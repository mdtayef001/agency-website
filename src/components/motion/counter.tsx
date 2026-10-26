"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Counts up to `value` when scrolled into view.
 *
 * The final value is rendered server-side and only replaced once the animation
 * starts, so the real number is in the HTML whether or not JS runs.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(counter.n)}${suffix}`;
        },
      });
    },
    { scope: ref, dependencies: [value, prefix, suffix] },
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
