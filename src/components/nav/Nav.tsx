"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Music", href: "#music" },
  { label: "Contact", href: "#contact" },
];

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
          ? "rgba(20, 20, 20, 0.85)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(232, 228, 223, 0.08)"
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
          {links.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleLink(href)}
                className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-px bg-text-secondary transition-all duration-200"
            style={{ transform: menuOpen ? "translateY(4px) rotate(45deg)" : "" }}
          />
          <span
            className="block w-5 h-px bg-text-secondary transition-all duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-text-secondary transition-all duration-200"
            style={{ transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "" }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
            style={{ backgroundColor: "rgba(20, 20, 20, 0.95)" }}
          >
            {links.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleLink(href)}
                className="font-mono text-sm text-text-secondary hover:text-text-primary text-left transition-colors duration-200"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MKLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mk-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7cba6e" />
          <stop offset="100%" stopColor="#5a8ab4" />
        </linearGradient>
      </defs>
      {/* M */}
      <path
        d="M4 24V8L11 18L18 8V24"
        stroke="url(#mk-grad)"
        strokeWidth="2.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* K */}
      <path
        d="M21 8V24M21 16L28 8M21 16L28 24"
        stroke="url(#mk-grad)"
        strokeWidth="2.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}
