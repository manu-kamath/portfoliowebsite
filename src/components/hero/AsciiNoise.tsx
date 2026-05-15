"use client";

import { useEffect, useRef } from "react";

const CHARS = ".:-=+*#%@";
const FONT_SIZE = 10;
const ANIMATION_SPEED = 50; // chars updated per second ÷ 1000

export function AsciiNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let grid: string[][] = [];
    let rafId: number;

    function getChar() {
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
      cols = Math.floor(rect.width / FONT_SIZE);
      rows = Math.floor(rect.height / FONT_SIZE);
      grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, getChar)
      );
    }

    function draw() {
      const rect = canvas!.getBoundingClientRect();
      ctx!.clearRect(0, 0, rect.width, rect.height);
      ctx!.font = `${FONT_SIZE}px monospace`;
      ctx!.fillStyle = "#2e2e2e";

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          ctx!.globalAlpha = 0.9;
          ctx!.fillText(grid[i][j], j * FONT_SIZE, i * FONT_SIZE);
          if (Math.random() < ANIMATION_SPEED / 1000) {
            grid[i][j] = getChar();
          }
        }
      }
      ctx!.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.06 }}
    />
  );
}
