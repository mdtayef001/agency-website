"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useRef } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { ButtonLink } from "@/components/ui/button";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { agency } from "@/lib/site";

export function CtaBand({
  title = "Let's build your project",
  lead = "Tell us what the business needs to do. You get a written scope and a fixed price before anything starts — no obligation.",
}: {
  title?: string;
  lead?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Glow swells as the band comes into view, pulling the eye to the CTA.
      gsap.fromTo(
        "[data-cta-glow]",
        { scale: 0.6, opacity: 0.25 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-t border-line py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]" />
        <div
          data-cta-glow
          className="absolute bottom-0 left-1/2 size-[34rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-accent/12 blur-[110px]"
        />
      </div>

      <div className="container-page">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <SplitHeading
            as="h2"
            className="text-4xl font-semibold sm:text-5xl lg:text-6xl"
          >
            {title}
          </SplitHeading>

          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">{lead}</p>
          </Reveal>

          <Reveal delay={0.15} stagger className="flex flex-col items-center gap-3 sm:flex-row">
            <Magnetic strength={0.3}>
              <ButtonLink href="/contact" size="lg">
                Start your project
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </ButtonLink>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a
                href={`https://wa.me/${agency.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold text-bright ring-1 ring-line-strong ring-inset transition-colors hover:bg-surface-2 hover:ring-accent/40"
              >
                <MessageCircle className="size-4.5" />
                Chat on WhatsApp
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-sm text-faint">
              Replies within one working day · {agency.locationLong}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
