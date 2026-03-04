"use client";

import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";

export function CTA() {
  const { ref: h2Ref, inView: h2InView } = useInView();
  const { ref: pRef, inView: pInView } = useInView();
  const { ref: btnRef, inView: btnInView } = useInView();

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      {/* Decorative gradient mesh — radial-gradient instead of blur() */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(96,165,250,0.2), transparent 70%)" }} />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(45,212,191,0.1), transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(147,197,253,0.1), transparent 70%)" }} />
      </div>
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative">
        <div className="py-8 md:py-14 text-center space-y-6">
          <h2
            ref={h2Ref}
            className={`font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white transition-all duration-600 ${
              h2InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Ready to Dominate Google?
          </h2>

          <p
            ref={pRef}
            className={`font-mono text-sm md:text-base text-blue-100/70 max-w-xl mx-auto leading-relaxed transition-all duration-600 delay-150 ${
              pInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Get a free SEO diagnostic for your med spa. We&apos;ll show you
            exactly where you&apos;re losing patients to competitors.
          </p>

          <div
            ref={btnRef}
            className={`transition-all duration-600 delay-300 ${
              btnInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/book"
              className="group inline-flex items-center gap-3 px-8 py-4 text-base font-mono font-semibold text-blue-700 bg-white rounded-lg transition-all hover:bg-blue-50 hover:shadow-[0_8px_40px_rgba(255,255,255,0.2)]"
            >
              Book Your Free Audit
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
