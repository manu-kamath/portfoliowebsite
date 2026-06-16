import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Manu Kamath`,
    description: post.dek,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prev = allPosts[idx + 1] ?? null;
  const next = allPosts[idx - 1] ?? null;

  // Convert plain text body to paragraphs + section breaks
  const sections = post.body.split("\n\n---\n\n");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}>
      {/* Back link */}
      <header className="max-w-2xl mx-auto px-6 pt-12 pb-0 flex items-center justify-between">
        <Link
          href="/writing"
          className="font-mono text-xs transition-colors duration-200"
          style={{ color: "var(--text-secondary)" }}
        >
          ← writing
        </Link>
        <ThemeToggle />
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Meta */}
        <div className="font-mono text-xs mb-8" style={{ color: "var(--text-secondary)" }}>
          {post.dateDisplay} · {post.readTime} min · {post.tags.join(" · ")}
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold tracking-tight mb-5 leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {post.title}
        </h1>

        {/* Dek */}
        <p
          className="text-lg leading-relaxed mb-12"
          style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)", paddingBottom: "3rem" }}
        >
          {post.dek}
        </p>

        {/* Body */}
        <div className="space-y-6">
          {sections.map((section, si) => (
            <div key={si}>
              {si > 0 && (
                <div
                  className="my-10 font-mono text-xs text-center"
                  style={{ color: "var(--border-strong)" }}
                >
                  ───────────────────────────────────────────────────
                </div>
              )}
              {section.split("\n\n").map((para, pi) => {
                const trimmed = para.trim();
                if (!trimmed) return null;

                // Markdown headings: ## text
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2
                      key={pi}
                      className="text-lg font-bold mt-8 mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {trimmed.slice(3)}
                    </h2>
                  );
                }

                // Bold-only paragraphs: **text**
                if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                  return (
                    <h2
                      key={pi}
                      className="text-base font-bold mt-8 mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {trimmed.slice(2, -2)}
                    </h2>
                  );
                }

                // Inline bold via **...**
                const withBold = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                // Inline italic via *...*
                const withItalic = withBold.replace(/\*(.*?)\*/g, "<em>$1</em>");

                return (
                  <p
                    key={pi}
                    className="text-base leading-8"
                    style={{ color: "var(--text-secondary)" }}
                    dangerouslySetInnerHTML={{ __html: withItalic }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Next / Prev navigation */}
        <div
          className="mt-20 pt-8 grid gap-4"
          style={{
            borderTop: "1px solid var(--border)",
            gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr",
          }}
        >
          {prev ? (
            <Link href={`/writing/${prev.slug}`} className="group block">
              <div className="font-mono text-xs mb-2" style={{ color: "var(--text-secondary)" }}>← previous</div>
              <div
                className="text-sm font-bold mb-1 transition-colors duration-200"
                style={{ color: "var(--text-primary)" }}
              >
                {prev.title}
              </div>
              <div className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                {prev.tags.join(" · ")}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link href={`/writing/${next.slug}`} className="group block text-right">
              <div className="font-mono text-xs mb-2" style={{ color: "var(--text-secondary)" }}>next →</div>
              <div
                className="text-sm font-bold mb-1 transition-colors duration-200"
                style={{ color: "var(--text-primary)" }}
              >
                {next.title}
              </div>
              <div className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                {next.tags.join(" · ")}
              </div>
            </Link>
          ) : (
            <div className="text-right font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
              You&apos;re all caught up.
            </div>
          )}
        </div>

        {/* Footer */}
        <footer
          className="mt-12 pt-8 flex items-center justify-between font-mono text-xs"
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}
        >
          <Link href="/writing" style={{ color: "var(--text-secondary)" }}>← writing</Link>
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
