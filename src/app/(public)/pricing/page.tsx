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
    description: "Dominate your local market with aggressive content and full-spectrum SEO.",
    features: [
      "Everything in Foundation",
      "Advanced content strategy (4+ posts/mo)",
      "Competitor analysis & tracking",
      "Reputation management",
      "Service page optimization",
      "Bi-weekly strategy calls",
      "Google Ads consultation",
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
            ? "text-lume border-blue-200 bg-blue-50"
            : "text-slate-400 border-slate-200 bg-slate-50"
        }`}
      >
        {tier.tag}
      </span>

      {/* Name */}
      <h3 className="font-heading text-2xl font-bold text-slate-900">
        {tier.name}
      </h3>

      {/* Description */}
      <p className="font-mono text-sm text-slate-500 mt-2 leading-relaxed">
        {tier.description}
      </p>

      {/* CTA replacing price */}
      <div className="mt-6 mb-6">
        <Link
          href="/book"
          className={`inline-flex items-center justify-center w-full gap-2 px-6 py-3 text-sm font-mono font-semibold rounded-lg transition-all ${
            tier.highlighted
              ? "text-white bg-lume hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
              : "text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-white/80"
          }`}
        >
          Book a Strategy Call
        </Link>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-slate-100 mb-6" />

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
            <span className="font-mono text-sm text-slate-600">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Best for */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <p className="font-mono text-xs text-slate-400">
          <span className="text-slate-500">Best for:</span> {tier.bestFor}
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
        <div className="h-full rounded-xl border border-slate-200/60 bg-white/95 overflow-hidden shadow-[0_2px_15px_rgba(37,99,235,0.04)]">
          {inner}
        </div>
      )}
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 px-6">
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
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-slate-900 mt-2">
            Choose Your Growth Plan
          </h1>
          <p className="font-mono text-sm text-slate-500 mt-4 max-w-lg mx-auto">
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
          <span className="inline-block font-mono text-xs text-emerald-600/70 border border-emerald-200 rounded-full px-4 py-1.5 bg-emerald-50">
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
          className="text-center font-mono text-xs text-slate-400 mt-10"
        >
          No long-term contracts. Cancel anytime. You stay because it works.
        </motion.p>
      </div>
    </section>
  );
}
