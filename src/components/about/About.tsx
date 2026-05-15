"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Years of experience", value: "12+" },
  { label: "Industries", value: "Healthcare · E-commerce · Ad-tech · Enterprise SaaS" },
  { label: "Covers performed", value: "more than I planned" },
  { label: "People coached", value: "growing" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-28 max-w-6xl mx-auto px-6">
      <motion.p
        className="section-label mb-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        // about
      </motion.p>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left — headline + body */}
        <div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-8"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Designer by trade.
            <br />
            Coach and musician
            <br />
            by choice.
          </motion.h2>

          <motion.div
            className="space-y-5 text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              I've spent my career at the intersection of design craft and
              product thinking. Leading teams, running critiques, shipping
              features, and occasionally being the one who says "let's zoom
              out for a second."
            </p>
            <p>
              I'm a player-coach: I don't believe in design leaders who
              stopped designing. I still push pixels and write specs. I also
              hire, mentor, and represent design at the table.
            </p>
            <p>
              Lately I've been asking a different question: what does it
              mean to lead a design team in an AI-native way? I'm figuring
              that out in public. Building tools, changing workflows, and
              staying curious about what the job looks like next.
            </p>
            <p>
              Outside work, I build things to satisfy the urge to learn and
              explore new ideas. And I make music, mostly covers,
              always with a guitar in hand.
            </p>
            <p style={{ color: "var(--text-primary)", fontStyle: "italic" }}>
              This site is all of it. Same person, different modes.
            </p>
          </motion.div>
        </div>

        {/* Right — stat bar */}
        <motion.div
          className="space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map(({ label, value }, i) => (
            <div
              key={label}
              className="py-5"
              style={{
                borderBottom:
                  i < stats.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <p
                className="font-mono text-xs mb-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                {label}
              </p>
              <p
                className="font-mono text-sm font-medium"
                style={{ color: "var(--accent-green)" }}
              >
                {value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
