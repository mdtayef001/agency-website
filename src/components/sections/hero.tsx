"use client";

import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";

import { Counter } from "@/components/motion/counter";
import { HeroCanvas } from "@/components/motion/hero-canvas";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitHeading } from "@/components/motion/split-heading";
import { ButtonLink } from "@/components/ui/button";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { agency, caseStudies, stats } from "@/lib/site";

const platforms = [
  "WordPress",
  "Shopify",
  "Webflow",
  "Wix",
  "Next.js",
  "Django",
  "React",
  "Supabase",
  "WooCommerce",
  "PostgreSQL",
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero='badge']", { opacity: 0, y: 20, duration: 0.7 })
        .from(
          "[data-hero='lead']",
          { opacity: 0, y: 24, duration: 0.8 },
          // Overlaps the headline's own line-by-line reveal.
          "-=0.15",
        )
        .from(
          "[data-hero='cta'] > *",
          { opacity: 0, y: 24, duration: 0.7, stagger: 0.1 },
          "-=0.5",
        )
        .from(
          "[data-hero='stat']",
          { opacity: 0, y: 28, duration: 0.7, stagger: 0.08 },
          "-=0.4",
        )
        .from("[data-hero='scroll']", { opacity: 0, duration: 0.6 }, "-=0.3");

      // Drift the whole block up and fade it as the page scrolls away.
      gsap.to("[data-hero='content']", {
        y: -80,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[94svh] flex-col justify-center overflow-hidden pt-20 pb-16"
    >
      <HeroCanvas className="pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink/40 via-transparent to-ink"
      />

      <div data-hero="content" className="container-page">
        <div
          data-hero="badge"
          className="inline-flex items-center gap-2.5 rounded-full bg-surface-2/70 py-1.5 pr-4 pl-2 ring-1 ring-line-strong ring-inset backdrop-blur-md"
        >
          <span className="relative grid size-5 place-items-center">
            <span className="absolute size-2 animate-pulse-ring rounded-full bg-accent/60" />
            <span className="size-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium text-body">
            Taking on new projects
          </span>
          <span aria-hidden className="h-3 w-px bg-line-strong" />
          <span className="text-xs text-muted">{agency.location}</span>
        </div>

        <SplitHeading
          as="h1"
          by="lines"
          immediate
          delay={0.15}
          className="mt-8 max-w-5xl text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.035em] text-bright sm:text-6xl lg:text-[5.25rem]"
        >
          We build websites and software that grow your business
        </SplitHeading>

        <p
          data-hero="lead"
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          Two service lines, one small team. Sites you can run yourself on
          WordPress, Shopify, Webflow and Wix — and custom software in Next.js
          and Django when a template stops fitting.
        </p>

        <div
          data-hero="cta"
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic strength={0.3}>
            <ButtonLink href="/contact" size="lg">
              Start your project
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
          </Magnetic>
          <Magnetic strength={0.22}>
            <ButtonLink href="/work" variant="outline" size="lg">
              See the work
            </ButtonLink>
          </Magnetic>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line/70 pt-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} data-hero="stat" className="flex flex-col gap-1">
              <dd className="font-display text-4xl font-semibold text-bright sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="text-sm font-medium text-body">{stat.label}</dt>
              <p className="text-xs text-faint">{stat.detail}</p>
            </div>
          ))}
        </dl>

        <div
          data-hero="scroll"
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
        >
          <span className="inline-flex items-center gap-2 text-faint">
            <ArrowDown className="size-4 animate-bounce" />
            Scroll
          </span>
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-faint">Live for</span>
            {caseStudies.map((study, i) => (
              <span key={study.slug} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden className="text-faint">·</span> : null}
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {study.client}
                </a>
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Platform marquee, doubled so the loop is seamless. */}
      <div className="relative mt-16 overflow-hidden border-y border-line py-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,var(--color-ink),transparent_12%,transparent_88%,var(--color-ink))]"
        />
        <div className="flex w-max animate-marquee items-center gap-12 pr-12">
          {[...platforms, ...platforms].map((platform, i) => (
            <span
              key={`${platform}-${i}`}
              className="font-display text-xl font-medium whitespace-nowrap text-faint transition-colors hover:text-body sm:text-2xl"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
