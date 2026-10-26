import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { techStack } from "@/lib/site";

export function TechStackSection() {
  return (
    <Section className="border-t border-line">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Stack"
              title="The tools, so you know what you're getting"
              lead="You shouldn't have to care which framework we use. It's listed here anyway, because the people who do care deserve a straight answer."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="flex flex-col divide-y divide-line border-y border-line">
              {techStack.map((group) => (
                <div
                  key={group.group}
                  className="grid gap-3 py-6 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase sm:pt-1.5">
                    {group.group}
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg bg-surface-2 px-3 py-1.5 text-sm text-body ring-1 ring-line ring-inset transition-colors hover:text-bright hover:ring-line-strong"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
