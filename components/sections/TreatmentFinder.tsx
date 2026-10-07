"use client";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TabsBar } from "../TabsBar";
import { GroupIcon } from "../GroupIcon";
import { TreatmentCard } from "../TreatmentCard";
import { treatmentGroups } from "@/content/treatment-groups";
import { treatments } from "@/content/treatments";

export function TreatmentFinder() {
  const [group, setGroup] = useState(treatmentGroups[0].id);
  const g = treatmentGroups.find((x) => x.id === group)!;
  const items = treatments.filter((t) => t.group === group);
  return (
    <div>
      <TabsBar label="Treatment groups" value={group} onChange={setGroup} tabs={treatmentGroups.map((x) => ({ id: x.id, label: x.title, icon: <GroupIcon id={x.id} size={18} /> }))}
        trailing={<Link href="/treatments" className="flex min-h-[4.25rem] flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-cocoa/40 px-1 py-2 text-center text-[0.72rem] font-semibold leading-tight text-cocoa"><LayoutGrid size={18} aria-hidden /><span>See all</span></Link>}
      />
      <div className="mt-6 min-h-[20rem]" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div key={group} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
            <p className="max-w-xl text-lg text-muted">{g.blurb}</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((t) => <li key={t.slug}><TreatmentCard t={t} /></li>)}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
