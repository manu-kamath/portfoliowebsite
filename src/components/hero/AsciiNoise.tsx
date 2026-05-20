"use client";

import { useEffect, useRef } from "react";

const CHARS = ".:-=+*#%@";
const FONT_SIZE = 10;
const ANIMATION_SPEED = 50;
const NOISE_OPACITY = 0.2;
const SHAPE_OPACITY = 0.55;
const NOISE_COLOR = "#262626";
const SHAPE_COLOR = "#2e2e2e";

// Person/user icon SVG path (same as dark.html reference)
const SHAPE_PATH = `<path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />`;
const SHAPE_VIEWBOX = "0 -960 960 960";
const SHAPE_CANVAS_SIZE = 128;

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

    // Off-screen canvas for the shape mask
    const shapeCanvas = document.createElement("canvas");
    shapeCanvas.width = SHAPE_CANVAS_SIZE;
    shapeCanvas.height = SHAPE_CANVAS_SIZE;
    const shapeCtx = shapeCanvas.getContext("2d")!;
    let shapeImageData: Uint8ClampedArray | null = null;

    function getChar() {
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function loadShape() {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SHAPE_VIEWBOX}" fill="white">${SHAPE_PATH}</svg>`;
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
      const rect = canvas!.getBoundingClientRect();
      ctx!.clearRect(0, 0, rect.width, rect.height);
      ctx!.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const char = grid[i][j];
          const alpha = getShapeAlpha(j, i, rect.width, rect.height);

          if (alpha > 0) {
            ctx!.fillStyle = SHAPE_COLOR;
            ctx!.globalAlpha = (alpha / 255) * SHAPE_OPACITY;
          } else {
            ctx!.fillStyle = NOISE_COLOR;
            ctx!.globalAlpha = NOISE_OPACITY;
          }

          ctx!.fillText(char, j * FONT_SIZE, i * FONT_SIZE);

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
