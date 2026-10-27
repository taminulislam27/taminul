"use client";

import { useEffect } from "react";

// Small developer-themed chips that burst out of every click. Edit this list to change what appears.
const CHIPS = [
  { label: "C++", color: "#659ad2" },
  { label: "Java", color: "#f89820" },
  { label: "JS", color: "#f7df1e" },
  { label: "TS", color: "#5aa0ff" },
  { label: "React", color: "#61dafb" },
  { label: "Next.js", color: "#ffffff" },
  { label: "SQL", color: "#4fa3c7" },
  { label: "Git", color: "#f1602f" },
  { label: "HTML", color: "#e8643a" },
  { label: "CSS", color: "#3b9cff" },
  { label: "</>", color: "#38bdf8" },
  { label: "{ }", color: "#a78bfa" },
] as const;

const MAX_LIVE = 48; // never keep more than this many chips in the page at once
let live = 0;

/**
 * Click particle burst. Mounted once in the layout, it listens for clicks anywhere on the page
 * and creates a few short-lived chips at the pointer. Chips ignore the pointer, are hidden from
 * screen readers, animate with transform and opacity only, and remove themselves when finished.
 * Nothing happens when the visitor prefers reduced motion.
 */
export function ClickBurst() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onPointerDown = (e: PointerEvent) => {
      if (reduce.matches || e.button !== 0 || !e.isPrimary) return;

      const count = e.pointerType === "touch" ? 6 : 8;
      // A shuffled pick, so one click never shows the same chip twice.
      const picks = [...CHIPS].sort(() => Math.random() - 0.5).slice(0, count);
      const startAngle = Math.random() * Math.PI * 2;

      picks.forEach((chip, i) => {
        if (live >= MAX_LIVE) return;
        live += 1;

        const angle = startAngle + (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const distance = 55 + Math.random() * 50;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const rotate = (Math.random() - 0.5) * 50;

        const el = document.createElement("span");
        el.textContent = chip.label;
        el.setAttribute("aria-hidden", "true");
        el.style.cssText = [
          "position:fixed",
          `left:${e.clientX}px`,
          `top:${e.clientY}px`,
          "z-index:60",
          "pointer-events:none",
          "user-select:none",
          "will-change:transform,opacity",
          "padding:2px 7px",
          "border-radius:999px",
          "background:#0b1020",
          `border:1px solid ${chip.color}66`,
          `color:${chip.color}`,
          "font:700 11px/1.3 var(--font-mono, ui-monospace, monospace)",
          "white-space:nowrap",
        ].join(";");
        document.body.appendChild(el);

        // const duration = 600 + Math.random() * 300;
        const duration = 1200 + Math.random() * 600;
        const anim = el.animate(
          [
            { transform: "translate(-50%,-50%) scale(0.4) rotate(0deg)", opacity: 1 },
            { transform: `translate(calc(-50% + ${dx * 0.7}px), calc(-50% + ${dy * 0.7}px)) scale(1) rotate(${rotate * 0.6}deg)`, opacity: 1, offset: 0.45 },
            { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 14}px)) scale(0.5) rotate(${rotate}deg)`, opacity: 0 },
          ],
          { duration, easing: "cubic-bezier(0.22, 0.8, 0.3, 1)", fill: "forwards" },
        );
        const done = () => {
          el.remove();
          live = Math.max(0, live - 1);
        };
        anim.onfinish = done;
        anim.oncancel = done;
      });
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return null;
}
