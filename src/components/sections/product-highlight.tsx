"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";

import { Chapter } from "@/components/chapter";
import { Magnetic } from "@/components/motion/magnetic";
import { ShotFrame } from "@/components/shot-frame";
import { ButtonLink } from "@/components/ui/button";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { friday, story } from "@/lib/site";

const highlights = [
  "Point of sale on phone or desktop, with barcode scanning",
  "Stock across warehouses and storefronts",
  "bKash, Nagad, Rocket and SSLCommerz built in",
];

/**
 * Chapter 04 — our own product as the second piece of proof.
 *
 * The three app screenshots fan out and settle as you scroll, which reads as
 * software rather than as a row of static images.
 */
export function ProductHighlight() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-shot]", {
        opacity: 0,
        y: 90,
        rotate: (i: number) => (i - 1) * 4,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-shot-grid]",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from("[data-product-point]", {
        opacity: 0,
        x: -20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-product-points]",
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
      className="relative overflow-hidden border-t border-line py-20 md:py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-violet/8 blur-[130px]"
      />

      <div className="container-page">
        <Chapter
          chapter={story.product.chapter}
          eyebrow={story.product.eyebrow}
          title={story.product.title}
          lead={story.product.lead}
        />

        <div data-shot-grid className="mt-14 grid gap-5 lg:grid-cols-3">
          {friday.shots.slice(0, 3).map((shot) => (
            <div key={shot.src} data-shot>
              <ShotFrame
                src={shot.src}
                alt={`${friday.name} — ${shot.label}`}
                label={shot.label}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="shadow-2xl shadow-black/50"
              />
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <ul data-product-points className="flex flex-col gap-4">
            {highlights.map((item) => (
              <li
                key={item}
                data-product-point
                className="flex items-start gap-3 text-base text-body sm:text-lg"
              >
                <Check className="mt-1 size-4.5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-5 rounded-2xl bg-surface p-7 ring-1 ring-line ring-inset sm:p-9">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-bright">
                {friday.price}
              </span>
              <span className="text-muted">{friday.pricePeriod}</span>
              <span className="ml-auto rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent/20 ring-inset">
                {friday.trial}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Built on {friday.stack.slice(0, 3).join(", ")} — the same stack we
              use for client work, which is how we know it holds up.
            </p>
            <Magnetic strength={0.25} className="self-start">
              <ButtonLink href="/friday-inventory" size="lg">
                Explore {friday.name}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </ButtonLink>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
