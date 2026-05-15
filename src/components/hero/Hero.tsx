"use client";

import { motion } from "framer-motion";
import { AsciiNoise } from "./AsciiNoise";
import { MouseGlow } from "./MouseGlow";
import { TerminalTrigger } from "@/components/terminal/Terminal";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Backgrounds */}
      <AsciiNoise />
      <MouseGlow />

      {/* MK watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="text-[30vw] font-bold leading-none tracking-tighter"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--text-primary)",
            opacity: 0.015,
          }}
        >
          MK
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Section label */}
        <motion.div
          className="inline-flex items-center gap-2 mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="section-label">// design leader</span>
          <TerminalTrigger>
            <span
              className="inline-block w-1.5 h-3 align-middle animate-blink"
              style={{ backgroundColor: "var(--accent-green)" }}
            />
          </TerminalTrigger>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6 max-w-3xl"
          style={{ color: "var(--text-primary)" }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          I design products
          <br />
          people actually use.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          className="text-lg md:text-xl leading-relaxed max-w-xl mb-10"
          style={{ color: "var(--text-secondary)" }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          Design leader. Player-coach. Building teams and shipping work
          that moves the needle, then going home to play guitar.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          <button
            onClick={() =>
              document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-3 text-sm font-medium rounded transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: "var(--accent-green)",
              color: "#141414",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--accent-amber)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--accent-green)";
            }}
          >
            See my work ↓
          </button>
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-3 text-sm font-medium rounded border transition-all duration-200 cursor-pointer"
            style={{
              borderColor: "var(--border-strong)",
              color: "var(--text-primary)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--accent-green)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--accent-green)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--border-strong)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--text-primary)";
            }}
          >
            Get in touch →
          </button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div
          className="w-px h-10 mx-auto"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent-green), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
