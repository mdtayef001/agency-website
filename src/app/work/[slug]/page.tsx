import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { ShotFrame } from "@/components/shot-frame";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { WorkCard } from "@/components/work-card";
import { caseStudies } from "@/lib/site";

type Params = { slug: string };

/**
 * The whole page is the case study, so there's no URL-independent shell worth
 * sharing across links — wrapping it in Suspense would just prefetch an empty
 * frame. Both case studies are prerendered by generateStaticParams anyway, so
 * opting out of instant-navigation validation costs nothing.
 */
export const instant = false;

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};

  return {
    title: `${study.client} — ${study.category}`,
    description: study.teaser,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: study.title, description: study.teaser },
  };
}

const blocks = [
  { key: "problem", heading: "The problem", eyebrow: "01" },
  { key: "built", heading: "What we built", eyebrow: "02" },
  { key: "result", heading: "The result", eyebrow: "03" },
] as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line pt-10 pb-16 md:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_30%_0%,black,transparent)]" />
          <div className="absolute -top-32 left-1/4 size-[32rem] rounded-full bg-accent/6 blur-[110px]" />
        </div>

        <Reveal className="container-page">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>

          <div className="mt-8 flex items-center gap-3 text-xs">
            <span className="font-mono tracking-[0.12em] text-accent-dim uppercase">
              {study.category}
            </span>
            <span aria-hidden className="h-3 w-px bg-line-strong" />
            <span className="text-faint">{study.year}</span>
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {study.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {study.teaser}
          </p>

          <dl className="mt-10 grid gap-x-8 gap-y-6 border-y border-line py-7 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <dt className="font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase">
                Client
              </dt>
              <dd className="text-base font-medium text-bright">{study.client}</dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase">
                Built with
              </dt>
              <dd className="text-base font-medium text-bright">
                {study.platforms.join(", ")}
              </dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase">
                Live site
              </dt>
              <dd>
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-base font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {new URL(study.liveUrl).hostname.replace(/^www\./, "")}
                  <ArrowUpRight className="size-4" />
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {study.image ? (
        <Section className="pb-0 md:pb-0">
          <Reveal className="container-page">
            <ShotFrame
              src={study.image}
              alt={`The ${study.client} website`}
              label={new URL(study.liveUrl).hostname.replace(/^www\./, "")}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="shadow-2xl shadow-black/60"
            />
          </Reveal>
        </Section>
      ) : null}

      <Section>
        <div className="container-page">
          <div className="flex flex-col gap-16 md:gap-20">
            {blocks.map((block, i) => (
              <Reveal
                key={block.key}
                delay={i * 0.06}
                className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16"
              >
                <div className="flex gap-4 lg:sticky lg:top-28 lg:self-start">
                  <span className="font-mono text-xs tracking-[0.18em] text-accent-dim">
                    {block.eyebrow}
                  </span>
                  <h2 className="text-2xl font-semibold sm:text-3xl">
                    {block.heading}
                  </h2>
                </div>
                <div className="flex flex-col gap-5">
                  {study[block.key].map((para) => (
                    <p
                      key={para}
                      className="text-base leading-relaxed text-body sm:text-lg"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <div className="flex flex-col items-start gap-5 rounded-2xl bg-surface p-7 ring-1 ring-line ring-inset sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <div className="flex flex-col gap-1.5">
                <p className="text-lg font-semibold text-bright">
                  See it for yourself
                </p>
                <p className="text-sm text-muted">
                  {study.client} is live and taking orders.
                </p>
              </div>
              <ButtonLink
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="shrink-0"
              >
                Visit {new URL(study.liveUrl).hostname.replace(/^www\./, "")}
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {others.length > 0 ? (
        <Section className="border-t border-line">
          <div className="container-page">
            <h2 className="text-2xl font-semibold sm:text-3xl">Next project</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {others.map((other, i) => (
                <Reveal key={other.slug} delay={i * 0.08}>
                  <WorkCard study={other} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
