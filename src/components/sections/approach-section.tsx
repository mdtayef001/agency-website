"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRight, Check, Code2, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Chapter } from "@/components/chapter";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { services, story } from "@/lib/site";

const icons = {
  "cms-websites": LayoutTemplate,
  "custom-development": Code2,
} as const;

/**
 * Chapter 02 — the answer to chapter 01's problem.
 *
 * The chapter text sticks while the two service panels scroll past it, so the
 * framing stays on screen the whole time you're reading the options.
 */
export function ApproachSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("[data-service]").forEach((panel) => {
        gsap.from(panel, {
          opacity: 0,
          y: 70,
          scale: 0.97,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 85%", once: true },
        });

        gsap.from(panel.querySelectorAll("[data-service-item]"), {
          opacity: 0,
          x: -16,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: panel, start: "top 70%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="services"
      className="relative border-t border-line py-20 md:py-24 lg:py-32"
    >
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Chapter
              chapter={story.approach.chapter}
              eyebrow={story.approach.eyebrow}
              title={story.approach.title}
              lead={story.approach.lead}
            />
          </div>

          <div className="flex flex-col gap-5">
            {services.map((service) => {
              const Icon = icons[service.slug as keyof typeof icons] ?? Code2;
              return (
                <Link
                  key={service.slug}
                  href={`/services#${service.slug}`}
                  data-service
                  className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-surface p-7 ring-1 ring-line ring-inset transition-colors duration-300 hover:ring-accent/30 sm:p-10"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-28 -right-20 size-64 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/10"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-xl bg-surface-2 text-accent ring-1 ring-line-strong ring-inset">
                      <Icon className="size-5.5" />
                    </span>
                    <ArrowRight className="size-5 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-semibold sm:text-3xl">
                      {service.name}
                    </h3>
                    <p className="text-base leading-relaxed text-muted">
                      {service.summary}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {service.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        data-service-item
                        className="flex items-start gap-2.5 text-sm text-body"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-wrap gap-1.5 border-t border-line pt-6">
                    {service.platforms.map((platform) => (
                      <li
                        key={platform}
                        className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted ring-1 ring-line ring-inset"
                      >
                        {platform}
                      </li>
                    ))}
                  </ul>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
