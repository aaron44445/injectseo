# AEO (Answer Engine Optimization) Service Package Design

**Date:** 2026-03-04
**Status:** Approved

## Overview

Add Answer Engine Optimization to the InjectSEO service offering, starting at the Growth tier. AEO covers full-spectrum AI search visibility across ChatGPT, Perplexity, Gemini, and Google AI Overviews. Foundation tier remains pure traditional SEO.

## Approach

Branded "AI Visibility" callout block inside Growth and Enterprise tier cards on the pricing page. Visually distinct from regular feature bullets — section header with icon, grouped AEO-specific deliverables underneath.

## Deliverables by Tier

### Foundation — No AEO

Stays as-is. Pure traditional SEO entry point.

### Growth — "AI Visibility"

- FAQ schema markup on all service pages
- Content restructuring for AI citation (concise answer blocks, bullet formatting, clear definitions)
- AI search monitoring — quarterly report showing appearances in ChatGPT, Perplexity, Gemini, and Google AI Overviews
- 1 AI-optimized FAQ page per month targeting high-volume patient questions

### Enterprise — "AI Visibility Pro"

- Everything in Growth
- Entity optimization (knowledge graph presence, consistent NAP, medical credentials, treatment associations)
- Competitor AI visibility tracking (monthly report vs top 3 local competitors)
- Monthly AI citation reports (3x Growth cadence)
- Proactive gap content — identify treatment questions where competitors get cited and fill those gaps
- Structured data expansion: MedicalBusiness schema, Physician schema, treatment-specific schema

## Visual Treatment (Pricing Page)

### Card Layout Change

Within Growth and Enterprise tier cards, after existing feature bullets:

1. Thin divider line (same style as existing card dividers)
2. Section header: "AI Visibility" (Growth) / "AI Visibility Pro" (Enterprise)
   - Small icon (bolt/sparkle) left of header text
   - Header uses `lume` blue on Growth, `teal-clinical` on Enterprise
   - Slightly bolder than regular feature text
3. AEO feature bullets grouped under header, same checkmark style as existing features

Foundation card has no AEO section — makes the upgrade to Growth obvious.

### Copy Updates

**Growth tier description** updated from:
> "Dominate your local market with aggressive content and full-spectrum SEO."

To:
> "Dominate your local market with aggressive content, full-spectrum SEO, and AI search visibility."

**Enterprise description** — no change needed.

**"Best for" lines** — no changes.

### Scope

Changes limited to pricing page only. No changes to About, Hero, Process, or other pages. AEO can expand to a dedicated service page later once validated with clients.

## Implementation Summary

1. Update the `tiers` data array in `src/app/(public)/pricing/page.tsx`
   - Add `aeoFeatures` array and `aeoLabel` string to Growth and Enterprise tier objects
   - Update Growth description copy
2. Update the `TierCard` component to render the AEO callout block when `aeoFeatures` exists
   - Divider, icon + header, grouped bullet list
3. Style the AEO header distinctly from regular features
