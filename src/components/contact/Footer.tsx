"use client";

import { TerminalTrigger } from "@/components/terminal/Terminal";
import { MKLogo } from "@/components/nav/Nav";

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
              <span
                className="font-mono text-xs"
                style={{ color: "var(--text-secondary)", opacity: 0.5 }}
              >
                Built with intention.
              </span>
              {/* Terminal easter egg trigger */}
              <TerminalTrigger />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
