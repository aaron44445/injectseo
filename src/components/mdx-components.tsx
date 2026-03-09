import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mt-12 mb-6 first:mt-0"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mt-10 mb-4"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="font-heading text-xl md:text-2xl font-semibold text-stone-800 mt-8 mb-3"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="text-stone-600 leading-relaxed mb-6 text-base md:text-lg"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="list-disc list-outside ml-6 mb-6 space-y-2 text-stone-600 text-base md:text-lg"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="list-decimal list-outside ml-6 mb-6 space-y-2 text-stone-600 text-base md:text-lg"
        {...props}
      />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    a: (props) => (
      <a
        className="text-lume underline underline-offset-2 hover:text-blue-700 transition-colors"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-lume pl-6 my-6 text-stone-500 italic text-base md:text-lg"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="bg-stone-200 text-stone-800 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="bg-stone-900 text-stone-100 rounded-lg p-4 mb-6 overflow-x-auto text-sm font-mono"
        {...props}
      />
    ),
    hr: () => <hr className="border-stone-300 my-10" />,
    strong: (props) => (
      <strong className="font-semibold text-stone-800" {...props} />
    ),
    table: (props) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left border-collapse" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b-2 border-stone-300 px-4 py-2 font-heading font-semibold text-stone-800 text-sm"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="border-b border-stone-200 px-4 py-2 text-stone-600 text-sm"
        {...props}
      />
    ),
  };
}
