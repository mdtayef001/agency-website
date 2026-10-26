import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle } from "lucide-react";

import { Avatar } from "@/components/avatar";
import { ContactForm } from "@/components/contact-form";
import { LinkedInIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { agency, socials, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Tell us about your project and get a written scope and a fixed price before anything starts. Email, WhatsApp or the form — ${agency.name}, ${agency.location}.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: agency.whatsappDisplay,
    href: `https://wa.me/${agency.whatsapp}`,
    detail: "Fastest reply",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: agency.email,
    href: `mailto:${agency.email}`,
    detail: "For briefs and attachments",
    external: false,
  },
  {
    icon: ArrowUpRight,
    label: "LinkedIn",
    value: "Message us on LinkedIn",
    href: socials.linkedinTayef,
    detail: "If you'd rather check us out first",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you need built"
        lead="A few sentences is enough to start. You'll get a written scope and a fixed price before any work begins — and an honest answer if we're not the right fit."
      />

      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold">Or reach us directly</h2>
                <p className="text-sm leading-relaxed text-muted">
                  Prefer not to use a form? Any of these reach the same two people.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-start gap-4 rounded-xl bg-surface p-5 ring-1 ring-line ring-inset transition-all duration-200 hover:ring-accent/40"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-2 text-accent ring-1 ring-line-strong ring-inset">
                        <channel.icon className="size-4.5" />
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-xs tracking-wide text-faint uppercase">
                          {channel.label}
                        </span>
                        <span className="text-base font-medium text-bright transition-colors group-hover:text-accent">
                          {channel.value}
                        </span>
                        <span className="text-xs text-muted">{channel.detail}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 rounded-xl bg-surface p-5 ring-1 ring-line ring-inset">
                <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase">
                  Our team
                </h3>
                <ul className="flex flex-col gap-3">
                  {team.map((member) => (
                    <li key={member.name}>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3"
                      >
                        <Avatar
                          photo={member.photo}
                          name={member.name}
                          initials={member.initials}
                          rounded="rounded-full"
                          className="size-9 text-xs"
                          sizes="36px"
                        />
                        <span className="flex flex-col">
                          <span className="text-sm font-medium text-bright transition-colors group-hover:text-accent">
                            {member.name}
                          </span>
                          <span className="text-xs text-faint">
                            {member.position}
                          </span>
                        </span>
                        <LinkedInIcon className="ml-auto size-4 text-faint transition-colors group-hover:text-accent" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="flex flex-col gap-4 border-t border-line pt-7 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-faint" />
                  <div>
                    <dt className="font-medium text-bright">Response time</dt>
                    <dd className="text-muted">
                      Within one working day, usually sooner
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-faint" />
                  <div>
                    <dt className="font-medium text-bright">Where we are</dt>
                    <dd className="text-muted">{agency.locationLong}</dd>
                  </div>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
