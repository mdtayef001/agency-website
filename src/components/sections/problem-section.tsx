"use client";

import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";
import { useRef } from "react";

import { Chapter } from "@/components/chapter";
import { Reveal } from "@/components/motion/reveal";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { story } from "@/lib/site";

/**
 * Chapter 01 — names the reader's problem before offering anything.
 *
 * The two bad options slide in from opposite edges and desaturate as you pass
 * them, then the resolution line draws itself in accent. The movement is doing
 * narrative work: the bad options literally fall away.
 */
export function ProblemSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("[data-bad-option]").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: i === 0 ? -60 : 60,
          rotate: i === 0 ? -2.5 : 2.5,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });

        // Dim and tilt away as they leave — these are the options you reject.
        gsap.to(card, {
          opacity: 0.35,
          scale: 0.97,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "bottom 60%",
            end: "bottom 20%",
            scrub: true,
          },
        });
      });

      gsap.from("[data-resolution]", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-resolution]",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative border-t border-line py-20 md:py-24 lg:py-32"
    >
      <div className="container-page">
        <Chapter
          chapter={story.problem.chapter}
          eyebrow={story.problem.eyebrow}
          title={story.problem.title}
          lead={story.problem.lead}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {story.problem.options.map((option) => (
            <div
              key={option.label}
              data-bad-option
              className="relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-surface/70 p-7 ring-1 ring-line ring-inset sm:p-9"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-red-500/10 text-red-400 ring-1 ring-red-500/20 ring-inset">
                <X className="size-5" />
              </span>
              <h3 className="text-xl font-semibold text-bright sm:text-2xl">
                {option.label}
              </h3>
              <p className="text-base leading-relaxed text-muted">
                {option.detail}
              </p>
            </div>
          ))}
        </div>

        <Reveal>
          <p
            data-resolution
            className="mt-14 max-w-4xl text-2xl leading-snug font-medium text-bright sm:text-3xl lg:text-4xl lg:leading-[1.25]"
          >
            {story.problem.resolution}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
