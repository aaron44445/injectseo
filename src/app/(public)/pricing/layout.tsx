import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Custom SEO growth plans for med spas. Book a free strategy call to get a plan built for your practice.",
  openGraph: {
    title: "Pricing | InjectSEO",
    description:
      "Custom SEO growth plans for med spas. Book a free strategy call to get a plan built for your practice.",
  },
  alternates: {
    canonical: "https://injectseo.com/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
