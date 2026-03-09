import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://injectseo.com",
              },
              { "@type": "ListItem", position: 2, name: "Blog" },
            ],
          }),
        }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-lume mb-4">
            Insights
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-stone-900 mb-6">
            Med Spa SEO Blog
          </h1>
          <p className="font-mono text-stone-500 text-sm md:text-base max-w-2xl leading-relaxed">
            Proven strategies to help your medical spa rank higher on Google,
            attract more patients, and dominate AI search results.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-stone-400 font-mono text-sm">
            Posts coming soon.
          </p>
        ) : (
          <div className="space-y-0 divide-y divide-stone-300">
            {posts.map((post) => (
              <article key={post.slug} className="py-10 first:pt-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex items-center gap-3 mb-3">
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
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 group-hover:text-lume transition-colors mb-3">
                    {post.title}
                  </h2>
                  <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-2xl">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider text-stone-400 border border-stone-300 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
