"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LayoutGrid } from "lucide-react";
import { TabsBar } from "../TabsBar";
import { GroupIcon } from "../GroupIcon";
import { TreatmentCard } from "../TreatmentCard";
import { treatmentGroups } from "@/content/treatment-groups";
import { treatments } from "@/content/treatments";

/** Hub grid with a pill filter. Honours #group links from the footer and old URLs. */
export function TreatmentsHub() {
  const [group, setGroup] = useState("all");
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (treatmentGroups.some((g) => g.id === h)) setGroup(h);
  }, []);
  const shown = group === "all" ? treatments : treatments.filter((t) => t.group === group);
  return (
    <div>
      <TabsBar label="Filter treatments" value={group} onChange={setGroup} tabs={[{ id: "all", label: "All", icon: <LayoutGrid size={16} aria-hidden /> }, ...treatmentGroups.map((g) => ({ id: g.id, label: g.title, icon: <GroupIcon id={g.id} size={16} /> }))]} />
      <AnimatePresence mode="wait">
        <motion.ul key={group} role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t) => <li key={t.slug}><TreatmentCard t={t} /></li>)}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
