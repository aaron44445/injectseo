import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { useMDXComponents } from "@/components/mdx-components";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://injectseo.com/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `https://injectseo.com/blog/${slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const components = useMDXComponents();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      "@id": "https://injectseo.com/#organization",
      name: "InjectSEO",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://injectseo.com/#organization",
      name: "InjectSEO",
      url: "https://injectseo.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://injectseo.com/blog/${slug}`,
    },
    keywords: post.tags.join(", "),
    wordCount: post.content.split(/\s+/).length,
    articleSection: post.category,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://injectseo.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://injectseo.com/blog",
      },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <article className="min-h-screen pt-32 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-stone-400 hover:text-lume transition-colors mb-10"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          All posts
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-lume">
              {post.category}
            </span>
            <span className="text-stone-300">/</span>
            <time className="font-mono text-xs text-stone-400">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="text-stone-300">/</span>
            <span className="font-mono text-xs text-stone-400">
              {post.readingTime}
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-stone-900 leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-stone-500 text-base md:text-lg leading-relaxed">
            {post.description}
          </p>
        </header>

        <div className="h-px bg-stone-300 mb-12" />

        {/* Content */}
        <div className="prose-injectseo">
          <MDXRemote source={post.content} components={components} />
        </div>

        <div className="h-px bg-stone-300 mt-16 mb-10" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider text-stone-400 border border-stone-300 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-stone-200/50 border border-stone-300 rounded-xl p-8 text-center">
          <h3 className="font-heading text-xl font-bold text-stone-900 mb-2">
            Want results like these for your med spa?
          </h3>
          <p className="font-mono text-sm text-stone-500 mb-6">
            Book a free 20-minute SEO diagnostic and we&apos;ll show you
            exactly where you&apos;re losing patients to competitors.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-mono font-semibold text-white bg-lume rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Free Audit
            <svg
              className="w-4 h-4"
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
    </article>
  );
}
