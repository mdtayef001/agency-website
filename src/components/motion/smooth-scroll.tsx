"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { ScrollTrigger, gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Momentum scrolling, driven from GSAP's ticker so Lenis and ScrollTrigger
 * share one rAF loop and never fight over scroll position.
 *
 * Skipped entirely for reduced-motion visitors — hijacking the scroll wheel is
 * exactly what that setting asks us not to do.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices already have native momentum; overriding it feels wrong.
      syncTouch: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // A client navigation keeps the same Lenis instance, so reset it by hand and
  // let ScrollTrigger remeasure the new page.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
