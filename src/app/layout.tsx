import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { agency } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(agency.url),
  title: {
    default: `${agency.name} — ${agency.tagline}`,
    template: `%s · ${agency.name}`,
  },
  description: agency.description,
  keywords: [
    "web development agency Bangladesh",
    "WordPress developer",
    "Shopify developer",
    "Webflow developer",
    "Next.js development",
    "Django development",
    "custom software agency",
  ],
  authors: [{ name: agency.name }],
  creator: agency.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: agency.url,
    siteName: agency.name,
    title: `${agency.name} — ${agency.tagline}`,
    description: agency.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${agency.name} — ${agency.tagline}`,
    description: agency.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: agency.name,
  description: agency.description,
  url: agency.url,
  email: agency.email,
  foundingDate: String(agency.founded),
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
    addressLocality: "Dhaka",
  },
  areaServed: "Worldwide",
  knowsAbout: [
    "WordPress",
    "Shopify",
    "Webflow",
    "Next.js",
    "React",
    "Django",
    "Supabase",
  ],
  sameAs: [absoluteUrl("/")],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${display.variable} ${mono.variable} min-h-dvh antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <ScrollProgress />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
