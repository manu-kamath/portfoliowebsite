"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const cases = [
  {
    company: "SOTI Inc.",
    period: "2022–Present",
    role: "Design Lead",
    title: "One System to Rule Them All",
    description:
      "Four separate UI libraries. Four teams pulling in different directions. I unified them into a single design system, cutting licensing costs by 50% and giving every product team a shared foundation to build on.",
    slug: "soti",
    cover: "/case-studies/soti/cover.jpg",
  },
  {
    company: "Konnekt",
    period: "2022–2023",
    role: "Design Consultant",
    title: "A Marketplace Built for Kenyan Micro-Retailers",
    description:
      "No existing product. No established pattern to follow. Just a problem worth solving and a whiteboard. I defined the design vision for a 0→1 digital marketplace in Kenya and took it from concept to MVP launch.",
    slug: "konnekt",
    cover: "/case-studies/konnekt/cover.jpg",
  },
  {
    company: "BookMyShow",
    period: "2016–2018",
    role: "Senior Interaction Designer",
    title: "Seating a Large Audience",
    description:
      "Hundreds of seats. A 5-inch screen. Customers who needed to know exactly where they'd be sitting. I redesigned the seat layout system for South Asia's largest ticketing platform, cutting go-live time by up to 2 days and reducing post-booking complaints.",
    slug: "bookmyshow",
    cover: "/case-studies/bookmyshow/cover.jpg",
  },
];

export function CaseStudies() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-8 pb-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {cases.map(({ company, period, role, title, description, slug, cover }, i) => (
            <CaseCard
              key={slug}
              company={company}
              period={period}
              role={role}
              title={title}
              description={description}
              slug={slug}
              cover={cover}
              isInView={isInView}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Section footer */}
        <motion.div
          className="mt-10 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            More work available on request.
          </span>
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-mono text-sm transition-colors duration-200 cursor-pointer"
            style={{ color: "var(--accent-green)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "var(--accent-amber)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "var(--accent-green)")
            }
          >
            Get in touch →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function CaseCard({
  company, period, role, title, description, slug, cover, isInView, delay,
}: {
  company: string; period: string; role: string; title: string;
  description: string; slug: string; cover: string; isInView: boolean; delay: number;
}) {
  return (
    <motion.article
      className="group rounded-lg overflow-hidden flex flex-col cursor-default"
      style={{
        backgroundColor: "var(--surface-1)",
        border: "1px solid var(--border)",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ borderColor: "rgba(124, 186, 110, 0.25)", y: -2 }}
    >
      {/* Cover image */}
      <div className="h-44 relative overflow-hidden" style={{ backgroundColor: "var(--surface-2)" }}>
        <Image
          src={cover}
          alt={title}
          fill
          priority={slug === "soti"}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,20,20,0.5) 0%, transparent 50%)" }} />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        {/* Meta row */}
        <div
          className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>{company}</span>
          <span style={{ color: "var(--border-strong)" }}>·</span>
          <span>{period}</span>
          <span style={{ color: "var(--border-strong)" }}>·</span>
          <span>{role}</span>
        </div>

        <h3
          className="text-lg font-semibold leading-snug"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>

        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>

        <span
          className="font-mono text-xs mt-2 self-start"
          style={{ color: "var(--text-secondary)" }}
        >
          Case study coming soon
        </span>
      </div>
    </motion.article>
  );
}
