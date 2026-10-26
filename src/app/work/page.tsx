import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { WorkCard } from "@/components/work-card";
import { caseStudies, friday } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from live client projects — e-commerce and custom commerce builds on WordPress and WooCommerce — plus Friday Inventory, our own SaaS product.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects you can open and judge for yourself"
        lead="Each case study covers the client's problem, what we built, and what changed afterwards. Every site listed here is live."
      />

      <Section>
        <div className="container-page">
          <div className="grid gap-5 lg:grid-cols-2">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.08}>
                <WorkCard study={study} className="h-full" />
              </Reveal>
            ))}

            {/* The product sits in the grid too — it's the strongest proof we have. */}
            <Reveal delay={caseStudies.length * 0.08} className="lg:col-span-2">
              <div className="relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-surface p-7 ring-1 ring-line ring-inset sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-violet/10 blur-3xl"
                />
                <div className="flex max-w-xl flex-col gap-4">
                  <p className="eyebrow">Our own product</p>
                  <h2 className="text-2xl font-semibold sm:text-3xl">
                    {friday.name}
                  </h2>
                  <p className="text-base leading-relaxed text-muted">
                    {friday.summary}
                  </p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {friday.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-muted ring-1 ring-line ring-inset"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <ButtonLink
                  href="/friday-inventory"
                  size="lg"
                  className="shrink-0 self-start lg:self-center"
                >
                  See the product
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-sm leading-relaxed text-faint">
              More projects are being written up. If you want to see something
              closer to your own brief before deciding, ask — we&apos;ll send
              relevant examples.
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Want results like these?"
        lead="Tell us about the project. You'll get a written scope and a fixed price before anything starts."
      />
    </>
  );
}
