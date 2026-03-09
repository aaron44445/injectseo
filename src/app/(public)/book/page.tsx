"use client";

import Script from "next/script";
import { motion } from "framer-motion";

export default function BookPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://injectseo.com" },
              { "@type": "ListItem", position: 2, name: "Book a Free Audit" },
            ],
          }),
        }}
      />
      <div className="max-w-3xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-6xl font-bold text-stone-900 mb-6"
        >
          Book Your Free SEO Diagnostic
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-mono text-stone-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
        >
          20 minutes. Zero obligation. We&apos;ll walk through your current
          online presence and show you exactly where you&apos;re losing patients
          to competitors.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <div
          className="calendly-inline-widget rounded-lg overflow-hidden"
          data-url="https://calendly.com/aaronmcbride57/injectseo-audit"
          style={{ minWidth: "320px", height: "700px" }}
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </motion.div>
    </section>
  );
}
