import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Med Spa SEO Insights",
  description:
    "Expert SEO tips, strategies, and insights for medical spas and aesthetic practices. Learn how to dominate Google and AI search.",
  alternates: {
    canonical: "https://injectseo.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
