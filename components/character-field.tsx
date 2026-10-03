"use client";

import { useEffect, useRef } from "react";

type Cell = {
  x: number;
  y: number;
  glyph: string;
  strength: number;
  seed: number;
};

export function CharacterField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let cells: Cell[] = [];
    let width = 0;
    let height = 0;
    let spacing = 10;
    let frame = 0;
    let startedAt = performance.now();
    let lastInteraction = startedAt;
    let visible = true;
    let disposed = false;
    const glyphs = "01#/+=";
    const noise = (value: number) => {
      const number = Math.sin(value * 127.1 + 311.7) * 43758.5453;
      return number - Math.floor(number);
    };

    function draw(timestamp: number) {
      if (!context || !canvas || disposed) return;
      frame = 0;
      context.clearRect(0, 0, width, height);
      const elapsed = timestamp - startedAt;
      const progress = reducedMotion.matches ? 1 : Math.min(1, elapsed / 1050);
      const scatter = Math.pow(1 - progress, 3);
      pointer.x += (pointer.targetX - pointer.x) * 0.16;
      pointer.y += (pointer.targetY - pointer.y) * 0.16;
      context.font = `${Math.max(7, spacing * 0.92)}px monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      // Quiet signal marks surround the word, rather than covering the copy.
      for (let index = 0; index < 85; index++) {
        context.fillStyle = "rgba(255,190,79,0.16)";
        context.fillText(
          index % 3 ? "." : "+",
          noise(index + 14) * width,
          noise(index + 87) * height,
        );
      }
      for (const cell of cells) {
        let x = cell.x + (noise(cell.seed + 4) - 0.5) * width * scatter;
        let y = cell.y + (noise(cell.seed + 8) - 0.5) * height * 1.8 * scatter;
        const dx = cell.x - pointer.x;
        const dy = cell.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence = reducedMotion.matches
          ? 0
          : Math.max(0, 1 - distance / 115);
        if (distance > 0) {
          x += (dx / distance) * influence * influence * 34;
          y += (dy / distance) * influence * influence * 34;
        }
        const alpha = (0.68 + cell.strength * 0.32) * Math.min(1, progress * 3);
        context.fillStyle =
          influence > 0.3
            ? `rgba(255,244,213,${alpha})`
            : `rgba(255,190,79,${alpha})`;
        context.fillText(cell.glyph, x, y);
      }
      canvas.dataset.ready = "true";
      if (
        visible &&
        !document.hidden &&
        !reducedMotion.matches &&
        (progress < 1 || timestamp - lastInteraction < 650)
      ) {
        frame = requestAnimationFrame(draw);
      }
    }

    function wake() {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    }

    function resize() {
      if (!canvas || !context) return;
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const mask = document.createElement("canvas");
      mask.width = Math.round(width);
      mask.height = Math.round(height);
      const maskContext = mask.getContext("2d", { willReadFrequently: true });
      if (!maskContext) return;
      let fontSize = height * 1.25;
      maskContext.font = `900 ${fontSize}px Arial, sans-serif`;
      fontSize *= Math.min(
        1,
        (width * 0.94) / maskContext.measureText("MORI").width,
      );
      maskContext.font = `900 ${fontSize}px Arial, sans-serif`;
      maskContext.textAlign = "center";
      maskContext.textBaseline = "middle";
      maskContext.fillStyle = "white";
      maskContext.fillText("MORI", width / 2, height / 2 + fontSize * 0.07);
      const pixels = maskContext.getImageData(
        0,
        0,
        mask.width,
        mask.height,
      ).data;
      const columns = Math.min(158, Math.floor(width / 7));
      spacing = width / columns;
      cells = [];
      for (let y = spacing / 2; y < height; y += spacing * 1.15) {
        for (let x = spacing / 2; x < width; x += spacing) {
          const alpha =
            pixels[(Math.floor(y) * mask.width + Math.floor(x)) * 4 + 3];
          if (alpha > 90) {
            const seed = cells.length + 1;
            cells.push({
              x,
              y,
              glyph: glyphs[Math.floor(noise(seed) * glyphs.length)],
              strength: alpha / 255,
              seed,
            });
          }
        }
      }
      wake();
    }

    function move(event: PointerEvent) {
      if (!canvas || event.pointerType === "touch" || reducedMotion.matches)
        return;
      const bounds = canvas.getBoundingClientRect();
      pointer.targetX = event.clientX - bounds.left;
      pointer.targetY = event.clientY - bounds.top;
      lastInteraction = performance.now();
      wake();
    }
    function leave() {
      pointer.targetX = -1000;
      pointer.targetY = -1000;
      lastInteraction = performance.now();
      wake();
    }
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", wake);
    reducedMotion.addEventListener("change", wake);
    // The decorative HTML word remains visible until Canvas draws successfully.
    resize();
    startedAt = performance.now();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", wake);
      reducedMotion.removeEventListener("change", wake);
    };
  }, []);

  return (
    <div className="character-art">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="character-fallback" aria-hidden="true">
        MORI
      </div>
    </div>
  );
}
