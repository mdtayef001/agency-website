/**
 * Every piece of copy, link and list on the site lives here.
 *
 * The agency name is not final yet — change `agency.name` and `agency.legalName`
 * below and the whole site (logo, nav, titles, footer, metadata, OG image)
 * follows. Nothing else needs touching.
 */

export const agency = {
  name: "Foundry",
  // Shown in the footer copyright line.
  legalName: "Foundry Studio",
  tagline: "We build websites and software that grow your business",
  // One sentence used for search results and link previews.
  description:
    "A small product studio in Bangladesh building CMS websites and custom software — WordPress, Shopify, Webflow, Next.js and Django — for clients worldwide.",
  email: "hello@example.com",
  // International format, digits only, for the wa.me link.
  whatsapp: "8801700000000",
  whatsappDisplay: "+880 1700 000000",
  location: "Dhaka, Bangladesh",
  locationLong: "Based in Bangladesh · working with clients worldwide",
  // Set this once the domain is bought — used for canonical URLs and the sitemap.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  founded: 2024,
} as const;

export const socials = {
  linkedinTayef: "https://www.linkedin.com/in/mdtayef/",
  linkedinPurna: "https://www.linkedin.com/in/purna-deb-paul-sanju/",
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/friday-inventory", label: "Product" },
  { href: "/about", label: "About" },
] as const;

/* ---------------------------------------------------------------- services */

export type Service = {
  slug: string;
  name: string;
  summary: string;
  forWho: string;
  platforms: string[];
  deliverables: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "cms-websites",
    name: "CMS Websites",
    summary:
      "A site you can update yourself, on the platform that fits how you actually sell.",
    forWho:
      "Businesses, brands and shops that need a site live and selling without hiring a developer for every edit.",
    platforms: ["WordPress", "Shopify", "Webflow", "Wix"],
    deliverables: [
      "Business websites and brochure sites",
      "E-commerce stores with payments and shipping",
      "Landing pages built to convert",
      "Migrations and redesigns of an existing site",
      "Speed, SEO and accessibility passes",
    ],
    outcomes: [
      "You edit your own text and products",
      "Loads fast on a phone and on slow networks",
      "Set up to be found on Google",
    ],
  },
  {
    slug: "custom-development",
    name: "Custom Development",
    summary:
      "When off-the-shelf stops fitting — software built around how your business runs.",
    forWho:
      "Teams with a workflow no template covers: internal tools, dashboards, multi-user systems, SaaS products.",
    platforms: [
      "Next.js",
      "React",
      "Django",
      "Python",
      "Express",
      "NestJS",
      "Supabase",
      "PostgreSQL",
    ],
    deliverables: [
      "Web apps and customer portals",
      "Admin dashboards and reporting",
      "Multi-tenant SaaS products",
      "REST APIs and third-party integrations",
      "Payment gateways, including bKash, Nagad and SSLCommerz",
    ],
    outcomes: [
      "Built for your workflow, not a template's",
      "Yours to own — code, data and accounts",
      "Documented and handed over properly",
    ],
  },
];

/* ----------------------------------------------------------------- process */

// Named `processSteps`, not `process` — the latter shadows the Node global.
export const processSteps = [
  {
    step: "01",
    name: "Discuss",
    detail:
      "A call to understand the business, the goal and the budget. You get a written scope and a fixed price before anything starts.",
  },
  {
    step: "02",
    name: "Design",
    detail:
      "Structure first, then screens. You see and approve the layout before a line of code is written.",
  },
  {
    step: "03",
    name: "Build",
    detail:
      "Built in short cycles on a live preview link, so you watch it come together instead of waiting for a reveal.",
  },
  {
    step: "04",
    name: "Launch",
    detail:
      "Domain, hosting, analytics, SEO basics and a walkthrough of how to run it yourself.",
  },
  {
    step: "05",
    name: "Support",
    detail:
      "We stay reachable after launch for fixes, updates and whatever comes next.",
  },
] as const;

/* -------------------------------------------------------------- tech stack */

export const techStack = [
  { group: "CMS & commerce", items: ["WordPress", "WooCommerce", "Shopify", "Webflow", "Wix"] },
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["Django", "Python", "Express", "NestJS", "Node.js"] },
  { group: "Data & infra", items: ["PostgreSQL", "Supabase", "SQLite", "Vercel"] },
  { group: "Payments", items: ["bKash", "Nagad", "Rocket", "SSLCommerz", "Stripe"] },
] as const;

/* ------------------------------------------------------------- case studies */

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  year: string;
  liveUrl: string;
  /** Short line used on cards and the home page. */
  teaser: string;
  platforms: string[];
  problem: string[];
  built: string[];
  result: string[];
  /** Path under /public, or null to render a styled fallback instead. */
  image: string | null;
  featured: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "baindee",
    client: "Baindee",
    title: "A heritage saree brand that sells direct, at home and abroad",
    category: "E-commerce · WordPress",
    year: "2025",
    liveUrl: "https://baindee.com/home/",
    teaser:
      "Handwoven Jamdani sarees sold direct from 100 weaver families — retail and wholesale in one store.",
    platforms: ["WordPress", "WooCommerce"],
    problem: [
      "Baindee works with around 100 weaver families and wanted to reach buyers without middlemen taking the margin.",
      "The catalogue spans sarees, handloom fabric and bangles, and the same store has to serve both a shopper buying one saree and a boutique placing a bulk or private-label order.",
      "Most customers arrive on a phone and expect cash on delivery; overseas retailers expect worldwide shipping.",
    ],
    built: [
      "A WooCommerce storefront organised by collection — Jamdani sarees, handloom fabrics and bangles — so the catalogue stays browsable as it grows.",
      "Retail checkout with cash on delivery nationwide, alongside a wholesale and private-label enquiry path for boutiques.",
      "A product layout that holds up on a slow mobile connection, plus returns and exchange policy pages and WhatsApp support.",
      "Pages telling the weaver story, because that story is the reason the brand charges what it does.",
    ],
    result: [
      "One store covering direct-to-consumer and B2B wholesale without a separate site.",
      "The team adds products and edits pages themselves in WordPress.",
      "Shipping reaches retailers worldwide while local orders stay on cash on delivery.",
    ],
    image: "/screenshots/baindee.png",
    featured: true,
  },
  {
    slug: "cjshop",
    client: "CJShop",
    title: "Design-your-own saree, turned into a working product configurator",
    category: "Custom commerce · WordPress",
    year: "2025",
    liveUrl: "https://cjshop.org/",
    teaser:
      "A custom Jamdani studio where buyers pick the design, colours and motifs before a weaver starts.",
    platforms: ["WordPress", "WooCommerce"],
    problem: [
      "CJShop, the bespoke side of the Baindee brand, sells sarees that do not exist yet — each one is handwoven to the buyer's own design.",
      "That cannot be a normal add-to-cart. A buyer has to choose a base design, then colours, motifs and embellishments, and understand what they will get before committing to a months-long weave.",
      "Buyers are international and need a consultation step, not a checkout button.",
    ],
    built: [
      "A customisation flow over WooCommerce: 20+ base designs, 26+ thread colours and 12 classic motifs, chosen step by step.",
      "A four-stage path — choose, customise, request, production — so the buyer always knows where their order stands.",
      "A free design consultation request as the primary call to action, with WhatsApp as the fallback channel.",
      "A second catalogue, Jamdani World, for non-saree garments woven in the same style — kimonos, hanboks, kaftans.",
    ],
    result: [
      "Bespoke orders are taken online instead of entirely over chat.",
      "The studio expanded past sarees into other cultural garments on the same system.",
      "Sits alongside the ready-made Baindee store, each pointing buyers to the other.",
    ],
    image: "/screenshots/cjshop.png",
    featured: true,
  },
];

/* ------------------------------------------------------- product: Friday */

export const friday = {
  name: "Friday Inventory",
  tagline: "Inventory and point of sale for shops that outgrew the notebook",
  summary:
    "A multi-tenant inventory and POS SaaS for shops and businesses in Bangladesh. Built and run by us, on Django and Next.js — proof we can ship real software, not just sites.",
  // Confirm in platform settings before publishing.
  price: "৳1,000",
  pricePeriod: "per month",
  trial: "7-day free trial",
  stack: ["Django", "Next.js", "PostgreSQL", "Supabase", "Vercel"],
  features: [
    {
      name: "Point of sale",
      detail:
        "Sell from a phone or a desktop — barcode scanner, cart, printable receipts and receipt links over WhatsApp.",
      icon: "scan",
    },
    {
      name: "Stock across locations",
      detail:
        "Warehouses and storefronts, transfers between them, stock requests and adjustments with a trail.",
      icon: "warehouse",
    },
    {
      name: "Purchases and suppliers",
      detail:
        "Purchase orders, supplier returns and supplier payment tracking in one place.",
      icon: "truck",
    },
    {
      name: "Clients and delivery",
      detail:
        "Client records and shareable order tracking links customers can open themselves.",
      icon: "users",
    },
    {
      name: "Rentals and returns",
      detail: "Rental tracking and sale returns, handled as first-class flows.",
      icon: "repeat",
    },
    {
      name: "Team roles",
      detail:
        "Owner, manager and staff accounts with per-location access and a full activity log.",
      icon: "shield",
    },
    {
      name: "Bangladeshi payments",
      detail: "bKash, Nagad, Rocket and SSLCommerz, wired in from day one.",
      icon: "wallet",
    },
    {
      name: "Data export",
      detail: "Products, stock and locations out as CSV whenever you want them.",
      icon: "download",
    },
  ],
  comingSoon: ["Automatic SMS order tracking", "Offline selling"],
  /**
   * Screenshots captured from the Friday Inventory dev server.
   * Drop replacements at the same paths to update them.
   */
  shots: [
    { src: "/screenshots/friday-dashboard.png", label: "Dashboard" },
    { src: "/screenshots/friday-pos.png", label: "Point of sale" },
    { src: "/screenshots/friday-inventory.png", label: "Inventory" },
    { src: "/screenshots/friday-receipt.png", label: "Receipt" },
  ],
} as const;

/* -------------------------------------------------------------------- team */

/**
 * `photo` is a square image under /public/team. Set it to null and the card
 * falls back to an initials monogram, so a missing headshot never breaks a
 * layout. Square crops at 800×800 or larger look best.
 */
export const team = [
  {
    name: "Md Tayef",
    /** Job title shown under the name. */
    position: "Co-founder & Lead Engineer",
    focus: "Custom development",
    bio: "Builds the custom side — Django and Next.js applications, APIs and dashboards. Architects and runs Friday Inventory, our own SaaS product.",
    skills: ["Django", "Next.js", "PostgreSQL", "System design"],
    linkedin: socials.linkedinTayef,
    portfolio: null,
    initials: "MT",
    photo: "/team/tayef.png" as string | null,
  },
  {
    name: "Purna Deb Paul",
    position: "Co-founder & CMS Lead",
    focus: "CMS & design",
    bio: "Builds the CMS side — WordPress and Webflow sites with a clean back end, so clients can run them themselves once we hand over.",
    skills: ["WordPress", "Webflow", "WooCommerce", "UI design"],
    linkedin: socials.linkedinPurna,
    portfolio: "https://purnadebpaul.com/",
    initials: "PP",
    photo: "/team/sanju.jpeg" as string | null,
  },
];

/* ------------------------------------------------------------ testimonials */

/**
 * PLACEHOLDER — replace `quote`, `author` and `role` with real client words
 * before the site goes live, then set `placeholder: false`. The section hides
 * itself automatically if every entry is still a placeholder in production.
 */
export const testimonials = [
  {
    quote:
      "Paste a real client review here. Two or three sentences works best — what they needed, and what changed after launch.",
    author: "Client name",
    role: "Role, Company",
    placeholder: true,
  },
  {
    quote:
      "Paste a second review here. Reviews that mention a result — faster site, more orders, less manual work — do more than ones that only say thank you.",
    author: "Client name",
    role: "Role, Company",
    placeholder: true,
  },
  {
    quote:
      "Paste a third review here. Keep the client's own wording; polished copy reads less trustworthy than their real sentence.",
    author: "Client name",
    role: "Role, Company",
    placeholder: true,
  },
] as const;

/* -------------------------------------------------------------- the basics */

/**
 * Only figures we can stand behind. No invented project counts — a number a
 * prospect can't verify costs more trust than it buys.
 */
export const stats = [
  { value: 9, suffix: "+", label: "Platforms & frameworks", detail: "CMS and custom, one team" },
  { value: 2, suffix: "", label: "Live client stores", detail: "Open them and look" },
  { value: 1, suffix: "", label: "SaaS product", detail: "Built, shipped and run by us" },
  { value: 24, suffix: "h", label: "Typical reply", detail: "Usually much sooner" },
] as const;

/* ------------------------------------------------------------- the story */

/**
 * The home page is written as a narrative rather than a feature list: name the
 * reader's problem, show the way out, prove it, then ask. These are the beats.
 */
export const story = {
  problem: {
    chapter: "01",
    eyebrow: "The problem",
    title: "Most businesses get offered one of two bad deals",
    lead: "Neither of them ends with a website you actually own and can run.",
    options: [
      {
        label: "The cheap template",
        detail:
          "Live in a week, broken in a month. Nobody can edit it, the plugins fight each other, and the person who built it has stopped replying.",
      },
      {
        label: "The agency quote",
        detail:
          "A number with an extra zero, three account managers, and a six-month timeline before you see a single screen that works.",
      },
    ],
    resolution:
      "We sit in the gap: small enough that the people who scope your project are the people who build it, senior enough that it holds up after launch.",
  },
  approach: {
    chapter: "02",
    eyebrow: "The way out",
    title: "Pick the boring, correct tool — then build it properly",
    lead: "WordPress when WordPress is right. Django when it isn't. The decision is made on what your business needs to do, not on what we feel like writing.",
  },
  proof: {
    chapter: "03",
    eyebrow: "The proof",
    title: "Work that's live right now",
    lead: "Not mockups. Open them, put something in the cart, judge for yourself.",
  },
  product: {
    chapter: "04",
    eyebrow: "The proof, part two",
    title: "We don't just build software. We run it.",
    lead: "Friday Inventory is our own SaaS — real customers, real uptime, real support load. Running a product is the only honest way to learn what maintaining one costs.",
  },
  method: {
    chapter: "05",
    eyebrow: "How it goes",
    title: "Five steps, no surprises",
    lead: "You know the scope and the price before we start, and you watch it come together instead of waiting for a reveal.",
  },
  team: {
    chapter: "06",
    eyebrow: "Our team",
    title: "The people who'll actually build it",
    lead: "You talk to the person writing the code. There is no account manager in between, and nothing gets handed to a junior once the contract is signed.",
  },
} as const;

export const projectTypes = [
  "CMS website (WordPress, Shopify, Webflow, Wix)",
  "E-commerce store",
  "Custom web app or dashboard",
  "SaaS product",
  "API or integration work",
  "Friday Inventory",
  "Something else",
] as const;

export const budgetRanges = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Not sure yet",
] as const;
