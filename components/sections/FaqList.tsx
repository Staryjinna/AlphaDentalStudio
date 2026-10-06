"use client";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { Faq } from "@/content/treatments";

export function FaqList({ faqs, dark = false }: { faqs: Faq[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`overflow-hidden rounded-2xl border transition-colors ${dark ? "glass-dark" : "border-ink/10 bg-white"} ${isOpen && !dark ? "shadow-lg shadow-ink/5" : ""}`}>
            <h3 className="!text-base !font-semibold">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-lg font-semibold ${dark ? "text-white" : "text-brand-900"}`}
              >
                {f.q}
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isOpen ? "rotate-45" : ""} ${dark ? "bg-white/15 text-white" : "bg-brand-100 text-brand-600"}`}><Plus size={18} aria-hidden /></span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-${i}`}
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className={`px-5 pb-5 text-base ${dark ? "text-white/80" : "text-muted"}`}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
