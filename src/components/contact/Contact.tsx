"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const contactLinks = [
  {
    label: "Email",
    value: "manu@manukamath.com",
    href: "mailto:manu@manukamath.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/manukamath",
    href: "https://linkedin.com/in/manukamath",
  },
  {
    label: "GitHub",
    value: "github.com/manu-kamath",
    href: "https://github.com/manu-kamath",
  },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          // contact
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Let's talk.
        </motion.h2>

        <motion.div
          className="max-w-md mb-14 space-y-4 text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            Whether you're hiring, collaborating, curious about coaching,
            or just want to say hello — my inbox is open.
          </p>
          <p>
            I respond to every message. Might take a day or two,
            but I'll get back to you.
          </p>
        </motion.div>

        <motion.div
          className="space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {contactLinks.map(({ label, value, href }, i) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-center justify-between py-5 transition-colors duration-200"
              style={{
                borderBottom:
                  i < contactLinks.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span
                className="font-mono text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {label}
              </span>
              <span
                className="text-sm font-medium transition-colors duration-200 group-hover:text-accent-green"
                style={{ color: "var(--text-primary)" }}
              >
                {value} ↗
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
