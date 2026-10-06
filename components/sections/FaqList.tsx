"use client";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { Faq } from "@/content/treatments";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`overflow-hidden rounded-3xl border transition-all ${isOpen ? "border-transparent bg-white shadow-lg shadow-cocoa/10" : "border-cocoa/10 bg-white/60"}`}>
            <h3 className="!text-base !font-semibold">
              <button type="button" aria-expanded={isOpen} aria-controls={`${uid}-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-4 text-left text-lg font-semibold text-cocoa">
                {f.q}
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-cocoa text-white" : "bg-sand text-cocoa"}`}><Plus size={18} aria-hidden /></span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`${uid}-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                  <p className="px-6 pb-6 text-base text-muted">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
