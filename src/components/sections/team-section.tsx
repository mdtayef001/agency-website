import { ArrowUpRight } from "lucide-react";

import { Avatar } from "@/components/avatar";
import { Chapter } from "@/components/chapter";
import { LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { story, team } from "@/lib/site";

/**
 * Our team. Each person gets a name, a position and what they actually own —
 * a prospect is deciding whether to trust specific people, not a logo.
 *
 * Deliberately a server component: `Avatar` checks the photo exists on disk,
 * which can't cross into a client bundle. The entrance animation comes from
 * the `Reveal` wrapper, which is the client part.
 */
export function TeamSection({
  /** Show the numbered story marker — home page only. */
  withChapter = false,
}: {
  withChapter?: boolean;
}) {
  return (
    <section
      id="team"
      className="relative border-t border-line py-20 md:py-24 lg:py-32"
    >
      <div className="container-page">
        {withChapter ? (
          <Chapter
            chapter={story.team.chapter}
            eyebrow={story.team.eyebrow}
            title={story.team.title}
            lead={story.team.lead}
          />
        ) : (
          <div className="flex max-w-3xl flex-col gap-4">
            <Reveal>
              <p className="eyebrow">Our team</p>
            </Reveal>
            <SplitHeading className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              {story.team.title}
            </SplitHeading>
            <Reveal delay={0.1}>
              <p className="text-base text-muted sm:text-lg lg:text-xl">
                {story.team.lead}
              </p>
            </Reveal>
          </div>
        )}

        <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-2">
          {team.map((member) => (
            <article
              key={member.name}
              className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-surface p-7 ring-1 ring-line ring-inset transition-colors duration-300 hover:ring-accent/25 sm:p-9"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-28 -right-24 size-64 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/8"
              />

              <div className="flex items-center gap-5">
                <Avatar
                  photo={member.photo}
                  name={member.name}
                  initials={member.initials}
                  className="size-20 text-2xl transition-transform duration-500 group-hover:scale-105"
                  sizes="80px"
                />
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-semibold sm:text-2xl">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-accent">
                    {member.position}
                  </p>
                </div>
              </div>

              <p className="text-base leading-relaxed text-muted">{member.bio}</p>

              <ul className="flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-body ring-1 ring-line ring-inset"
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line pt-6">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3.5 py-1.5 text-sm text-body ring-1 ring-line ring-inset transition-colors hover:text-accent hover:ring-accent/40"
                >
                  <LinkedInIcon className="size-3.5" />
                  LinkedIn
                </a>
                {member.portfolio ? (
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3.5 py-1.5 text-sm text-body ring-1 ring-line ring-inset transition-colors hover:text-accent hover:ring-accent/40"
                  >
                    Portfolio
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
