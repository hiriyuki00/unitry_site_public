"use client";

import { useEffect, useRef } from "react";

type TrailPoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  radius: number;
};

const SPAWN_INTERVAL_MS = 16;
const MAX_POINTS = 24;

export default function LiquidCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pointerFine || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let lastSpawn = 0;
    let isActive = false;
    let isPaused = false;
    let pointerX = width / 2;
    let pointerY = height / 2;
    let cursorScale = 0;
    const trail: TrailPoint[] = [];
    const iframeListeners: Array<{
      el: HTMLIFrameElement;
      enter: () => void;
      leave: () => void;
    }> = [];
    let observer: MutationObserver | null = null;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnPoint = (x: number, y: number, strength = 1) => {
      if (trail.length >= MAX_POINTS) trail.shift();
      const speed = 0.25 + Math.random() * 0.45;
      const angle = Math.random() * Math.PI * 2;
      trail.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 56 + Math.random() * 24,
        radius: (8 + Math.random() * 8) * strength,
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      isActive = true;
    };

    const onPointerLeave = () => {
      isActive = false;
    };

    const setPaused = (paused: boolean) => {
      isPaused = paused;
      if (paused) {
        isActive = false;
        trail.length = 0;
        document.body.classList.remove("cursor-dot-mode");
      } else {
        document.body.classList.add("cursor-dot-mode");
      }
    };

    const bindIframeHoverPause = () => {
      const iframes = Array.from(document.querySelectorAll("iframe"));
      for (const iframe of iframes) {
        if (iframeListeners.some((item) => item.el === iframe)) continue;
        const onEnter = () => setPaused(true);
        const onLeave = () => setPaused(false);
        iframe.addEventListener("mouseenter", onEnter);
        iframe.addEventListener("mouseleave", onLeave);
        iframeListeners.push({ el: iframe, enter: onEnter, leave: onLeave });
      }
    };

    const animate = (t: number) => {
      if (isPaused) {
        ctx.clearRect(0, 0, width, height);
        rafRef.current = window.requestAnimationFrame(animate);
        return;
      }

      const deltaActive = isActive ? 0.2 : -0.12;
      cursorScale = Math.min(1, Math.max(0, cursorScale + deltaActive));

      if (isActive && t - lastSpawn > SPAWN_INTERVAL_MS) {
        spawnPoint(pointerX, pointerY, 1);
        lastSpawn = t;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      // Cursor dot
      if (cursorScale > 0.01) {
        ctx.fillStyle = "rgba(235, 77, 74, 0.9)";
        ctx.beginPath();
        ctx.arc(pointerX, pointerY, 6 * cursorScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Liquid trail
      for (let i = trail.length - 1; i >= 0; i -= 1) {
        const p = trail[i];
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        const lifeRatio = 1 - p.life / p.maxLife;
        if (lifeRatio <= 0) {
          trail.splice(i, 1);
          continue;
        }

        const r = p.radius * 0.42 * lifeRatio;
        ctx.fillStyle = `rgba(235, 77, 74, ${0.16 * lifeRatio})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    resize();
    document.body.classList.add("cursor-dot-mode");
    bindIframeHoverPause();
    observer = new MutationObserver(() => {
      bindIframeHoverPause();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("cursor-dot-mode");
      for (const item of iframeListeners) {
        item.el.removeEventListener("mouseenter", item.enter);
        item.el.removeEventListener("mouseleave", item.leave);
      }
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}
