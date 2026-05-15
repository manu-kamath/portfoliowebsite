"use client";

import { useEffect, useRef, useState } from "react";

export function MouseGlow() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.3 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(600px circle at ${pos.x * 100}% ${pos.y * 100}%, rgba(124, 186, 110, 0.06) 0%, rgba(90, 138, 180, 0.04) 40%, transparent 70%)`,
        transition: "background 0.1s ease",
      }}
    />
  );
}
