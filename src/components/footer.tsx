import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-stone-300/60 px-6 py-8 pb-24 md:pb-8 bg-stone-300/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="font-heading text-lg font-bold text-stone-900 tracking-tight">
          Inject<span className="text-lume">SEO</span>
        </Link>
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/about" className="font-mono text-xs text-stone-400 hover:text-stone-600 transition-colors py-2">About</Link>
          <Link href="/pricing" className="font-mono text-xs text-stone-400 hover:text-stone-600 transition-colors py-2">Pricing</Link>
          <Link href="/book" className="font-mono text-xs text-stone-400 hover:text-stone-600 transition-colors py-2">Book a Call</Link>
        </div>
        <p className="font-mono text-xs text-stone-300">&copy; 2026 InjectSEO &middot; SEO + AI Visibility for Med Spas</p>
      </div>
    </footer>
  );
}
