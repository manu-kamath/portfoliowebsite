"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const posts = [
  {
    slug: "the-design-manager-trap",
    date: "June 2025",
    readTime: "6 min read",
    tag: "Leadership",
    title: "The Design Manager Trap",
    excerpt:
      "Everyone told me becoming a design manager was the obvious next step. More scope, more impact, a team to mentor. What nobody told me was how long it would take to stop missing the craft — and whether I'd ever fully stop.",
    href: "#",
  },
];

export function Blog() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" ref={ref} className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          // blog
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Writing things down.
          <br />
          <span style={{ color: "var(--text-secondary)" }}>
            Thinking out loud.
          </span>
        </motion.h2>

        <motion.p
          className="max-w-xl mb-14 text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Occasional essays on design leadership, building teams,
          and the messy overlap between craft and management.
        </motion.p>

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface Post {
  slug: string;
  date: string;
  readTime: string;
  tag: string;
  title: string;
  excerpt: string;
  href: string;
}

function BlogCard({ post }: { post: Post }) {
  return (
    <a
      href={post.href}
      className="group block rounded-xl p-7 transition-all duration-300"
      style={{
        backgroundColor: "var(--surface-1)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-strong)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
      }}
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span
          className="font-mono text-xs px-2 py-0.5 rounded"
          style={{
            backgroundColor: "var(--surface-2)",
            color: "var(--accent-green)",
          }}
        >
          {post.tag}
        </span>
        <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
          {post.date}
        </span>
        <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
          · {post.readTime}
        </span>
      </div>

      <h3
        className="text-xl font-bold mb-3 transition-colors duration-200"
        style={{ color: "var(--text-primary)" }}
      >
        {post.title}
        <span
          className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: "var(--accent-green)" }}
        >
          →
        </span>
      </h3>

      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {post.excerpt}
      </p>
    </a>
  );
}
