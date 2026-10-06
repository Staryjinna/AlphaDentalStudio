"use client";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";

/** 3D perspective tilt with a moving glare. Falls back to a plain card for reduced motion / touch. */
export function TiltCard({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(260px circle at ${gx}% ${gy}%, rgb(255 255 255 / .35), transparent 60%)`;
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div style={{ perspective: 900 }} className="h-full">
      <motion.div
        className={`relative h-full [transform-style:preserve-3d] ${className}`}
        style={{ rotateX: rx, rotateY: ry }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry.set((px - 0.5) * max * 2);
          rx.set(-(py - 0.5) * max * 2);
          gx.set(px * 100);
          gy.set(py * 100);
        }}
        onPointerLeave={() => { rx.set(0); ry.set(0); gx.set(50); gy.set(50); }}
      >
        {children}
        <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity [.group:hover_&]:opacity-100" style={{ background: glare }} />
      </motion.div>
    </div>
  );
}
