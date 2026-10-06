"use client";
import { motion } from "motion/react";
import { useId, useRef } from "react";

export type Tab = { id: string; label: string; icon?: React.ReactNode };

/** Pill tab bar with a sliding indicator; scrolls horizontally on small screens. Arrow keys move between tabs. */
export function TabsBar({ tabs, value, onChange, label, dark = false, className = "" }: { tabs: Tab[]; value: string; onChange: (id: string) => void; label: string; dark?: boolean; className?: string }) {
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const n = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    onChange(tabs[n].id);
    refs.current[n]?.focus();
  };
  return (
    <div className={`no-scrollbar -mx-5 -my-3 overflow-x-auto px-5 py-3 md:mx-0 md:px-0 ${className}`}>
      <div role="tablist" aria-label={label} className={`inline-flex min-w-max gap-1 rounded-full p-1.5 ${dark ? "bg-white/10" : "bg-sand"}`}>
        {tabs.map((t, i) => {
          const active = t.id === value;
          return (
            <button
              key={t.id} ref={(el) => { refs.current[i] = el; }} role="tab" id={`${uid}-${t.id}`}
              aria-selected={active} tabIndex={active ? 0 : -1}
              onClick={() => onChange(t.id)} onKeyDown={(e) => onKey(e, i)}
              className={`relative inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full px-5 text-[0.95rem] font-semibold transition-colors ${active ? (dark ? "text-cocoa" : "text-white") : dark ? "text-white/85 hover:text-white" : "text-cocoa hover:text-brown"}`}
            >
              {active && <motion.span layoutId={`${uid}-pill`} className={`absolute inset-0 rounded-full shadow-md ${dark ? "bg-peach" : "bg-cocoa"}`} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className="relative z-10 inline-flex items-center gap-2">{t.icon}{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
