"use client";

import { useEffect, useRef } from "react";

const BASE_SIZE = 15;
const HOVER_SIZE = 40;
const LERP_SPEED = 0.15;
const CONVERGE_THRESHOLD = 0.5;

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const raf = useRef<number>(0);
  const moving = useRef(false);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const el = dotRef.current;
    if (!el) return;

    function tick() {
      const dx = pos.current.x - current.current.x;
      const dy = pos.current.y - current.current.y;

      // Stop the loop when cursor has converged
      if (Math.abs(dx) < CONVERGE_THRESHOLD && Math.abs(dy) < CONVERGE_THRESHOLD && !moving.current) {
        current.current.x = pos.current.x;
        current.current.y = pos.current.y;
        raf.current = 0;
        return;
      }

      current.current.x += dx * LERP_SPEED;
      current.current.y += dy * LERP_SPEED;

      const scale = hovering.current ? HOVER_SIZE / BASE_SIZE : 1;
      const half = (BASE_SIZE * scale) / 2;

      // Only transform + scale — no width/height (avoids layout thrashing)
      el!.style.transform = `translate3d(${current.current.x - half}px, ${current.current.y - half}px, 0) scale(${scale})`;
      el!.style.opacity = hovering.current ? "0.35" : "0.15";

      moving.current = false;
      raf.current = requestAnimationFrame(tick);
    }

    function startLoop() {
      if (!raf.current) {
        raf.current = requestAnimationFrame(tick);
      }
    }

    function onMove(e: MouseEvent) {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      moving.current = true;
      el!.style.display = "block";

      // Check hover state via CSS matching (cheaper than .closest() traversal)
      const target = e.target as HTMLElement;
      hovering.current = target.matches(
        'a, a *, button, button *, [role="button"], [role="button"] *, input, textarea, select'
      );

      startLoop();
    }

    function onLeave() {
      el!.style.display = "none";
      moving.current = false;
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed pointer-events-none z-50"
      style={{
        display: "none",
        width: BASE_SIZE,
        height: BASE_SIZE,
        willChange: "transform",
        background:
          "radial-gradient(circle, rgba(37,99,235,0.3), transparent)",
        borderRadius: "50%",
        transition: "opacity 0.2s",
      }}
    />
  );
}
