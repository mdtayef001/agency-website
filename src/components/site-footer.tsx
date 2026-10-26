import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { agency, caseStudies, nav, services, socials } from "@/lib/site";

const columns = [
  {
    heading: "Services",
    links: services.map((s) => ({
      href: `/services#${s.slug}`,
      label: s.name,
      external: false,
    })),
  },
  {
    heading: "Work",
    links: [
      ...caseStudies.map((c) => ({
        href: `/work/${c.slug}`,
        label: c.client,
        external: false,
      })),
      { href: "/friday-inventory", label: "Friday Inventory", external: false },
    ],
  },
  {
    heading: "Studio",
    links: [
      { href: "/about", label: "About", external: false },
      { href: "/contact", label: "Contact", external: false },
      { href: socials.linkedinTayef, label: "LinkedIn", external: true },
    ],
  },
];

/**
 * Cache Components treats `new Date()` as unstable during prerender, so the
 * copyright year is cached rather than read on every render.
 */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="relative mt-px border-t border-line bg-surface">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {agency.description}
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${agency.email}`}
                  className="inline-flex items-center gap-2 text-body transition-colors hover:text-accent"
                >
                  <Mail className="size-4 shrink-0 text-faint" />
                  {agency.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${agency.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-body transition-colors hover:text-accent"
                >
                  <MessageCircle className="size-4 shrink-0 text-faint" />
                  {agency.whatsappDisplay}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-muted">
                <MapPin className="size-4 shrink-0 text-faint" />
                {agency.location}
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <h3 className="font-mono text-[0.6875rem] tracking-[0.18em] text-faint uppercase">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-2.5 text-sm">
                  {col.links.map((link) => (
                    <li key={`${col.heading}-${link.label}`}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-body transition-colors hover:text-accent"
                        >
                          {link.label}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-body transition-colors hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-faint">
            © <CopyrightYear /> {agency.legalName}. All rights reserved.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-faint transition-colors hover:text-body"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
