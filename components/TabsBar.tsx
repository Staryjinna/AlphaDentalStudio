"use client";
import { motion } from "motion/react";
import { useId, useRef } from "react";

export type Tab = { id: string; label: string; icon?: React.ReactNode };

/** Pill tab bar with a sliding indicator; scrolls horizontally on small screens. Arrow keys move between tabs. */
export function TabsBar({ tabs, value, onChange, label, dark = false, className = "", trailing }: { tabs: Tab[]; value: string; onChange: (id: string) => void; label: string; dark?: boolean; className?: string; trailing?: React.ReactNode }) {
  const many = tabs.length > 3; // many tabs: tidy icon grid on small screens; few tabs: simple pills
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
    <div className={className}>
      <div
        role="tablist" aria-label={label}
        className={`${many ? "grid grid-cols-4 gap-2 md:grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] xl:inline-flex xl:gap-1" : "inline-flex gap-1"} rounded-[1.5rem] p-1.5 xl:rounded-full ${dark ? "bg-white/10" : "bg-sand"}`}
      >
        {tabs.map((t, i) => {
          const active = t.id === value;
          return (
            <button
              key={t.id} ref={(el) => { refs.current[i] = el; }} role="tab" id={`${uid}-${t.id}`}
              aria-selected={active} tabIndex={active ? 0 : -1}
              onClick={() => onChange(t.id)} onKeyDown={(e) => onKey(e, i)}
              className={`relative flex items-center justify-center rounded-2xl text-center font-semibold transition-colors xl:rounded-full ${many ? "min-h-[4.25rem] flex-col gap-1 px-1 py-2 text-[0.72rem] leading-tight md:flex-row md:gap-2 md:px-4 md:text-[0.9rem] xl:min-h-12 xl:whitespace-nowrap xl:px-5 xl:text-[0.95rem]" : "min-h-12 gap-2 whitespace-nowrap rounded-full px-5 text-[0.92rem]"} ${active ? (dark ? "text-cocoa" : "text-white") : dark ? "text-white/85 hover:text-white" : "text-cocoa hover:text-brown"}`}
            >
              {active && <motion.span layoutId={`${uid}-pill`} className={`absolute inset-0 rounded-2xl shadow-md xl:rounded-full ${dark ? "bg-peach" : "bg-cocoa"}`} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className={`relative z-10 flex items-center justify-center ${many ? "flex-col gap-1 md:flex-row md:gap-2" : "gap-2"}`}>{t.icon}<span>{t.label}</span></span>
            </button>
          );
        })}
        {trailing && <div className="contents md:hidden">{trailing}</div>}
      </div>
    </div>
  );
}
