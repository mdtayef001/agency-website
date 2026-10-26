import { ApproachSection } from "@/components/sections/approach-section";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProductHighlight } from "@/components/sections/product-highlight";
import { TeamSection } from "@/components/sections/team-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WorkShowcase } from "@/components/sections/work-showcase";

/**
 * The home page is a narrative, read top to bottom:
 *
 *   hook  → the promise and the proof it's real
 *   01    → the problem the reader already has
 *   02    → the way out, and what we actually do
 *   03    → proof: work that's live
 *   04    → proof: a product we run ourselves
 *   05    → how a project actually goes
 *   06    → the people who'll build it
 *   close → the ask
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ApproachSection />
      <WorkShowcase />
      <ProductHighlight />
      <ProcessSection withChapter />
      <TeamSection withChapter />
      <TechStackSection />
      <TestimonialsSection />
      <CtaBand />
    </>
  );
}
