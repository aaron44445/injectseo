"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BorderBeamCard } from "@/components/border-beam";

const tiers = [
  {
    name: "Foundation",
    tag: "Single Location",
    description: "Get found locally and start converting organic traffic into booked appointments.",
    features: [
      "Full technical SEO audit",
      "Google Business Profile optimization",
      "Local keyword strategy",
      "On-page optimization",
      "Monthly content (2 blog posts)",
      "Monthly performance report",
    ],
    bestFor: "New or single-location med spas ready to build organic presence.",
  },
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
];

function TierCard({
  tier,
  index,
}: {
  tier: (typeof tiers)[number];
  index: number;
}) {
  const inner = (
    <div className="p-6 md:p-8 h-full flex flex-col">
      {/* Tag */}
      <span
        className={`inline-block self-start font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border mb-4 ${
          tier.highlighted
            ? "text-lume border-blue-200 bg-blue-100/60"
            : "text-stone-500 border-stone-300 bg-stone-300/40"
        }`}
      >
        {tier.tag}
      </span>

      {/* Name */}
      <h3 className="font-heading text-2xl font-bold text-stone-900">
        {tier.name}
      </h3>

      {/* Description */}
      <p className="font-mono text-sm text-stone-500 mt-2 leading-relaxed">
        {tier.description}
      </p>

      {/* CTA replacing price */}
      <div className="mt-6 mb-6">
        <Link
          href="/book"
          className={`inline-flex items-center justify-center w-full gap-2 px-6 py-3 text-sm font-mono font-semibold rounded-lg transition-all ${
            tier.highlighted
              ? "text-white bg-lume hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
              : "text-stone-600 border border-stone-300 hover:border-stone-400 hover:bg-stone-300/40"
          }`}
        >
          Book a Strategy Call
        </Link>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-stone-300/40 mb-6" />

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg
              className={`w-4 h-4 mt-0.5 shrink-0 ${
                tier.highlighted ? "text-lume" : "text-teal-clinical/60"
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
            <span className="font-mono text-sm text-stone-600">{feature}</span>
          </li>
        ))}
      </ul>

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

      {/* Best for */}
      <div className="mt-6 pt-4 border-t border-stone-100">
        <p className="font-mono text-xs text-stone-400">
          <span className="text-stone-500">Best for:</span> {tier.bestFor}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
    >
      {tier.highlighted ? (
        <BorderBeamCard className="h-full">{inner}</BorderBeamCard>
      ) : (
        <div className="h-full rounded-xl border border-stone-300/60 bg-stone-200 overflow-hidden shadow-[0_2px_15px_rgba(37,99,235,0.04)]">
          {inner}
        </div>
      )}
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            provider: { "@id": "https://injectseo.com/#organization" },
            name: "Med Spa SEO Services",
            description:
              "Custom SEO growth plans for med spas and aesthetic practices. Technical audits, content marketing, local SEO, and AI visibility optimization.",
            serviceType: "Search Engine Optimization",
            areaServed: { "@type": "Country", name: "United States" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "SEO Growth Plans",
              itemListElement: [
                {
                  "@type": "Offer",
                  name: "Foundation",
                  description:
                    "Technical SEO audit, local optimization, and 2 monthly blog posts for single-location med spas.",
                },
                {
                  "@type": "Offer",
                  name: "Growth",
                  description:
                    "Advanced content strategy with 4+ posts/month, competitor tracking, AI visibility, and bi-weekly strategy calls.",
                },
                {
                  "@type": "Offer",
                  name: "Enterprise",
                  description:
                    "Multi-location SEO management with dedicated account manager, paid ads, and advanced AI visibility optimization.",
                },
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://injectseo.com" },
              { "@type": "ListItem", position: 2, name: "Pricing" },
            ],
          }),
        }}
      />
      {/* Gradient mesh background — radial-gradient instead of blur() */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(96,165,250,0.06), transparent 70%)" }} />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(45,212,191,0.04), transparent 70%)" }} />
        <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] rounded-full" style={{ background: "radial-gradient(circle, rgba(110,231,183,0.04), transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <span className="font-mono text-xs text-lume/60 uppercase tracking-widest">
            Pricing
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-stone-900 mt-2">
            Choose Your Growth Plan
          </h1>
          <p className="font-mono text-sm text-stone-500 mt-4 max-w-lg mx-auto">
            Every plan is tailored to your practice. Book a call and we&apos;ll
            build the right strategy for your goals and budget.
          </p>
        </motion.div>

        {/* Setup fee note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-mono text-xs text-emerald-600/70 border border-emerald-300/60 rounded-full px-4 py-1.5 bg-emerald-100/40">
            All plans include a one-time setup &amp; audit onboarding
          </span>
        </motion.div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center font-mono text-xs text-stone-400 mt-10"
        >
          No long-term contracts. Cancel anytime. You stay because it works.
        </motion.p>
      </div>
    </section>
  );
}
