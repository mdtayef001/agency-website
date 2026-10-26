"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { Chapter } from "@/components/chapter";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { processSteps, story } from "@/lib/site";

/**
 * The five-step method.
 *
 * On a wide screen the section pins and the steps track sideways as you
 * scroll, with a progress rail filling underneath — the horizontal movement
 * makes "five steps, in order" legible at a glance. Below `lg` it degrades to
 * an ordinary vertical list, because pinning on a phone fights the user.
 */
export function ProcessSection({
  withChapter = false,
}: {
  /** Show the numbered story marker — home page only. */
  withChapter?: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const el = track.current;
        if (!el) return;

        const distance = el.scrollWidth - el.clientWidth;
        if (distance <= 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            // Scroll length proportional to how far the track must travel.
            end: () => `+=${distance + window.innerHeight * 0.6}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(el, { x: -distance, ease: "none" }).to(
          "[data-process-rail]",
          { scaleX: 1, ease: "none" },
          0,
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.from("[data-step]", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: track.current, start: "top 80%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="process"
      className="relative flex flex-col justify-center overflow-hidden border-t border-line bg-surface/30 py-24 lg:min-h-screen lg:py-0"
    >
      <div className="container-page">
        {withChapter ? (
          <Chapter
            chapter={story.method.chapter}
            eyebrow={story.method.eyebrow}
            title={story.method.title}
            lead={story.method.lead}
          />
        ) : (
          <div className="flex max-w-3xl flex-col gap-4">
            <Reveal>
              <p className="eyebrow">How we work</p>
            </Reveal>
            <SplitHeading className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Five steps, no surprises
            </SplitHeading>
            <Reveal delay={0.1}>
              <p className="text-base text-muted sm:text-lg lg:text-xl">
                {story.method.lead}
              </p>
            </Reveal>
          </div>
        )}
      </div>

      <div className="relative mt-14 lg:mt-20">
        <ol
          ref={track}
          className="flex flex-col gap-5 px-5 md:px-8 lg:w-max lg:flex-row lg:gap-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {processSteps.map((step) => (
            <li
              key={step.step}
              data-step
              className="group relative flex flex-col gap-4 rounded-2xl bg-ink p-7 ring-1 ring-line ring-inset transition-colors duration-300 hover:ring-accent/30 lg:w-[22rem] lg:shrink-0 lg:p-9"
            >
              <span className="font-mono text-xs tracking-[0.2em] text-accent">
                {step.step}
              </span>
              <h3 className="text-2xl font-semibold">{step.name}</h3>
              <p className="text-sm leading-relaxed text-muted lg:text-base">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>

        {/* Progress rail, desktop only — it mirrors the pinned scrub. */}
        <div className="container-page mt-10 hidden lg:block">
          <div className="h-px w-full bg-line">
            <div
              data-process-rail
              className="h-full origin-left scale-x-0 bg-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
