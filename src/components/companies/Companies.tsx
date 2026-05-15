"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const companies = [
  "SOTI Inc.",
  "KOKO Networks",
  "Innovaccer",
  "Media.net",
  "BookMyShow",
];

export function Companies() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          className="section-label mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          // where I've worked
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-start md:justify-between items-center gap-x-8 gap-y-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {companies.map((name, i) => (
            <CompanyName key={name} name={name} delay={i * 0.06} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CompanyName({ name, delay, isInView }: { name: string; delay: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      className="text-base md:text-lg font-medium select-none transition-all duration-300 cursor-default"
      style={{
        fontFamily: "var(--font-sans)",
        color: hovered ? "var(--text-primary)" : "var(--text-secondary)",
        opacity: hovered ? 1 : 0.5,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: hovered ? 1 : 0.5, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {name}
    </motion.span>
  );
}
