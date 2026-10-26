# Agency website

Launch site for the agency — six pages, built with Next.js 16 (App Router),
Tailwind CSS v4, GSAP, Lenis and Three.js. The site is the portfolio piece:
it's the same stack we sell under "Custom Development".

```bash
npm install
npm run dev          # http://localhost:3000
```

## The one file you'll edit most

`src/lib/site.ts` holds every piece of copy, link and list on the site — agency
name, contact details, services, case studies, team, product features, form
options. Nothing is hardcoded in a page.

**The agency name is still a placeholder.** Change `agency.name` and
`agency.legalName` there and the logo, nav, page titles, footer, metadata and
the OG image all follow. The logo monogram is derived from the first letter.

## Pages

| Page | Route | Notes |
| --- | --- | --- |
| Home | `/` | Hero, services, featured work, product, process, stack, testimonials, CTA |
| Services | `/services` | Both service lines, deep-linkable at `#cms-websites` / `#custom-development` |
| Work | `/work` | Case-study grid |
| Case study | `/work/[slug]` | Prerendered from `caseStudies` |
| Product | `/friday-inventory` | Friday Inventory, with screenshots and pricing |
| About | `/about` | Story, founders, principles |
| Contact | `/contact` | Form plus direct channels |

Pricing, blog, FAQ, per-platform service pages and the legal pages are the
"Later" phase and aren't built yet.

## The home page is a story, not a feature list

It's written to be read top to bottom, and `story` in `src/lib/site.ts` holds
the copy for each beat:

| | Beat | Section |
| --- | --- | --- |
| hook | the promise, and proof it's real | `Hero` |
| 01 | the problem the reader already has | `ProblemSection` |
| 02 | the way out — what we actually do | `ApproachSection` |
| 03 | proof: work that's live | `WorkShowcase` |
| 04 | proof: a product we run ourselves | `ProductHighlight` |
| 05 | how a project actually goes | `ProcessSection` |
| 06 | the people who'll build it | `TeamSection` |
| close | the ask | `CtaBand` |

Reorder or drop a beat by editing `src/app/page.tsx`.

## Animation

Primitives live in `src/components/motion/`. All of them check
`prefersReducedMotion()` first and render the finished state instead of
animating, and every scroll reveal uses `gsap.from()` so the markup ships
visible — a crawler or a failed JS load still sees the full page.

- `SmoothScroll` — Lenis momentum scrolling, driven off GSAP's ticker so both
  share one rAF loop. Disabled entirely for reduced-motion visitors.
- `SplitHeading` — line-by-line masked headline reveal. Waits for webfonts
  before splitting, and reverts the DOM on cleanup so assistive tech sees one
  ordinary heading rather than a pile of spans.
- `Reveal` — the general scroll-in. `stagger` animates direct children.
- `HeroCanvas` — a Three.js shader quad (domain-warped simplex noise). One
  full-screen fragment pass, DPR capped at 1.5, paused when off-screen or the
  tab is hidden. Falls back to a CSS gradient that's always rendered
  underneath, so no-WebGL and no-JS both degrade silently.
- `Counter`, `Parallax`, `Magnetic`, `ScrollProgress` — smaller touches.

`ProcessSection` pins and scrolls sideways above `lg` and degrades to a plain
vertical list below it — pinning on a phone fights the user.

If you add a scroll-pinned section, remember `ScrollTrigger.refresh()` runs on
route change in `SmoothScroll`; anything measuring layout needs
`invalidateOnRefresh: true`.

## Contact form

`POST /api/contact` validates with Zod, drops honeypot submissions and rate
limits to 5 per IP per 10 minutes.

**It does not send email yet.** Set these in `.env.local` (and in Vercel) to
turn delivery on — see `src/lib/inquiry-delivery.ts`:

```
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
RESEND_API_KEY=
```

Until they're set, submissions are logged to the server console in development
and **refused in production** with a message pointing the visitor at email and
WhatsApp. That's deliberate: nobody gets told "sent" when nothing was sent.

The in-memory rate limit resets on restart and is per-instance. Move it to a
shared store if the site ever runs on more than one instance.

## Screenshots

All three scripts drive a real browser through `playwright-core` — no browser
download, they use the Chrome and Brave already installed.

```bash
npm run shots:friday    # Friday Inventory product shots (needs its dev servers up)
npm run shots:clients   # live client sites for the case studies
npm run shots:review    # every page of this site, desktop + mobile, into .review/
```

`shots:friday` needs the Friday Inventory repo running:

```bash
cd ../friday/backend  && source .venv/bin/activate && python manage.py runserver 8000
cd ../friday/frontend && npm run dev          # http://localhost:3000
```

It logs in with the demo owner account from `manage.py seed_demo`, so it only
touches local demo data, and it opens the Sell dialog without ever submitting
it. Re-run `shots:clients` whenever a client redesigns and the portfolio stays
current.

`shots:review` also reports console errors and horizontal overflow per page,
which makes it a decent regression check before deploying.

It writes two kinds of output. `*-<page>.png` are full-page captures of the
inner pages. `scroll-desktop/` and `scroll-mobile/` step the home page down in
viewport-sized frames — **use those to judge the home page**. A `fullPage`
capture of a route with pinned ScrollTrigger sections is meaningless: the
pinned element is transformed mid-capture, so the stitched image shows it
smeared or duplicated. That's a screenshot artifact, not a layout bug.

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the real origin once the domain is live. It feeds
canonical URLs, `sitemap.xml`, `robots.txt` and link previews; everything falls
back to `https://example.com` without it.
