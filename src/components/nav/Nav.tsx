"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work", href: "#work", anchor: true },
  { label: "Writing", href: "/writing", anchor: false },
  { label: "Music", href: "#music", anchor: true },
  { label: "Contact", href: "#contact", anchor: true },
];

import { useTheme, ThemeToggle } from "@/components/ThemeToggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--bg) 85%, transparent)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* MK Logo */}
        <a
          href="#"
          aria-label="Manu Kamath"
          className="flex items-center gap-1 select-none"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <MKLogo />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, href, anchor }) => (
            <li key={href}>
              {anchor ? (
                <button
                  onClick={() => handleLink(href)}
                  className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer"
                >
                  {label}
                </button>
              ) : (
                <a
                  href={href}
                  className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  {label}
                </a>
              )}
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="w-8 h-8 flex items-center justify-center"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{ color: "var(--text-secondary)" }}
          >
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="2" y1="4" x2="14" y2="4" />
                <line x1="2" y1="8" x2="14" y2="8" />
                <line x1="2" y1="12" x2="14" y2="12" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            id="mobile-menu"
            className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
            style={{ backgroundColor: "color-mix(in srgb, var(--bg) 95%, transparent)" }}
          >
            {links.map(({ label, href, anchor }) => (
              anchor ? (
                <button
                  key={href}
                  onClick={() => handleLink(href)}
                  className="font-mono text-sm text-text-secondary hover:text-text-primary text-left transition-colors duration-200"
                >
                  {label}
                </button>
              ) : (
                <a
                  key={href}
                  href={href}
                  className="font-mono text-sm text-text-secondary hover:text-text-primary text-left transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Exact paths from Figma — Logo/MK-Nav (node 42:8)
export function MKLogo({ size = 40 }: { size?: number }) {
  const s = (17 / 200) * (size / 40);
  const pad = 2 * (size / 40);
  const top = 10 * (size / 40);
  const gap = 2 * (size / 40);
  const letterW = 17 * (size / 40);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MK"
    >
      {/* M */}
      <g transform={`translate(${pad}, ${top}) scale(${s})`}>
        <path d="M0 0L100 100L200 0V200H0V0Z" fill="#30CC81" />
        <path d="M0 200H200L0 0V200Z" fill="#32E45F" />
      </g>
      {/* K */}
      <g transform={`translate(${pad + letterW + gap}, ${top}) scale(${s})`}>
        <path d="M0 0H200L100 100L200 200H0V0Z" fill="#275ADC" />
        <path d="M0 0V200L200 0H0Z" fill="#1691D7" />
      </g>
    </svg>
  );
}
