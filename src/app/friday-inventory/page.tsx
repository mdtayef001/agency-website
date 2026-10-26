import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  Download,
  Repeat,
  ScanLine,
  Shield,
  Sparkles,
  Truck,
  Users,
  Wallet,
  Warehouse,
} from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { ShotFrame } from "@/components/shot-frame";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { agency, friday } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${friday.name} — inventory and POS for Bangladeshi shops`,
  description:
    "Friday Inventory is a multi-tenant inventory and point-of-sale SaaS for shops in Bangladesh. Barcode POS, multi-location stock, purchase orders, bKash and Nagad payments. 7-day free trial.",
  alternates: { canonical: "/friday-inventory" },
};

const icons = {
  scan: ScanLine,
  warehouse: Warehouse,
  truck: Truck,
  users: Users,
  repeat: Repeat,
  shield: Shield,
  wallet: Wallet,
  download: Download,
} as const;

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: friday.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: friday.summary,
  url: absoluteUrl("/friday-inventory"),
  author: { "@type": "Organization", name: agency.name },
  offers: {
    "@type": "Offer",
    price: "1000",
    priceCurrency: "BDT",
    description: `${friday.trial}, then ${friday.price} ${friday.pricePeriod}`,
  },
};

export default function FridayInventoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our own product"
        title={
          <>
            {friday.name} — {friday.tagline.toLowerCase()}
          </>
        }
        lead={friday.summary}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact" size="lg">
              Start {friday.trial.toLowerCase()}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Request a demo
            </ButtonLink>
          </div>
          <p className="text-sm text-faint">
            {friday.price} {friday.pricePeriod} after the trial · no card needed to
            start
          </p>
          <ul className="flex flex-wrap gap-2">
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
      </PageHeader>

      {/* Screenshots first — for software, seeing it beats reading about it. */}
      <Section className="pb-0 md:pb-0">
        <div className="container-page">
          <Reveal>
            <ShotFrame
              src={friday.shots[0].src}
              alt={`${friday.name} dashboard`}
              label={friday.shots[0].label}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="shadow-2xl shadow-black/60"
            />
          </Reveal>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {friday.shots.slice(1).map((shot, i) => (
              <Reveal key={shot.src} delay={0.06 * (i + 1)}>
                <ShotFrame
                  src={shot.src}
                  alt={`${friday.name} — ${shot.label}`}
                  label={shot.label}
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Features"
              title="Everything a shop runs on, in one account"
              lead="Built from what shop owners actually asked for — not a feature list copied from foreign software."
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
            {friday.features.map((feature, i) => {
              const Icon = icons[feature.icon as keyof typeof icons] ?? Sparkles;
              return (
                <Reveal key={feature.name} delay={(i % 4) * 0.05} className="h-full">
                  <div className="group flex h-full flex-col gap-4 bg-ink p-7 transition-colors duration-300 hover:bg-surface">
                    <span className="grid size-10 place-items-center rounded-lg bg-surface-2 text-accent ring-1 ring-line-strong ring-inset transition-colors group-hover:bg-surface-3">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="text-lg font-semibold">{feature.name}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {feature.detail}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="border-t border-line bg-surface/40">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="flex flex-col gap-6">
              <p className="eyebrow">Pricing</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                One plan, priced for a local shop
              </h2>
              <p className="text-lg leading-relaxed text-muted">
                Start on a {friday.trial.toLowerCase()} with your real products and
                stock. If it doesn&apos;t fit how you work, walk away — your data
                exports to CSV either way.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Unlimited products and stock movements",
                  "Owner, manager and staff accounts",
                  "Multiple warehouses and storefronts",
                  "bKash, Nagad, Rocket and SSLCommerz",
                  "CSV export of everything you put in",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body">
                    <Check className="mt-0.5 size-4.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative flex flex-col gap-7 overflow-hidden rounded-2xl bg-surface p-8 ring-1 ring-line-strong ring-inset sm:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-accent/10 blur-3xl"
                />
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-accent-dim uppercase">
                    Standard
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-5xl font-semibold text-bright">
                      {friday.price}
                    </span>
                    <span className="pb-1.5 text-muted">
                      {friday.pricePeriod}
                    </span>
                  </div>
                  <p className="text-sm text-muted">
                    Starts with a {friday.trial.toLowerCase()}.
                  </p>
                </div>

                <ButtonLink href="/contact" size="lg" className="w-full">
                  Start free trial
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </ButtonLink>

                <div className="flex flex-col gap-3 border-t border-line pt-7">
                  <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase">
                    <Sparkles className="size-3.5" />
                    Coming next
                  </span>
                  <ul className="flex flex-col gap-2">
                    {friday.comingSoon.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-body"
                      >
                        <span
                          aria-hidden
                          className="size-1.5 shrink-0 rounded-full bg-violet"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Want something like this for your business?"
        lead="Friday Inventory started as one shop's problem. If you have a workflow no software fits, that's exactly the kind of thing we build."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}
