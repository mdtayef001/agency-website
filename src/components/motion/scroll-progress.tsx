"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Thin accent bar across the top showing how far through the page you are. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion()) return;

    gsap.to(ref.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-100 h-0.5"
    >
      <div
        ref={ref}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent via-accent to-violet"
      />
    </div>
  );
}
