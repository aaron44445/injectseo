# InjectSEO Critical SEO Fixes — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all critical SEO issues identified in the audit (score 52 → 80+): add JSON-LD structured data, canonical tags, llms.txt, security headers, AI crawler management, and content improvements.

**Architecture:** All changes are in the existing Next.js 16 app at `C:/projects/medseo`. JSON-LD goes in page-level metadata exports or dedicated `<script>` tags. Canonical tags use Next.js `alternates.canonical` metadata API. Security headers go in `next.config.ts`. llms.txt is a static file in `/public/`. No new dependencies needed.

**Tech Stack:** Next.js 16.1.6, React 19, TypeScript, TailwindCSS v4

---

### Task 1: Add Canonical Tags to All Public Pages

**Files:**
- Modify: `src/app/(public)/layout.tsx` — add `alternates.canonical` to metadata
- Modify: `src/app/(public)/about/layout.tsx` — add page-specific canonical
- Modify: `src/app/(public)/pricing/layout.tsx` — add page-specific canonical
- Modify: `src/app/(public)/book/layout.tsx` — add page-specific canonical

**Step 1: Add canonical to the public layout metadata**

In `src/app/(public)/layout.tsx`, find the `metadata` export and add `alternates`:

```typescript
export const metadata: Metadata = {
  // ... existing fields ...
  alternates: {
    canonical: "https://injectseo.com",
  },
};
```

**Step 2: Add canonical to about page layout**

In `src/app/(public)/about/layout.tsx`, add or update metadata:

```typescript
export const metadata: Metadata = {
  title: "About | InjectSEO",
  description: "Meet the InjectSEO team. We specialize exclusively in SEO for med spas and aesthetic practices.",
  alternates: {
    canonical: "https://injectseo.com/about",
  },
};
```

**Step 3: Add canonical to pricing page layout**

In `src/app/(public)/pricing/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Pricing | InjectSEO",
  description: "Custom SEO growth plans for med spas. Book a free strategy call to get a plan built for your practice.",
  alternates: {
    canonical: "https://injectseo.com/pricing",
  },
};
```

**Step 4: Add canonical to book page layout**

In `src/app/(public)/book/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Book a Free SEO Audit | InjectSEO",
  description: "Schedule a free 20-minute SEO diagnostic for your med spa. No obligation, just actionable insights.",
  alternates: {
    canonical: "https://injectseo.com/book",
  },
};
```

**Step 5: Verify locally**

Run: `cd C:/projects/medseo && pnpm dev`

Open http://localhost:3000 in browser, view page source, search for `<link rel="canonical"`. Confirm each page has the correct canonical URL.

**Step 6: Commit**

```bash
git add src/app/\(public\)/layout.tsx src/app/\(public\)/about/layout.tsx src/app/\(public\)/pricing/layout.tsx src/app/\(public\)/book/layout.tsx
git commit -m "fix(seo): add canonical tags to all public pages"
```

---

### Task 2: Add JSON-LD Structured Data — Organization + WebSite (Homepage)

**Files:**
- Modify: `src/app/(public)/layout.tsx` — add JSON-LD script to the public layout body

**Step 1: Add Organization and WebSite JSON-LD to the public layout**

In `src/app/(public)/layout.tsx`, inside the returned JSX (before `{children}`), add:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://injectseo.com/#organization",
          "name": "InjectSEO",
          "url": "https://injectseo.com",
          "description": "Precision SEO for aesthetic practices. We help med spas dominate Google with data-driven SEO and content marketing.",
          "foundingDate": "2026",
          "founders": [
            { "@type": "Person", "name": "Aaron McBride", "jobTitle": "Co-founder, Growth Strategy" },
            { "@type": "Person", "name": "Seth", "jobTitle": "Co-founder, SEO & Content" }
          ],
          "areaServed": { "@type": "Country", "name": "United States" },
          "knowsAbout": [
            "Medical Spa SEO",
            "Med Spa Marketing",
            "Answer Engine Optimization",
            "Local SEO",
            "Content Marketing for Aesthetic Practices"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://injectseo.com/#website",
          "name": "InjectSEO",
          "url": "https://injectseo.com",
          "publisher": { "@id": "https://injectseo.com/#organization" }
        }
      ]
    }),
  }}
/>
```

**Step 2: Verify locally**

Run: `cd C:/projects/medseo && pnpm dev`

Open http://localhost:3000, view page source, search for `application/ld+json`. Confirm the JSON-LD block is present and valid JSON. Paste into https://validator.schema.org to validate.

**Step 3: Commit**

```bash
git add src/app/\(public\)/layout.tsx
git commit -m "feat(seo): add Organization + WebSite JSON-LD structured data"
```

---

### Task 3: Add JSON-LD Structured Data — Service Schema (Pricing Page)

**Files:**
- Modify: `src/app/(public)/pricing/page.tsx` — add Service JSON-LD

**Step 1: Add Service JSON-LD to pricing page**

At the top of the pricing page component (inside the return, before visible content), add:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "provider": { "@id": "https://injectseo.com/#organization" },
      "name": "Med Spa SEO Services",
      "description": "Custom SEO growth plans for med spas and aesthetic practices. Technical audits, content marketing, local SEO, and AI visibility optimization.",
      "serviceType": "Search Engine Optimization",
      "areaServed": { "@type": "Country", "name": "United States" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "SEO Growth Plans",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Foundation",
            "description": "Technical SEO audit, local optimization, and 2 monthly blog posts for single-location med spas."
          },
          {
            "@type": "Offer",
            "name": "Growth",
            "description": "Advanced content strategy with 4+ posts/month, competitor tracking, AI visibility, and bi-weekly strategy calls."
          },
          {
            "@type": "Offer",
            "name": "Enterprise",
            "description": "Multi-location SEO management with dedicated account manager, paid ads, and advanced AI visibility optimization."
          }
        ]
      }
    }),
  }}
/>
```

**Step 2: Verify locally**

View source on http://localhost:3000/pricing. Confirm JSON-LD is present and valid.

**Step 3: Commit**

```bash
git add src/app/\(public\)/pricing/page.tsx
git commit -m "feat(seo): add Service JSON-LD to pricing page"
```

---

### Task 4: Add JSON-LD Structured Data — ProfilePage (About Page)

**Files:**
- Modify: `src/app/(public)/about/page.tsx` — add ProfilePage JSON-LD for E-E-A-T

**Step 1: Add ProfilePage JSON-LD to about page**

Inside the about page component return, before visible content, add:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Organization",
        "@id": "https://injectseo.com/#organization",
        "name": "InjectSEO",
        "member": [
          {
            "@type": "Person",
            "name": "Aaron McBride",
            "jobTitle": "Co-founder, Growth Strategy",
            "worksFor": { "@id": "https://injectseo.com/#organization" }
          },
          {
            "@type": "Person",
            "name": "Seth",
            "jobTitle": "Co-founder, SEO & Content",
            "worksFor": { "@id": "https://injectseo.com/#organization" }
          }
        ]
      }
    }),
  }}
/>
```

**Step 2: Verify locally**

View source on http://localhost:3000/about. Confirm JSON-LD is valid.

**Step 3: Commit**

```bash
git add src/app/\(public\)/about/page.tsx
git commit -m "feat(seo): add ProfilePage JSON-LD to about page for E-E-A-T"
```

---

### Task 5: Create llms.txt for AI Search Readiness

**Files:**
- Create: `public/llms.txt`
- Create: `public/llms-full.txt`

**Step 1: Create llms.txt**

Create `public/llms.txt`:

```
# InjectSEO
> Precision SEO agency specializing exclusively in med spas and aesthetic practices.

## About
InjectSEO helps medical spas dominate Google and AI search through data-driven SEO and content marketing. We focus exclusively on the aesthetics industry.

## Services
- Technical SEO Audits
- Google Business Profile Optimization
- Content Marketing (Blog Strategy, Service Pages)
- Local SEO for Med Spas
- Answer Engine Optimization (AEO)
- AI Search Visibility (ChatGPT, Perplexity, Gemini)

## Pages
- [Home](https://injectseo.com): Agency overview, case studies, and methodology
- [Pricing](https://injectseo.com/pricing): Foundation, Growth, and Enterprise plans
- [About](https://injectseo.com/about): Team bios and mission
- [Book](https://injectseo.com/book): Schedule a free 20-minute SEO audit

## Contact
- Website: https://injectseo.com
- Book a call: https://injectseo.com/book
```

**Step 2: Create llms-full.txt**

Create `public/llms-full.txt` with expanded detail:

```
# InjectSEO — Full Context

> Precision SEO agency specializing exclusively in med spas and aesthetic practices.

## Company Overview
InjectSEO is an SEO agency that works exclusively with medical spas, dermatology clinics, and aesthetic practices. Founded by Aaron McBride (Growth Strategy) and Seth (SEO & Content). Based in the United States, serving clients nationwide.

## Core Services

### Technical SEO
Full website audits, crawlability optimization, Core Web Vitals improvement, mobile-first indexing compliance, and structured data implementation.

### Content Marketing
Blog strategy (2-4+ posts/month), service page optimization, case study creation, and keyword-driven content planning for med spa topics.

### Local SEO
Google Business Profile optimization, local keyword strategy, citation building, and review management for med spas.

### Answer Engine Optimization (AEO)
Optimization for AI search engines including ChatGPT, Google AI Overviews, Perplexity, and Gemini. Content structuring for Featured Snippets and People Also Ask boxes.

## Pricing Tiers
1. **Foundation** — For single-location practices. Includes technical audit, GBP optimization, local keywords, 2 monthly blog posts.
2. **Growth** — Most popular. Adds 4+ posts/month, competitor tracking, AI visibility, bi-weekly calls, Google Ads consultation.
3. **Enterprise** — For multi-location practices. Adds dedicated account manager, paid ads management, advanced analytics, weekly calls.

All plans are month-to-month with no long-term contracts.

## Case Studies
- Glow Aesthetics: +320% organic traffic
- Pure Skin MedSpa: Top 3 Google rankings for local keywords
- Rejuvenate Clinic: Significant increase in organic patient bookings

## Pages
- [Home](https://injectseo.com): Agency overview, case studies, and methodology
- [Pricing](https://injectseo.com/pricing): Foundation, Growth, and Enterprise plans
- [About](https://injectseo.com/about): Team bios and company mission
- [Book](https://injectseo.com/book): Schedule a free 20-minute SEO diagnostic
```

**Step 3: Verify**

Run: `curl -s https://localhost:3000/llms.txt | head -5`

Confirm the file is served as plain text.

**Step 4: Update sitemap.ts to include llms.txt reference**

No change needed — llms.txt is a standalone file, not a sitemap entry.

**Step 5: Commit**

```bash
git add public/llms.txt public/llms-full.txt
git commit -m "feat(seo): add llms.txt and llms-full.txt for AI search readiness"
```

---

### Task 6: Add Security Headers to next.config.ts

**Files:**
- Modify: `next.config.ts`

**Step 1: Read current next.config.ts**

Current content:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
```

**Step 2: Add security headers**

Replace with:

```typescript
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

Note: CSP is omitted intentionally — Next.js inline scripts and Framer Motion require `unsafe-inline`/`unsafe-eval`, making a strict CSP impractical without a nonce setup. The 4 headers above cover the main gaps.

**Step 3: Verify locally**

Run: `cd C:/projects/medseo && pnpm dev`

Then check headers:
```bash
curl -sI http://localhost:3000 | grep -i "x-frame\|x-content\|referrer\|permissions"
```

Expected output should include all 4 headers.

**Step 4: Commit**

```bash
git add next.config.ts
git commit -m "fix(security): add X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy headers"
```

---

### Task 7: Manage AI Crawlers in robots.ts

**Files:**
- Modify: `src/app/robots.ts`
- Delete: `robots.txt` (static file in project root — conflicts with robots.ts route)

**Step 1: Delete conflicting static robots.txt**

The project has both `robots.txt` (static) and `src/app/robots.ts` (dynamic route). The static file may shadow the route. Delete it:

```bash
rm robots.txt
```

**Step 2: Update robots.ts with AI crawler rules**

Replace `src/app/robots.ts` with:

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: "https://injectseo.com/sitemap.xml",
  };
}
```

**Step 3: Verify locally**

Run: `curl -s http://localhost:3000/robots.txt`

Confirm output includes explicit rules for GPTBot, ClaudeBot, PerplexityBot, etc.

**Step 4: Commit**

```bash
git rm robots.txt
git add src/app/robots.ts
git commit -m "feat(seo): explicitly manage AI crawlers in robots.txt, remove conflicting static file"
```

---

### Task 8: Add BreadcrumbList JSON-LD to Subpages

**Files:**
- Modify: `src/app/(public)/about/page.tsx`
- Modify: `src/app/(public)/pricing/page.tsx`
- Modify: `src/app/(public)/book/page.tsx`

**Step 1: Add BreadcrumbList to about page**

In `src/app/(public)/about/page.tsx`, add a second JSON-LD script (alongside the ProfilePage one from Task 4):

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://injectseo.com" },
        { "@type": "ListItem", "position": 2, "name": "About" }
      ]
    }),
  }}
/>
```

**Step 2: Add BreadcrumbList to pricing page**

In `src/app/(public)/pricing/page.tsx` (alongside the Service JSON-LD from Task 3):

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://injectseo.com" },
        { "@type": "ListItem", "position": 2, "name": "Pricing" }
      ]
    }),
  }}
/>
```

**Step 3: Add BreadcrumbList to book page**

In `src/app/(public)/book/page.tsx`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://injectseo.com" },
        { "@type": "ListItem", "position": 2, "name": "Book a Free Audit" }
      ]
    }),
  }}
/>
```

**Step 4: Verify all subpages have BreadcrumbList in source**

View source on /about, /pricing, /book — confirm BreadcrumbList JSON-LD present.

**Step 5: Commit**

```bash
git add src/app/\(public\)/about/page.tsx src/app/\(public\)/pricing/page.tsx src/app/\(public\)/book/page.tsx
git commit -m "feat(seo): add BreadcrumbList JSON-LD to all subpages"
```

---

### Task 9: Deploy and Verify

**Step 1: Build to check for errors**

```bash
cd C:/projects/medseo && pnpm build
```

Expected: Build succeeds with no errors.

**Step 2: Deploy to Vercel**

```bash
vercel --prod --yes
```

**Step 3: Run SEO verification scripts against production**

```bash
python "C:\Users\aaron\.claude\skills\seo\scripts\robots_checker.py" "https://injectseo.com" --json
python "C:\Users\aaron\.claude\skills\seo\scripts\llms_txt_checker.py" "https://injectseo.com" --json
python "C:\Users\aaron\.claude\skills\seo\scripts\security_headers.py" "https://injectseo.com" --json
python "C:\Users\aaron\.claude\skills\seo\scripts\social_meta.py" "https://injectseo.com" --json
```

Confirm:
- robots.txt shows AI crawler rules
- llms.txt returns 200 with content
- Security headers score improves from 45 to 70+
- Social meta still passes

**Step 4: Validate structured data**

Open https://validator.schema.org and test:
- https://injectseo.com — should show Organization + WebSite
- https://injectseo.com/pricing — should show Service + BreadcrumbList
- https://injectseo.com/about — should show ProfilePage + BreadcrumbList

**Step 5: Final commit**

```bash
git add -A
git commit -m "chore: verify SEO fixes deployed successfully"
```

---

## Out of Scope (Future Tasks)

These items from the audit are content/strategy work, not code changes:

- **Expand homepage word count to 800+** — requires copywriting, not code
- **Expand about page to 600+** — requires copywriting
- **Launch blog infrastructure** — separate plan needed (Next.js MDX or CMS integration)
- **Create full case study pages** — requires content + design
- **Add external authority links** — editorial decision
- **Improve readability score** — content rewriting
