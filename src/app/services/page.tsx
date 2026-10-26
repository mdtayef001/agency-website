import type { Metadata } from "next";
import { ArrowRight, Check, Code2, LayoutTemplate, Users } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { ProcessSection } from "@/components/sections/process-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "CMS websites on WordPress, Shopify, Webflow and Wix, and custom development in Next.js, React, Django and Supabase. What's included, who it's for, and how to start.",
  alternates: { canonical: "/services" },
};

const icons = {
  "cms-websites": LayoutTemplate,
  "custom-development": Code2,
} as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Two service lines that cover almost every brief we get"
        lead="A site you can run yourself, or software built around how your business actually works. Here's what each one includes."
      >
        <div className="flex flex-wrap gap-3">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-2 text-sm text-body ring-1 ring-line-strong ring-inset transition-colors hover:text-bright hover:ring-accent/40"
            >
              {s.name}
              <ArrowRight className="size-3.5 rotate-90" />
            </a>
          ))}
        </div>
      </PageHeader>

      {services.map((service, index) => {
        const Icon = icons[service.slug as keyof typeof icons] ?? Code2;
        return (
          <Section
            key={service.slug}
            id={service.slug}
            className={index > 0 ? "border-t border-line" : undefined}
          >
            <div className="container-page">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                <Reveal className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
                  <span className="grid size-12 place-items-center rounded-xl bg-surface-2 text-accent ring-1 ring-line-strong ring-inset">
                    <Icon className="size-5.5" />
                  </span>
                  <h2 className="text-3xl font-semibold sm:text-4xl">
                    {service.name}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted">
                    {service.summary}
                  </p>

                  <div className="flex flex-col gap-3 rounded-xl bg-surface p-5 ring-1 ring-line ring-inset">
                    <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase">
                      <Users className="size-3.5" />
                      Who it&apos;s for
                    </span>
                    <p className="text-sm leading-relaxed text-body">
                      {service.forWho}
                    </p>
                  </div>

                  <ButtonLink href="/contact" className="self-start">
                    Start a {service.name} project
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </ButtonLink>
                </Reveal>

                <div className="flex flex-col gap-10">
                  <Reveal delay={0.08} className="flex flex-col gap-5">
                    <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase">
                      What&apos;s included
                    </h3>
                    {/* An odd number of items would leave a visible empty
                        cell, so the last one spans the full width instead. */}
                    <ul className="grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
                      {service.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-3 bg-ink p-5 text-sm leading-relaxed text-body transition-colors hover:bg-surface"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={0.12} className="flex flex-col gap-5">
                    <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase">
                      Platforms &amp; tools
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {service.platforms.map((p) => (
                        <li
                          key={p}
                          className="rounded-lg bg-surface-2 px-3.5 py-2 text-sm text-body ring-1 ring-line ring-inset"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={0.16} className="flex flex-col gap-5">
                    <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase">
                      What you get out of it
                    </h3>
                    <ul className="flex flex-col divide-y divide-line border-y border-line">
                      {service.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex items-center gap-3 py-4 text-base text-bright"
                        >
                          <span
                            aria-hidden
                            className="size-1.5 shrink-0 rounded-full bg-accent"
                          />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <ProcessSection />
      <TechStackSection />
      <CtaBand
        title="Not sure which one you need?"
        lead="Describe the problem in a few sentences. We'll tell you which approach fits — and say so if your budget is better spent elsewhere."
      />
    </>
  );
}
