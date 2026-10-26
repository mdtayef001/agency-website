import type { Metadata } from "next";
import { Globe, Handshake, Wrench } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { ProcessSection } from "@/components/sections/process-section";
import { TeamSection } from "@/components/sections/team-section";
import { Section, SectionHeading } from "@/components/ui/section";
import { agency } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${agency.name} is a small studio in Bangladesh building CMS websites and custom software for clients worldwide — and Friday Inventory, our own SaaS product.`,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    icon: Handshake,
    name: "Fixed scope, fixed price",
    detail:
      "You get a written scope and a price before work starts. If the scope changes, we re-quote rather than surprise you with an invoice.",
  },
  {
    icon: Wrench,
    name: "You own what we build",
    detail:
      "Code, data, domain and accounts are in your name. No lock-in, no hostage hosting, no monthly fee just to keep the lights on.",
  },
  {
    icon: Globe,
    name: "Bangladesh rates, global standard",
    detail:
      "We're based in Dhaka, which is why the price works. The standard of the work is the part we don't discount.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A small studio that would rather ship than pitch"
        lead={`${agency.name} is a small team covering both halves of the job — the CMS side and the custom-code side — plus a SaaS product of our own that keeps us honest about what shipping really takes.`}
      />

      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow="Why we do this" title="The short version" />
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col gap-5">
              <p className="text-lg leading-relaxed text-body">
                Most small businesses get one of two bad deals: a cheap template
                nobody can maintain, or an agency quote with a zero on the end they
                can&apos;t justify. We sit in the gap — a team small enough that the
                people who scope your project are the people who build it.
              </p>
              <p className="text-lg leading-relaxed text-body">
                Years of client work taught us the thing agencies forget: clients
                care whether the store sells, not which framework it runs on. So
                we pick the boring, correct tool for the job — WordPress when
                WordPress is right, Django when it isn&apos;t — and hand it over
                in a state you can run yourself.
              </p>
              <p className="text-lg leading-relaxed text-body">
                Then we built{" "}
                <span className="text-bright">Friday Inventory</span>, our own
                inventory and POS SaaS, because running a product is the only honest
                way to learn what maintaining software actually costs. Clients
                benefit from what that taught us.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <TeamSection />

      <Section className="border-t border-line">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="How we work with you"
              title="Three things we won't budge on"
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col gap-4 bg-ink p-7 transition-colors duration-300 hover:bg-surface sm:p-9">
                  <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-accent ring-1 ring-line-strong ring-inset">
                    <p.icon className="size-5" />
                  </span>
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <p className="text-sm leading-relaxed text-muted">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10 flex items-center gap-3 rounded-xl bg-surface p-5 ring-1 ring-line ring-inset">
              <Globe className="size-5 shrink-0 text-accent" />
              <p className="text-sm text-body">{agency.locationLong}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <ProcessSection />
      <CtaBand
        title="Let's talk about your project"
        lead="One short call tells us whether we're the right fit. If we're not, we'll say so."
      />
    </>
  );
}
