import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { MKLogo } from "@/components/nav/Nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing — Manu Kamath",
  description: "Long-form notes on design, leadership, and the occasional detour into music and recording. About one a month.",
};

export default function WritingIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}>
      {/* Nav */}
      <header className="max-w-2xl mx-auto px-6 pt-12 pb-2 flex items-center justify-between">
        <Link href="/" aria-label="Back to home">
          <MKLogo size={32} />
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/"
            className="font-mono text-xs transition-colors duration-200"
            style={{ color: "var(--text-secondary)" }}
          >
            ← home
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <p className="section-label mb-6">// writing</p>

        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Thinking out loud.
        </h1>

        <p className="text-base leading-relaxed mb-16" style={{ color: "var(--text-secondary)" }}>
          Long-form notes, about one a month. Design and leadership mostly,
          music and recording when the mood takes me.
        </p>

        {/* Post list */}
        <div className="space-y-0">
          {posts.map((post) => (
            <article key={post.slug}>
              {/* Date marker */}
              <div
                className="font-mono text-xs mb-4 pb-2"
                style={{
                  color: "var(--accent-green)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {post.dateDisplay} ─────────────────────────────────────────
              </div>

              <Link href={`/writing/${post.slug}`} className="group block mb-10">
                <h2
                  className="text-xl font-bold mb-2 transition-colors duration-200"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                  {post.dek}
                </p>
                <div className="flex items-center gap-3 font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                  <span>{post.tags.join(" · ")}</span>
                  <span style={{ color: "var(--border-strong)" }}>·</span>
                  <span>{post.readTime} min</span>
                </div>
              </Link>
            </article>
          ))}

          {/* Sparse-state footer */}
          <p className="font-mono text-xs pt-4" style={{ color: "var(--text-secondary)", borderTop: "1px solid var(--border)" }}>
            More on the way — about one a month.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 flex items-center justify-between font-mono text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}>
          <Link href="/" style={{ color: "var(--text-secondary)" }}>← home</Link>
          <a
            href="https://www.linkedin.com/in/manukamath"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-secondary)" }}
          >
            LinkedIn ↗
          </a>
        </footer>
      </main>
    </div>
  );
}
