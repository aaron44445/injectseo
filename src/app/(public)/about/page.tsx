"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const team = [
  {
    initials: "AM",
    name: "Aaron McBride",
    role: "Co-founder, Growth Strategy",
  },
  {
    initials: "S",
    name: "Seth",
    role: "Co-founder, SEO & Content",
  },
];

export default function AboutPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Organization",
              "@id": "https://injectseo.com/#organization",
              name: "InjectSEO",
              member: [
                {
                  "@type": "Person",
                  name: "Aaron McBride",
                  jobTitle: "Co-founder, Growth Strategy",
                  worksFor: { "@id": "https://injectseo.com/#organization" },
                },
                {
                  "@type": "Person",
                  name: "Seth",
                  jobTitle: "Co-founder, SEO & Content",
                  worksFor: { "@id": "https://injectseo.com/#organization" },
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
              { "@type": "ListItem", position: 2, name: "About" },
            ],
          }),
        }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-mono text-xs text-lume/60 uppercase tracking-widest">
            About
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-stone-900 mt-2 mb-6">
            We&apos;re Not Another Agency
          </h1>
          <p className="font-mono text-sm md:text-base text-stone-500 leading-relaxed max-w-xl">
            Most agencies try to serve everyone. We chose to master one thing:
            growing med spas through organic search and AI visibility. Every
            strategy, every piece of content, every optimization we build is
            purpose-made for aesthetic practices — on Google and across every
            AI search engine.
          </p>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-20"
        >
          <h2 className="font-heading text-2xl font-bold text-stone-900 mb-8">
            The Team
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-lg border border-stone-300/60 bg-stone-200"
              >
                <div className="w-14 h-14 rounded-full border border-blue-200 bg-blue-100/50 flex items-center justify-center mb-4">
                  <span className="font-heading text-lg font-bold text-lume">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-stone-900">
                  {member.name}
                </h3>
                <p className="font-mono text-xs text-stone-400 mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Med Spas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="font-heading text-2xl font-bold text-stone-900 mb-4">
            Why Med Spas?
          </h2>
          <div className="space-y-4 font-mono text-sm text-stone-500 leading-relaxed">
            <p>
              The med spa industry is booming, but most practices are invisible
              online. They rely on word-of-mouth and paid ads while leaving
              thousands of high-intent searches on the table every month.
            </p>
            <p>
              We saw the gap: practices spending $10K+ on ads when patients are
              actively searching for their exact services on Google. The
              opportunity is massive, and no one was solving it properly.
            </p>
            <p>
              By focusing exclusively on med spas, we&apos;ve built a playbook
              that works. We know which keywords convert to bookings, what
              content resonates with patients, how to outrank competitors in
              every local market, and how to get practices cited in ChatGPT,
              Google AI Overviews, Perplexity, and Gemini.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-center"
        >
          <p className="font-mono text-sm text-stone-400 mb-6">
            Want to see what we can do for your practice?
          </p>
          <Link
            href="/book"
            className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-mono font-semibold text-white bg-lume rounded-lg transition-all hover:bg-blue-700 hover:shadow-[0_8px_30px_rgba(37,99,235,0.3)]"
          >
            Book a Call
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
