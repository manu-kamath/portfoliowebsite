"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalTrigger } from "@/components/terminal/Terminal";
import { MKLogo } from "@/components/nav/Nav";

const WORDS = ["intention.", "love.", "Claude."];

function CyclingWord() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-baseline gap-1 font-mono text-xs" style={{ color: "var(--text-secondary)", opacity: 0.5 }}>
      Built with{" "}
      <span className="relative inline-block" style={{ minWidth: "5rem" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={WORDS[idx]}
            className="inline-block"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {WORDS[idx]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Music", href: "#music" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer
      className="py-10"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col gap-3">
            <MKLogo size={32} />
            <nav className="flex gap-5">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="font-mono text-xs transition-colors duration-200"
                  style={{ color: "var(--text-secondary)" }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right */}
          <div className="flex flex-col md:items-end gap-3">
            <p
              className="font-mono text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              © 2026 Manu Kamath
            </p>
            <div className="flex items-center gap-4">
              <CyclingWord />
              {/* Terminal easter egg trigger */}
              <TerminalTrigger />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
