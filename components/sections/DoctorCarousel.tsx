"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { DoctorAvatar } from "../DoctorAvatar";
import { TiltCard } from "../TiltCard";
import type { Doctor } from "@/content/doctors";

export function DoctorCarousel({ doctors, dark = false }: { doctors: Doctor[]; dark?: boolean }) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  const btn = `flex h-12 w-12 items-center justify-center rounded-full transition-colors ${dark ? "glass-dark text-white hover:bg-white/20" : "border border-brand-900/20 bg-white text-brand-900 hover:bg-brand-900 hover:text-white"}`;
  return (
    <div>
      <div className="mb-5 flex justify-end gap-2">
        <button type="button" className={btn} onClick={() => scroll(-1)} aria-label="Previous doctors"><ArrowLeft size={20} aria-hidden /></button>
        <button type="button" className={btn} onClick={() => scroll(1)} aria-label="Next doctors"><ArrowRight size={20} aria-hidden /></button>
      </div>
      <ul
        ref={ref}
        tabIndex={0}
        aria-label="Our doctors"
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-6 md:-mx-8 md:px-8 [mask-image:linear-gradient(90deg,transparent,#000_3%,#000_94%,transparent)]"
      >
        {doctors.map((d) => (
          <li key={d.slug} className="w-[72vw] shrink-0 snap-start sm:w-[300px]">
            <TiltCard className={`group card overflow-hidden ${dark ? "!border-white/10 !bg-white/5" : ""}`}>
              <Link href={`/doctors/${d.slug}`} className="block">
                <DoctorAvatar doctor={d} className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-[1.03]" sizes="300px" />
                <div className="relative p-5">
                  <h3 className={dark ? "!text-white" : ""}>{d.name}</h3>
                  <p className={`mt-0.5 text-sm font-semibold ${dark ? "text-champagne" : "text-brand-600"}`}>{d.degrees}</p>
                  <p className={`mt-2 text-base ${dark ? "text-white/80" : "text-muted"}`}>{d.role}</p>
                  <span className={`mt-4 inline-flex items-center gap-1.5 font-semibold ${dark ? "text-white" : "text-brand-900"}`}>View profile <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                </div>
              </Link>
            </TiltCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
