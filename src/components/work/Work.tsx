"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Work() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" ref={ref} className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          // work
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Design that ships.
        </motion.h2>

        <motion.p
          className="text-lg max-w-xl mb-16 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          I lead design at the product level: strategy, systems,
          execution. Here's a selection of what that looks like in practice.
        </motion.p>

        {/* AI callout */}
        <motion.div
          className="rounded-lg p-6 md:p-8"
          style={{
            backgroundColor: "var(--surface-1)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--glow-green)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label mb-4">// currently experimenting</p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            I'm figuring out what AI-native design leadership looks like
            in practice. That means building tools, not just using them.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            At SOTI, I built a dashboard to measure and track design team
            productivity. I also built the ASCII Noise Grid Generator —
            an SVG-based design tool for generating noise grid backgrounds,
            built with AI.{" "}
            <span style={{ color: "var(--text-primary)", fontStyle: "italic" }}>
              (The texture on this site? Made with it.)
            </span>
          </p>
          <a
            href="https://github.com/manu-kamath"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm transition-colors duration-200"
            style={{ color: "var(--accent-green)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-amber)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-green)")
            }
          >
            View on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
