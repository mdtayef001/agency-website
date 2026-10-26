"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Chapter } from "@/components/chapter";
import { Magnetic } from "@/components/motion/magnetic";
import { ButtonLink } from "@/components/ui/button";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { caseStudies, story } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Chapter 03 — alternating full-width case studies.
 *
 * Each screenshot sits in an over-tall frame and drifts against the scroll, so
 * the image reveals a little more of itself as you pass. Two projects is too
 * few for a horizontal rail, and these panels give each one more room anyway.
 */
export function WorkShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("[data-case]").forEach((panel) => {
        const image = panel.querySelector("[data-case-image]");
        const copy = panel.querySelectorAll("[data-case-copy] > *");

        if (image) {
          // Oversized image inside a clipped frame, nudged on scroll.
          gsap.fromTo(
            image,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );

          gsap.from(panel.querySelector("[data-case-frame]"), {
            opacity: 0,
            y: 60,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 80%", once: true },
          });
        }

        gsap.from(copy, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 72%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="work"
      className="relative border-t border-line py-20 md:py-24 lg:py-32"
    >
      <div className="container-page">
        <Chapter
          chapter={story.proof.chapter}
          eyebrow={story.proof.eyebrow}
          title={story.proof.title}
          lead={story.proof.lead}
        />
      </div>

      <div className="mt-14 flex flex-col gap-16 md:gap-24">
        {caseStudies.map((study, index) => {
          const flipped = index % 2 === 1;
          return (
            <article key={study.slug} data-case className="container-page">
              <div
                className={cn(
                  "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                  flipped && "lg:[&>*:first-child]:order-2",
                )}
              >
                <Link
                  href={`/work/${study.slug}`}
                  data-case-frame
                  aria-label={`${study.client} case study`}
                  className="group relative block aspect-4/3 overflow-hidden rounded-2xl bg-surface-2 ring-1 ring-line ring-inset"
                >
                  {study.image ? (
                    <div data-case-image className="absolute -inset-y-[8%] inset-x-0">
                      <Image
                        src={study.image}
                        alt={`${study.client} website`}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <div className="grid h-full place-items-center">
                      <span className="font-display text-5xl font-semibold text-bright/90">
                        {study.client}
                      </span>
                    </div>
                  )}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </Link>

                <div data-case-copy className="flex flex-col gap-5">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono tracking-[0.12em] text-accent-dim uppercase">
                      {study.category}
                    </span>
                    <span aria-hidden className="h-3 w-px bg-line-strong" />
                    <span className="text-faint">{study.year}</span>
                  </div>

                  <h3 className="text-3xl leading-tight font-semibold sm:text-4xl">
                    {study.title}
                  </h3>

                  <p className="text-base leading-relaxed text-muted sm:text-lg">
                    {study.teaser}
                  </p>

                  <ul className="flex flex-wrap gap-1.5">
                    {study.platforms.map((platform) => (
                      <li
                        key={platform}
                        className="rounded-full bg-surface-2 px-3 py-1 text-xs text-body ring-1 ring-line ring-inset"
                      >
                        {platform}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <ButtonLink href={`/work/${study.slug}`} variant="secondary">
                      Read the case study
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </ButtonLink>
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                    >
                      Visit {new URL(study.liveUrl).hostname.replace(/^www\./, "")}
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="container-page mt-16 flex justify-center">
        <Magnetic strength={0.25}>
          <ButtonLink href="/work" variant="outline" size="lg">
            See all work
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </ButtonLink>
        </Magnetic>
      </div>
    </section>
  );
}
