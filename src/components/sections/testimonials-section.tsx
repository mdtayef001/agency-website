import { Quote } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { testimonials } from "@/lib/site";

/**
 * Renders real reviews only. While every entry in `testimonials` is still a
 * placeholder the section is shown in development (so the layout can be
 * checked) and hidden in production, so the live site never ships fake praise.
 */
export function TestimonialsSection() {
  const real = testimonials.filter((t) => !t.placeholder);
  const isProd = process.env.NODE_ENV === "production";

  if (real.length === 0 && isProd) return null;

  const items = real.length > 0 ? real : testimonials;

  return (
    <Section className="border-t border-line bg-surface/40">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Client words"
            title="What clients say after launch"
            lead="In their words, after launch."
            align="center"
          />
        </Reveal>

        {real.length === 0 ? (
          <p className="mx-auto mt-6 max-w-xl rounded-lg bg-surface-2 px-4 py-3 text-center text-sm text-accent-dim ring-1 ring-accent/20 ring-inset">
            Development only: these are placeholders. Add real client reviews in{" "}
            <code className="font-mono text-xs">src/lib/site.ts</code> — this
            section hides itself in production until you do.
          </p>
        ) : null}

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.author + i} delay={i * 0.08}>
              <figure className="flex h-full flex-col gap-6 rounded-2xl bg-surface p-7 ring-1 ring-line ring-inset">
                <Quote
                  aria-hidden
                  className="size-7 shrink-0 fill-accent/15 text-accent/40"
                />
                <blockquote className="flex-1 text-base leading-relaxed text-body">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-line pt-5">
                  <span
                    aria-hidden
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 font-display text-sm font-semibold text-accent ring-1 ring-line-strong ring-inset"
                  >
                    {t.author.charAt(0)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-bright">
                      {t.author}
                    </span>
                    <span className="text-xs text-faint">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
