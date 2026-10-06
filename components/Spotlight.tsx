"use client";
import { useRef, type ReactNode } from "react";

/** Dark section wrapper whose soft light follows the cursor (see .spotlight in globals.css). */
export function Spotlight({ children, className = "", as: Tag = "section" }: { children: ReactNode; className?: string; as?: "section" | "div" }) {
  const ref = useRef<HTMLElement & HTMLDivElement>(null);
  return (
    <Tag
      ref={ref}
      className={`spotlight relative ${className}`}
      onPointerMove={(e: React.PointerEvent) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </Tag>
  );
}
