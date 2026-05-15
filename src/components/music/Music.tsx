"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SHORTS = [
  { id: "-sml9p5XT2U" },
  { id: "ytBS3p-tQOs" },
  { id: "IZC0SAxvoyc" },
  { id: "6rE7OqiVDQc" },
];

export function Music() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="music" ref={ref} className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          // music
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          I also play guitar.
          <br />
          <span style={{ color: "var(--text-secondary)" }}>
            (And sing. Sometimes well.)
          </span>
        </motion.h2>

        <motion.div
          className="max-w-xl mb-14 space-y-4 text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            Music is the part of my life that has nothing to prove.
            No OKRs. No stakeholders. Just a song I like, a guitar,
            and the humbling experience of realizing how hard it is
            to make something sound effortless.
          </p>
          <p>
            I do covers. Mostly singer-songwriter stuff, some
            classics, whatever I'm obsessed with that month.
          </p>
        </motion.div>

        {/* YouTube Shorts grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {SHORTS.map(({ id }) => (
            <ShortEmbed key={id} id={id} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="https://www.youtube.com/manukamath"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-sm font-medium rounded border transition-all duration-200"
            style={{
              borderColor: "var(--border-strong)",
              color: "var(--text-primary)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--accent-green)";
              el.style.color = "var(--accent-green)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--border-strong)";
              el.style.color = "var(--text-primary)";
            }}
          >
            Watch on YouTube →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ShortEmbed({ id }: { id: string }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{
        border: "1px solid var(--border)",
        aspectRatio: "9/16",
        backgroundColor: "#000",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube Short"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        style={{ border: "none" }}
      />
    </div>
  );
}
