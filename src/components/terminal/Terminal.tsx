"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type Line = { type: "input" | "output" | "error"; text: string };

const RESPONSES: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  about      — who I am, in a few lines",
    "  work       — what I ship",
    "  music      — the guitar situation",
    "  coaching   — how I help people build income",
    "  contact    — email, LinkedIn, GitHub",
    "  ls         — directory listing",
    "  whoami     — one line",
    "  clear      — clear terminal",
    "  exit       — close this window",
  ],
  about: [
    "Design leader with 12+ years across enterprise, health-tech, e-commerce, and ad-tech.",
    "Player-coach: still pushing pixels, still in the code, still asking 'what problem are we solving?'",
    "Currently figuring out what AI-native design leadership looks like.",
    "Outside work: guitar, covers, coaching, curiosity.",
  ],
  work: [
    "Recent work:",
    "  → SOTI      — Unified 4 UI libraries into one design system. Cut licensing costs 50%.",
    "  → Konnekt   — 0-to-1 marketplace for Kenyan micro-retailers.",
    "  → BMS       — Seat layout redesign. 2 days cut from go-live. Complaints down.",
    "",
    "Scroll up to see the cards, or type 'contact' to get in touch about more.",
  ],
  music: [
    "I play guitar. I do covers.",
    "Mostly singer-songwriter stuff. Some classics.",
    "Whatever I'm obsessed with that month.",
    "",
    "YouTube → https://www.youtube.com/manukamath",
    "(No OKRs. No stakeholders. Just the song.)",
  ],
  coaching: [
    "I help people build secondary income through eCommerce and direct selling.",
    "Real stuff, not hype.",
    "",
    "Coming to this site properly in v2.",
    "Want to know more now? → manu@manukamath.com",
  ],
  contact: [
    "Email    → manu@manukamath.com",
    "LinkedIn → linkedin.com/in/manukamath",
    "GitHub   → github.com/manu-kamath",
  ],
  ls: [
    "drwxr-xr-x  work/",
    "drwxr-xr-x  music/",
    "drwxr-xr-x  coaching/",
    "drwxr-xr-x  contact/",
    "drwxr-xr-x  experiments/",
  ],
  whoami: ["manu kamath. designer. coach. guitarist. building with ai. currently here."],
  sudo: ["Nice try."],
  exit: ["You sure? Everything good out there?"],
};

interface TerminalProps {
  onClose: () => void;
  isMobile?: boolean;
}

export function Terminal({ onClose, isMobile }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "manukamath.com terminal — type 'help' to start." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newLines: Line[] = [{ type: "input", text: `> ${cmd}` }];

      if (!trimmed) {
        setLines((l) => [...l, ...newLines]);
        return;
      }

      if (trimmed === "clear") {
        setLines([]);
        return;
      }

      if (trimmed === "exit") {
        newLines.push({ type: "output", text: RESPONSES.exit[0] });
        setLines((l) => [...l, ...newLines]);
        setTimeout(onClose, 800);
        return;
      }

      const response = RESPONSES[trimmed];
      if (response) {
        response.forEach((t) => newLines.push({ type: "output", text: t }));
      } else {
        newLines.push({
          type: "error",
          text: `command not found: ${trimmed}. Type 'help' for options.`,
        });
      }

      setLines((l) => [...l, ...newLines]);
      setHistory((h) => [trimmed, ...h]);
      setHistoryIdx(-1);
    },
    [onClose]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  // Focus trap: cycle between close button and input only
  const onDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key !== "Tab") return;
    const focusable = [closeBtnRef.current, inputRef.current].filter(Boolean) as HTMLElement[];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
      className="overflow-hidden flex flex-col"
      style={{
        backgroundColor: "var(--surface-1)",
        border: "1px solid var(--border-strong)",
        boxShadow: "var(--glow-green)",
        fontFamily: "var(--font-mono)",
        ...(isMobile
          ? { width: "100vw", height: "100%", borderRadius: 0 }
          : { width: "min(560px, 92vw)", maxHeight: "420px", borderRadius: "0.5rem" }),
      }}
      onClick={() => inputRef.current?.focus()}
      onKeyDown={onDialogKeyDown}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--surface-2)" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c, opacity: 0.7 }} />
            ))}
          </div>
          <span className="text-xs ml-2" style={{ color: "var(--text-secondary)" }}>
            manukamath.com — bash
          </span>
        </div>
        <button
          ref={closeBtnRef}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close terminal"
          className="transition-colors duration-200 cursor-pointer px-2 py-1"
          style={{ color: "var(--text-secondary)", fontSize: isMobile ? "1.25rem" : "0.75rem" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)")}
        >
          ✕
        </button>
      </div>

      {/* Output */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1 leading-6"
        style={{ minHeight: 0, fontSize: isMobile ? "15px" : "0.75rem" }}
      >
        {lines.map((line, i) => (
          <div key={i}>
            {line.type === "input" ? (
              <span style={{ color: "var(--accent-green)" }}>{line.text}</span>
            ) : line.type === "error" ? (
              <span style={{ color: "var(--accent-amber)" }}>{line.text}</span>
            ) : (
              <span style={{ color: "var(--text-secondary)" }}>{line.text}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div
        className="flex items-center gap-2 px-4 flex-shrink-0"
        style={{ borderTop: "1px solid var(--border)", paddingTop: isMobile ? "1rem" : "0.75rem", paddingBottom: isMobile ? "1.5rem" : "0.75rem" }}
      >
        <span aria-hidden="true" style={{ color: "var(--accent-green)", fontSize: isMobile ? "15px" : "0.75rem" }}>
          &gt;
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal command input"
          className="flex-1 bg-transparent outline-none"
          style={{ color: "var(--text-primary)", caretColor: "var(--accent-green)", fontSize: "16px" }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function TerminalTrigger({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [kbOffset, setKbOffset] = useState(0);
  const isMobile = useIsMobile();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  // Keep terminal above the software keyboard on all devices
  useEffect(() => {
    if (!open) { setKbOffset(0); return; }
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      setKbOffset(Math.max(0, window.innerHeight - vv.height - vv.offsetTop));
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="font-mono text-xs cursor-pointer select-none bg-transparent border-none outline-none p-0"
        style={{ color: "var(--text-secondary)" }}
        aria-label="Open terminal"
        aria-haspopup="dialog"
        title="Open terminal"
      >
        {children ?? <BlinkingCursor />}
      </button>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className={
                isMobile
                  ? "fixed inset-0 z-[60] flex flex-col pointer-events-auto"
                  : "fixed inset-0 z-[60] flex items-end justify-end p-10 pointer-events-none"
              }
              style={{ bottom: kbOffset }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={isMobile ? "pointer-events-auto flex-1 flex flex-col" : "pointer-events-auto"}
                initial={isMobile ? { y: "100%" } : { opacity: 0, y: 24, scale: 0.96 }}
                animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
                exit={isMobile ? { y: "100%" } : { opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Terminal onClose={handleClose} isMobile={isMobile} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

function BlinkingCursor() {
  return (
    <span className="inline-flex items-center gap-0.5">
      <span>&gt;</span>
      <span
        className="inline-block w-1.5 h-3.5 align-middle animate-blink"
        style={{ backgroundColor: "var(--accent-green)" }}
      />
    </span>
  );
}
