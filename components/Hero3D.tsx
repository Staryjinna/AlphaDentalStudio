"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const ToothScene = dynamic(() => import("./ToothScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Mounts the 3D tooth after the page is idle, only if WebGL works; renders only while on screen. */
export function Hero3D({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!hasWebGL()) return;
    const t = window.setTimeout(() => setMounted(true), 700); // after first paint, keeps LCP clean
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden>
      {mounted && <ToothScene active={visible} still={!!reduce} />}
    </div>
  );
}
