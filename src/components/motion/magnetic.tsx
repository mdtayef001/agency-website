"use client";

import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Pulls its child towards the cursor on hover. Pointer-driven only, so it
 * never fires on touch, where there's no hover to respond to.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const move = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      const reset = () =>
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
      };
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
