"use client";

import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Drifts its content against the scroll direction. `speed` is the fraction of
 * the element's own height it travels across the whole scroll pass — keep it
 * small (0.1–0.25) or it reads as a glitch rather than depth.
 */
export function Parallax({
  children,
  speed = 0.15,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;

      gsap.to(ref.current, {
        yPercent: -speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [speed] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
