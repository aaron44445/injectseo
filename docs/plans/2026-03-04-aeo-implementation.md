# AEO Service Package Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add branded "AI Visibility" AEO callout blocks to Growth and Enterprise pricing tier cards.

**Architecture:** Single-file change to `src/app/(public)/pricing/page.tsx`. Extend the `tiers` data array with optional `aeoLabel` and `aeoFeatures` fields on Growth and Enterprise. Update the `TierCard` component to render a visually distinct AEO section when those fields exist.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion (existing)

---

### Task 1: Update tiers data array with AEO fields

**Files:**
- Modify: `src/app/(public)/pricing/page.tsx:7-53`

**Step 1: Add `aeoLabel` and `aeoFeatures` to Growth tier, update description**

In the `tiers` array, update the Growth object (index 1). Change `description` and add two new fields:

```typescript
{
    name: "Growth",
    tag: "Most Popular",
    description: "Dominate your local market with aggressive content, full-spectrum SEO, and AI search visibility.",
    features: [
      "Everything in Foundation",
      "Advanced content strategy (4+ posts/mo)",
      "Competitor analysis & tracking",
      "Reputation management",
      "Service page optimization",
      "Bi-weekly strategy calls",
      "Google Ads consultation",
    ],
    aeoLabel: "AI Visibility",
    aeoFeatures: [
      "FAQ schema markup on all service pages",
      "Content restructured for AI citation",
      "AI search monitoring (quarterly)",
      "1 AI-optimized FAQ page/month",
    ],
    bestFor: "Established med spas looking to outrank competitors and scale revenue.",
    highlighted: true,
  },
```

**Step 2: Add `aeoLabel` and `aeoFeatures` to Enterprise tier**

Update the Enterprise object (index 2). Description stays the same, add two new fields:

```typescript
{
    name: "Enterprise",
    tag: "Multi-Location",
    description: "Full-scale growth engine for multi-location practices with aggressive targets.",
    features: [
      "Everything in Growth",
      "Multi-location SEO management",
      "Paid ads management bolt-on",
      "Landing page creation",
      "Advanced analytics dashboard",
      "Dedicated account manager",
      "Weekly strategy calls",
    ],
    aeoLabel: "AI Visibility Pro",
    aeoFeatures: [
      "Everything in Growth AI Visibility",
      "Entity & knowledge graph optimization",
      "Competitor AI visibility tracking",
      "Monthly AI citation reports",
      "Proactive AI gap content creation",
      "Advanced schema (MedicalBusiness, Physician)",
    ],
    bestFor: "Multi-location practices or med spas targeting rapid, aggressive growth.",
  },
```

**Step 3: Commit**

```bash
git add src/app/(public)/pricing/page.tsx
git commit -m "feat: add AEO data to Growth and Enterprise pricing tiers"
```

---

### Task 2: Update TierCard component to render AEO callout block

**Files:**
- Modify: `src/app/(public)/pricing/page.tsx:55-150`

**Step 1: Add AEO section inside the `inner` JSX, after the features `<ul>` (line 123) and before the "Best for" div (line 127)**

Insert this block between the closing `</ul>` and the `{/* Best for */}` comment:

```tsx
      {/* AEO Callout */}
      {tier.aeoFeatures && (
        <div className="mt-6">
          {/* AEO Divider */}
          <div className="w-full h-px bg-stone-300/40 mb-4" />

          {/* AEO Header */}
          <div className="flex items-center gap-2 mb-3">
            <svg
              className={`w-4 h-4 shrink-0 ${
                tier.highlighted ? "text-lume" : "text-teal-clinical"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span
              className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                tier.highlighted ? "text-lume" : "text-teal-clinical"
              }`}
            >
              {tier.aeoLabel}
            </span>
          </div>

          {/* AEO Features */}
          <ul className="space-y-2">
            {tier.aeoFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <svg
                  className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                    tier.highlighted ? "text-lume/60" : "text-teal-clinical/60"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-mono text-xs text-stone-500">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
```

**Key design decisions in this code:**
- Lightning bolt icon (`M13 10V3L4 14h7v7l9-11h-7z`) — techy, clean, not cheesy
- Header uses `lume` blue on Growth (highlighted), `teal-clinical` on Enterprise — matches the existing color logic
- AEO bullets use slightly smaller text (`text-xs` vs `text-sm`) and slightly smaller checkmarks (`w-3.5 h-3.5` vs `w-4 h-4`) to create visual hierarchy — the AEO section feels like a bonus callout, not the main feature list
- Checkmark opacity uses `/60` to further differentiate from main features
- Divider matches the existing `bg-stone-300/40` pattern already used in the cards

**Step 2: Verify the build compiles**

Run: `npx next build` or `npx next dev` and check for TypeScript errors.

TypeScript note: The `tiers` array uses `as const`-style inference via `(typeof tiers)[number]`. Since Foundation doesn't have `aeoFeatures` or `aeoLabel`, TypeScript will type the union correctly — `aeoFeatures` will be `string[] | undefined` and `aeoLabel` will be `string | undefined`. The `tier.aeoFeatures &&` guard handles this.

**Step 3: Commit**

```bash
git add src/app/(public)/pricing/page.tsx
git commit -m "feat: render AEO callout block in Growth and Enterprise tier cards"
```

---

### Task 3: Visual verification

**Step 1: Run dev server and check pricing page**

Run: `npx next dev`
Navigate to: `http://localhost:3000/pricing`

**Verify:**
- Foundation card: NO AEO section visible
- Growth card: Divider + "AI Visibility" header with blue lightning bolt + 4 AEO bullets
- Enterprise card: Divider + "AI Visibility Pro" header with teal lightning bolt + 6 AEO bullets
- Growth description reads: "...full-spectrum SEO, and AI search visibility."
- Cards still align vertically (all 3 same height due to `flex-1` on features list)
- AEO section sits between the main features and the "Best for" footer
- Mobile responsive (single column on small screens)

**Step 2: Final commit if any tweaks needed**

```bash
git add src/app/(public)/pricing/page.tsx
git commit -m "fix: polish AEO callout styling"
```
