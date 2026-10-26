import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";

/** The standard top block for every page other than the home page. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-16 pb-16 md:pt-24 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_30%_0%,black,transparent)]" />
        <div className="absolute -top-32 left-1/4 size-[32rem] rounded-full bg-accent/6 blur-[110px]" />
      </div>

      <Reveal className="container-page">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </Reveal>
    </section>
  );
}
