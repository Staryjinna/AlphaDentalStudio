"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TabsBar } from "../TabsBar";
import { TreatmentCard } from "../TreatmentCard";
import { GroupIcon } from "../GroupIcon";
import { treatmentGroups } from "@/content/treatment-groups";
import { treatments } from "@/content/treatments";

const needs = [
  { label: "Tooth pain", href: "/treatments/root-canal-treatment" },
  { label: "Missing tooth", href: "/treatments/dental-implants" },
  { label: "Crooked teeth", href: "/treatments/invisalign-clear-aligners" },
  { label: "Whiter smile", href: "/treatments/teeth-whitening" },
  { label: "Bleeding gums", href: "/treatments/gum-treatment" },
  { label: "Jaw pain", href: "/treatments/tmj-jaw-pain" },
  { label: "Child's check-up", href: "/treatments/kids-dentistry" },
];

export function TreatmentFinder() {
  const [group, setGroup] = useState(treatmentGroups[0].id);
  const g = treatmentGroups.find((x) => x.id === group)!;
  const items = treatments.filter((t) => t.group === group);

  return (
    <div>
      <TabsBar
        label="Treatment groups"
        value={group}
        onChange={setGroup}
        tabs={treatmentGroups.map((x) => ({ id: x.id, label: x.title, icon: <GroupIcon id={x.id} size={17} /> }))}
      />

      <div className="mt-8 min-h-[22rem]" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <p className="max-w-xl text-lg text-muted">{g.blurb}</p>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((t) => (
                <li key={t.slug}><TreatmentCard t={t} /></li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10">
        <p className="font-heading text-xl font-semibold text-brand-900">What do you need help with?</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {needs.map((n) => (
            <li key={n.label}>
              <Link href={n.href} className="inline-flex min-h-12 items-center rounded-full border border-brand-900/20 bg-white px-5 text-base font-medium text-brand-900 transition-all hover:-translate-y-0.5 hover:border-brand-900 hover:bg-brand-900 hover:text-white hover:shadow-lg">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
