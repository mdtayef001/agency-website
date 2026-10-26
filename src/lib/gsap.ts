"use client";

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Registering twice is harmless, but keep it in one place so every component
// imports gsap from here and the plugins are guaranteed to be attached.
gsap.registerPlugin(ScrollTrigger, SplitText, Observer);

/**
 * True when the visitor asked the OS to reduce motion. Every animation in the
 * site checks this and renders the finished state instead of animating.
 * Read lazily rather than at module scope so it can't be baked in during SSR.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, SplitText, Observer };
