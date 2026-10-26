import { ArrowLeft } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { nav } from "@/lib/site";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_30%,black,transparent)]" />
        <div className="absolute -top-20 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-accent/6 blur-[110px]" />
      </div>

      <div className="container-page flex flex-col items-center gap-7 text-center">
        <p className="font-mono text-sm tracking-[0.2em] text-accent-dim">404</p>
        <h1 className="max-w-2xl text-4xl font-semibold sm:text-5xl lg:text-6xl">
          That page doesn&apos;t exist
        </h1>
        <p className="max-w-md text-lg text-muted">
          The link may be old, or we may have moved something. Here&apos;s the way
          back.
        </p>
        <ButtonLink href="/" size="lg" className="mt-2">
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back home
        </ButtonLink>
        <nav aria-label="Pages" className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
