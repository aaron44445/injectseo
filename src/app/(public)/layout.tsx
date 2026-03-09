import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { CursorFollower } from "@/components/cursor-follower";
import { FloatingCTA } from "@/components/floating-cta";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://injectseo.com"
  ),
  title: {
    default: "InjectSEO | Med Spa SEO Agency",
    template: "%s | InjectSEO",
  },
  description:
    "Precision SEO for aesthetic practices. We help med spas dominate Google with data-driven SEO and content marketing.",
  keywords: [
    "med spa SEO",
    "medical spa marketing",
    "aesthetic practice SEO",
    "med spa digital marketing",
  ],
  authors: [{ name: "InjectSEO" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://injectseo.com",
    siteName: "InjectSEO",
    title: "InjectSEO | Med Spa SEO Agency",
    description:
      "Precision SEO for aesthetic practices. We help med spas dominate Google.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "InjectSEO | Med Spa SEO Agency",
    description: "Precision SEO for aesthetic practices.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://injectseo.com",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://injectseo.com/#organization",
                name: "InjectSEO",
                url: "https://injectseo.com",
                description:
                  "Precision SEO for aesthetic practices. We help med spas dominate Google with data-driven SEO and content marketing.",
                foundingDate: "2026",
                founders: [
                  {
                    "@type": "Person",
                    name: "Aaron McBride",
                    jobTitle: "Co-founder, Growth Strategy",
                  },
                  {
                    "@type": "Person",
                    name: "Seth",
                    jobTitle: "Co-founder, SEO & Content",
                  },
                ],
                areaServed: {
                  "@type": "Country",
                  name: "United States",
                },
                knowsAbout: [
                  "Medical Spa SEO",
                  "Med Spa Marketing",
                  "Answer Engine Optimization",
                  "Local SEO",
                  "Content Marketing for Aesthetic Practices",
                ],
              },
              {
                "@type": "WebSite",
                "@id": "https://injectseo.com/#website",
                name: "InjectSEO",
                url: "https://injectseo.com",
                publisher: {
                  "@id": "https://injectseo.com/#organization",
                },
              },
            ],
          }),
        }}
      />
      <CursorFollower />
      <Nav />
      <main className="relative z-10">{children}</main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
