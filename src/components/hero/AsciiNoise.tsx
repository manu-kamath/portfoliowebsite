"use client";

import { useEffect, useRef } from "react";

const CHARS = ".:-=+*#%@";
const FONT_SIZE = 10;
const ANIMATION_SPEED = 50;
const SHAPE_CANVAS_SIZE = 128;
const MK_SHAPE_PATH = `<path d="M38 175L162.762 300L287.524 175V425H38V175Z" fill="white"/><path d="M38 425H287.524L38 175V425Z" fill="white"/><path d="M312.476 175H443.476H562L437.238 300L562 425H312.476V175Z" fill="white"/><path d="M312.476 175V425L562 175H312.476Z" fill="white"/>`;
const MK_VIEWBOX = "0 0 600 600";

export function AsciiNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0, rows = 0;
    let grid: string[][] = [];
    let rafId: number;

    // Shape mask for light mode MK logo
    const shapeCanvas = document.createElement("canvas");
    shapeCanvas.width = SHAPE_CANVAS_SIZE;
    shapeCanvas.height = SHAPE_CANVAS_SIZE;
    const shapeCtx = shapeCanvas.getContext("2d")!;
    let shapeImageData: Uint8ClampedArray | null = null;

    function loadShape() {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MK_VIEWBOX}">${MK_SHAPE_PATH}</svg>`;
      const img = new Image();
      img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
      img.onload = () => {
        shapeCtx.drawImage(img, 0, 0, SHAPE_CANVAS_SIZE, SHAPE_CANVAS_SIZE);
        shapeImageData = shapeCtx.getImageData(0, 0, SHAPE_CANVAS_SIZE, SHAPE_CANVAS_SIZE).data;
      };
    }

    function getShapeAlpha(gridX: number, gridY: number, canvasW: number, canvasH: number): number {
      if (!shapeImageData) return 0;
      const shapeDisplaySize = Math.min(canvasW, canvasH) * 0.8;
      const startX = (canvasW - shapeDisplaySize) / 2;
      const startY = (canvasH - shapeDisplaySize) / 2;
      const realX = gridX * FONT_SIZE;
      const realY = gridY * FONT_SIZE;
      if (realX < startX || realX > startX + shapeDisplaySize || realY < startY || realY > startY + shapeDisplaySize) return 0;
      const sx = Math.floor(((realX - startX) / shapeDisplaySize) * SHAPE_CANVAS_SIZE);
      const sy = Math.floor(((realY - startY) / shapeDisplaySize) * SHAPE_CANVAS_SIZE);
      if (sx < 0 || sx >= SHAPE_CANVAS_SIZE || sy < 0 || sy >= SHAPE_CANVAS_SIZE) return 0;
      return shapeImageData[(sy * SHAPE_CANVAS_SIZE + sx) * 4 + 3];
    }

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
      grid = Array.from({ length: rows }, () => Array.from({ length: cols }, getChar));
    }

    function draw() {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const rect = canvas!.getBoundingClientRect();
      ctx!.clearRect(0, 0, rect.width, rect.height);
      ctx!.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const char = grid[i][j];

          const alpha = getShapeAlpha(j, i, rect.width, rect.height);
          if (alpha > 0) {
            ctx!.fillStyle = isLight ? "#dbdad8" : "#232323";
            ctx!.globalAlpha = (alpha / 255) * 1.0;
          } else {
            ctx!.fillStyle = isLight ? "#eae8e5" : "#242424";
            ctx!.globalAlpha = 0.3;
          }

          ctx!.fillText(char, j * FONT_SIZE, i * FONT_SIZE);
          ctx!.globalAlpha = 1;

          if (Math.random() < ANIMATION_SPEED / 1000) {
            grid[i][j] = getChar();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    loadShape();
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
    />
  );
}
