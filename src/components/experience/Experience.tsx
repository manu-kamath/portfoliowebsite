"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    company: "SOTI Inc.",
    role: "Manager, Product Design",
    years: "Oct 2022 – Present",
    description:
      "Leading a multidisciplinary design org building enterprise SaaS products used by organizations worldwide.",
  },
  {
    company: "KOKO Networks (Konnekt)",
    role: "Product Design Consultant",
    years: "Aug 2022 – Apr 2023",
    description:
      "0-to-1 product design for a digital grocery marketplace serving micro-retailers in Kenya.",
  },
  {
    company: "Innovaccer",
    role: "Product Design Manager",
    years: "Dec 2021 – May 2022",
    description:
      "Design strategy for a regulated, data-intensive health-tech SaaS platform.",
  },
  {
    company: "Media.net",
    role: "Senior Manager, Apps",
    years: "Aug 2018 – Dec 2021",
    description:
      "Directed design across consumer product domains. Contributed to 20% conversion growth and 10–50% revenue uplift.",
  },
  {
    company: "BookMyShow",
    role: "Product Manager, Live Entertainment & Music",
    years: "Nov 2016 – Aug 2018",
    description:
      "Grew Jukebox music product to nearly 1M monthly active users. Redesigned live event operations end to end.",
  },
];

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          // experience
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-16 leading-tight"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          The places that
          <br />
          shaped the work.
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ backgroundColor: "var(--accent-green)", opacity: 0.3 }}
          />

          <div className="space-y-0">
            {timeline.map(({ company, role, years, description }, i) => (
              <TimelineEntry
                key={company}
                company={company}
                role={role}
                years={years}
                description={description}
                isInView={isInView}
                delay={i * 0.1}
                isLast={i === timeline.length - 1}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="mt-12 pl-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a
            href="https://linkedin.com/in/manukamath"
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
            Full résumé on LinkedIn ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineEntry({
  company, role, years, description, isInView, delay, isLast,
}: {
  company: string; role: string; years: string; description: string;
  isInView: boolean; delay: number; isLast: boolean;
}) {
  return (
    <motion.div
      className="pl-8 pb-10 relative"
      style={{ borderBottom: isLast ? "none" : "1px solid var(--border)" }}
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Dot on the line */}
      <div
        className="absolute left-0 top-6 w-1.5 h-1.5 rounded-full -translate-x-[2px]"
        style={{ backgroundColor: "var(--accent-green)" }}
      />

      <div className="pt-4">
        <h3
          className="text-lg font-semibold mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          {company}
        </h3>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
          <span
            className="font-mono text-xs"
            style={{ color: "var(--accent-green)" }}
          >
            {role}
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            {years}
          </span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}
