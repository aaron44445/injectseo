# InjectSEO -- Complete Project Context

## What InjectSEO Is

InjectSEO is a niche SEO agency that exclusively serves med spas (medical spas / aesthetic practices). It's a two-part application: a public marketing site to attract prospects, and an internal AI-powered dashboard for the team to find leads, generate outreach, run audits, create proposals, and manage clients.

- **Domain:** injectseo.com
- **Tagline:** "Precision SEO for Aesthetic Practices"
- **Founders:** Aaron McBride (Growth Strategy) and Seth (SEO & Content)
- **Business Model:** Monthly retainer SEO service, three tiers (Foundation, Growth, Enterprise), no public prices -- prospects book a strategy call via Calendly

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router, React 19) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + shadcn/ui + tw-animate-css |
| Fonts | Space Grotesk (headings), JetBrains Mono (body/mono) |
| Animation | Framer Motion + CSS keyframes + IntersectionObserver |
| AI | Anthropic Claude SDK (claude-sonnet-4-5-20250929) |
| Database | PostgreSQL via Supabase, accessed through Prisma 7.4.2 |
| Auth | JWT (HS256) using jose library, cookie-based |
| PDF | @react-pdf/renderer for branded PDFs |
| External APIs | Google Maps Places API, Google PageSpeed Insights API, Calendly (embedded) |
| Package Manager | pnpm |
| Deployment | Vercel |

---

## Design System

- **Background:** #0A0A0B (near-black)
- **Primary Accent (lume):** #00FF8F (bright green) -- CTAs, highlights, borders
- **Secondary Accent (teal-clinical):** #2DD4BF -- recommendations, clinical feel
- **Typography:** Space Grotesk for headings, JetBrains Mono for body/data
- **UI Components:** Full shadcn/ui set (accordion, badge, button, card, dialog, input, label, select, separator, sheet, sonner, table, tabs, textarea)
- **Effects:** Rotating conic-gradient border beam, cursor follower (desktop only), dotted grid background, scroll-triggered fade/slide animations

---

## Environment Variables

```
ANTHROPIC_API_KEY        -- Claude AI API key
DATABASE_URL             -- Supabase PostgreSQL connection (pooled)
DIRECT_URL               -- Supabase direct connection (for migrations)
GOOGLE_MAPS_API_KEY      -- Google Places + PageSpeed API key
DASHBOARD_PASSWORD       -- Single password for dashboard auth
NEXT_PUBLIC_CALENDLY_URL -- Calendly booking widget URL
NEXT_PUBLIC_SITE_URL     -- Site URL (https://injectseo.com)
```

---

## Database Schema (Prisma/PostgreSQL)

### Lead (core entity)
- id (cuid), businessName, website, instagram, phone, email, address, city, state
- googleRating (Float), reviewCount (Int), seoScore (Int)
- priority: HIGH | MEDIUM | LOW
- status: NEW | DMED | REPLIED | CALL_BOOKED | PROPOSAL_SENT | CLOSED | LOST
- notes (text), followUpDate, lastContactDate
- Relations: AuditReport[], Proposal[], DmMessage[]

### AuditReport
- id, leadId (FK), url, findings (JSON), summary, createdAt

### Proposal
- id, leadId (FK), clientName, services (String[]), monthlyPrice (Float), callNotes, content (JSON), createdAt

### DmMessage
- id, leadId (FK), type, content, createdAt

---

## Architecture Overview

```
src/
  app/
    layout.tsx              -- Root layout (dark theme, fonts)
    globals.css             -- Tailwind v4 config, animations, custom properties
    (public)/               -- Marketing site (no auth)
      layout.tsx            -- Nav, Footer, FloatingCTA, DottedGrid, CursorFollower
      page.tsx              -- Homepage (Hero, CaseStudies, Process, FAQ, CTA)
      pricing/page.tsx      -- Three-tier pricing (no prices, book-a-call)
      about/page.tsx        -- Team bios, why med spas
      book/page.tsx         -- Calendly embed for booking calls
      opengraph-image.tsx   -- Dynamic OG image generation (Edge runtime)
    dashboard/              -- Internal tool (JWT auth required)
      layout.tsx            -- Sidebar + Header layout
      login/page.tsx        -- Password login
      page.tsx              -- Dashboard home (stats overview)
      lead-finder/page.tsx  -- Find med spas by city via Google Places
      dm-generator/page.tsx -- AI-generated cold DMs from website analysis
      audit/page.tsx        -- Full SEO audit with PDF export
      leads/page.tsx        -- Kanban CRM pipeline
      leads/[id]/page.tsx   -- Individual lead detail + notes
      proposals/page.tsx    -- AI proposal generator with PDF export
      contracts/page.tsx    -- Service agreement PDF generator
      onboarding/page.tsx   -- Client intake form
    api/
      auth/route.ts         -- POST: password login, sets JWT cookie
      auth/logout/route.ts  -- POST: clears auth cookie
      analyze-site/route.ts -- POST: HTML analysis of any URL
      audit/route.ts        -- POST: full SEO audit (site + PageSpeed + AI)
      audit/pdf/route.tsx   -- POST: branded audit PDF generation
      find-leads/route.ts   -- POST: Google Places search + AI scoring
      generate-dm/route.ts  -- POST: site analysis + AI DM generation
      leads/route.ts        -- GET/POST: list/create leads
      leads/[id]/route.ts   -- GET/PATCH/DELETE: individual lead CRUD
      proposal/route.ts     -- POST: AI proposal generation
      proposal/pdf/route.ts -- POST: branded proposal PDF
      contract/route.tsx    -- POST: service agreement PDF
  components/
    nav.tsx                 -- Fixed nav with mobile drawer menu
    footer.tsx              -- Site footer
    floating-cta.tsx        -- Mobile-only sticky bottom CTA
    border-beam.tsx         -- Rotating gradient border card effect
    cursor-follower.tsx     -- Custom cursor (desktop only)
    dotted-grid.tsx         -- Background dot pattern
    sections/
      hero.tsx              -- Homepage hero with animated dashboard mockup
      case-studies.tsx       -- Horizontal scrolling case study cards
      process.tsx           -- 3-step method (Audit, Injection, Result)
      faq.tsx               -- Accordion FAQ section
      cta.tsx               -- Final CTA with border beam card
    dashboard/
      sidebar.tsx           -- Desktop sidebar navigation
      header.tsx            -- Dashboard header with page title
      mobile-sidebar.tsx    -- Mobile sheet sidebar
    ui/                     -- shadcn/ui components
  lib/
    db.ts                   -- Prisma singleton with PrismaPg adapter
    utils.ts                -- cn() helper (clsx + tailwind-merge)
    fonts.ts                -- Google Fonts setup
    site-analyzer.ts        -- HTML fetcher/parser (title, meta, headings, images, services, issues)
    pagespeed.ts            -- Google PageSpeed Insights API wrapper
    audit-analyzer.ts       -- Orchestrates site analysis + PageSpeed + Claude AI
    google-places.ts        -- Google Places API for lead discovery
    audit-pdf.tsx           -- Branded audit PDF template (3 pages)
    proposal-pdf.tsx        -- Branded proposal PDF template (4 pages)
    contract-pdf.tsx        -- Service agreement PDF template
  hooks/
    use-in-view.ts          -- IntersectionObserver hook for scroll animations
  middleware.ts             -- JWT auth guard for /dashboard/* routes
```

---

## Feature Details

### Public Marketing Site

**Homepage** renders five sections:
1. **Hero** -- "Growth is a Science." headline, "Precision SEO for Aesthetic Practices" subtext, two CTAs (Book Free Audit + See Our Method), social proof bar (12+ Med Spas Served, +320% Avg Traffic Growth), animated SEO dashboard mockup on right side (ranking counter #47 to #1, traffic chart, metric cards)
2. **Case Studies** -- Three horizontally-scrolling cards (desktop: scroll-driven animation, mobile: swipeable). Glow Aesthetics Dallas (+340%, #1 botox, +$47K), Pure Skin Miami (+280%, #1 laser, +$38K), Rejuvenate Austin (+420%, #1 med spa, +$62K)
3. **Process ("The Method")** -- Three steps with interactive visuals: The Audit (terminal typing animation), The Injection (animated content cards), The Result (revenue counter $47,500)
4. **FAQ** -- 6 questions covering: differentiation, timeline (60-90 days), retainer contents, med-spa-only focus, satisfaction guarantee, reporting
5. **CTA** -- "Ready to Dominate Google?" with border beam card and book audit button

**Pricing** -- Three tiers (Foundation/Growth/Enterprise), all point to book-a-call, no prices shown. Features escalate from basic local SEO to multi-location management.

**About** -- Team bios, "Why Med Spas?" market gap explanation

**Book** -- Calendly widget embed for 30-minute strategy calls

### Internal Dashboard

**Lead Finder** -- Search any US city + state, finds med spas via Google Places API (up to 60 results), AI-scores each by SEO opportunity (Hot/Medium/Low priority), displays in table with quick action buttons

**DM Generator** -- Input a med spa website URL, system analyzes the site (business name, services, images, SEO issues), then Claude generates 3 personalized cold DM variants plus a 3-message follow-up sequence (Day 3, Day 7, Day 14). Copy-to-clipboard functionality, character counts shown.

**SEO Audit** -- Input any URL. System runs HTML analysis + Google PageSpeed Insights in parallel, then Claude AI produces: overall health score (0-100), performance/SEO/accessibility scores, Core Web Vitals (FCP, LCP, CLS), executive summary, 5-7 prioritized issues with recommendations and business impact. Export as branded PDF (3 pages: cover, results, issues).

**Lead Pipeline** -- Kanban CRM with 7 columns: New > DMed > Replied > Call Booked > Proposal Sent > Closed > Lost. Add leads manually, click to open detail sheet with contact info, status controls, notes, follow-up date, quick actions.

**Lead Detail** -- Full page per lead with auto-saving notes (debounced), activity timeline, contact card, quick action buttons, metadata (rating, SEO score, dates).

**Proposal Generator** -- Select client name, services (Local SEO, Content Marketing, GBP, On-Page, Technical SEO, Link Building), monthly price, paste discovery call notes. Claude generates: executive summary, scope of work with deliverables per service, 90-day timeline (Foundation > Acceleration > Domination), investment details, "Why InjectSEO" pitch. Export as branded PDF (4 pages).

**Contract Generator** -- Input client name, monthly retainer, scope of services (editable list). Generates branded service agreement PDF with: parties clause, scope, compensation terms ($X/month due 1st via Stripe), 3-month minimum term, 30-day written cancellation, confidentiality, signature lines for both parties.

**Client Onboarding** -- Intake form capturing: business name, full address, phone, website, GBP email, top 5 target keywords, competitors, communication preference. Generates structured plain-text "Client Brief" for internal use.

---

## AI Usage (Claude)

All AI calls use `claude-sonnet-4-5-20250929` via the Anthropic SDK:

1. **Lead Scoring** -- Analyzes med spa website data + Google ratings in batches of 5, returns priority (HIGH/MEDIUM/LOW) with reasoning
2. **DM Generation** -- Takes site analysis, generates 3 DM variants (casual, professional, value-first) + follow-up sequence. DMs reference specific services and SEO issues found on the prospect's site.
3. **Audit Analysis** -- Takes site HTML analysis + PageSpeed data, produces overall score, executive summary, and 5-7 prioritized issues with detailed recommendations and business impact
4. **Proposal Generation** -- Takes selected services, price, and call notes, generates structured proposal with executive summary, service-specific deliverables, 90-day timeline, and sales pitch

---

## Authentication

- Single shared password (DASHBOARD_PASSWORD env var)
- Login at /dashboard/login posts to /api/auth
- JWT signed with HS256, stored in httpOnly cookie (injectseo-auth), 7-day expiry
- Middleware intercepts all /dashboard/* routes (except login), verifies JWT, redirects to login if invalid
- Logout clears cookie via /api/auth/logout

---

## Integrations

| Service | Usage | Env Var |
|---------|-------|---------|
| Anthropic Claude | AI for scoring, DMs, audits, proposals | ANTHROPIC_API_KEY |
| Google Places API | Lead discovery (med spa search by city) | GOOGLE_MAPS_API_KEY |
| Google PageSpeed | Site performance/SEO/accessibility scores | GOOGLE_MAPS_API_KEY |
| Calendly | Booking widget on /book page | NEXT_PUBLIC_CALENDLY_URL |
| Supabase PostgreSQL | Lead, audit, proposal, DM data storage | DATABASE_URL, DIRECT_URL |
| Stripe | Referenced in contracts (not code-integrated) | -- |

---

## Key URLs

- **Production:** https://injectseo.com
- **Dashboard:** https://injectseo.com/dashboard
- **Book a Call:** https://injectseo.com/book
- **Pricing:** https://injectseo.com/pricing
- **GitHub:** https://github.com/aaron44445/projects (monorepo, medseo subdirectory)

---

## Pricing Tiers

### Foundation (Single Location)
- Full technical SEO audit
- Google Business Profile optimization
- Local keyword strategy
- On-page optimization
- Monthly content (2 blog posts)
- Monthly performance report
- *Best for: New or single-location med spas ready to build organic presence*

### Growth (Most Popular)
- Everything in Foundation
- Advanced content strategy (4+ posts/mo)
- Competitor analysis & tracking
- Reputation management
- Service page optimization
- Bi-weekly strategy calls
- Google Ads consultation
- *Best for: Established med spas looking to outrank competitors and scale revenue*

### Enterprise (Multi-Location)
- Everything in Growth
- Multi-location SEO management
- Paid ads management bolt-on
- Landing page creation
- Advanced analytics dashboard
- Dedicated account manager
- Weekly strategy calls
- *Best for: Multi-location practices or med spas targeting rapid, aggressive growth*

---

## Case Study Results (Marketing Claims)

| Client | Location | Traffic Growth | Top Ranking | Revenue Impact |
|--------|----------|---------------|-------------|----------------|
| Glow Aesthetics | Dallas, TX | +340% | #1 "botox near me dallas" | +$47K/mo |
| Pure Skin MedSpa | Miami, FL | +280% | #1 "laser hair removal miami" | +$38K/mo |
| Rejuvenate Clinic | Austin, TX | +420% | #1 "med spa austin" | +$62K/mo |

---

## Site Analysis Capabilities

The site analyzer detects these med spa services by keyword matching:
botox, filler, juvederm, laser, facial, coolsculpting, microneedling, chemical peel, dermaplaning, hydrafacial, prp, iv therapy, weight loss, semaglutide, lip augmentation, skin rejuvenation, body contouring, hair removal

Issues detected: missing title, missing/long meta description, no H1/H2 headings, poor image alt text coverage, no blog, no HTTPS, few services mentioned on site.
