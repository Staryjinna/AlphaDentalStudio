"use client";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { DoctorAvatar } from "../DoctorAvatar";
import type { Doctor } from "@/content/doctors";

/** Draggable carousel (Embla): inertia, snap, arrows, gentle autoplay that stops on interaction. */
export function DoctorCarousel({ doctors, dark = false }: { doctors: Doctor[]; dark?: boolean }) {
  const [ref, api] = useEmblaCarousel({ align: "start", loop: false, dragFree: false, containScroll: "trimSnaps" }, [Autoplay({ delay: 4200, stopOnInteraction: true, stopOnMouseEnter: true })]);
  const [canPrev, setPrev] = useState(false);
  const [canNext, setNext] = useState(true);
  const upd = useCallback(() => { if (!api) return; setPrev(api.canScrollPrev()); setNext(api.canScrollNext()); }, [api]);
  useEffect(() => { if (!api) return; upd(); api.on("select", upd).on("reInit", upd); }, [api, upd]);

  const btn = `flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] transition-colors disabled:opacity-30 ${dark ? "border-white/50 text-white hover:bg-white hover:text-cocoa" : "border-cocoa/50 text-cocoa hover:bg-cocoa hover:text-white"}`;
  return (
    <div>
      <div className="mb-5 flex justify-end gap-2">
        <button type="button" className={btn} onClick={() => api?.scrollPrev()} disabled={!canPrev} aria-label="Previous doctors"><ArrowLeft size={20} aria-hidden /></button>
        <button type="button" className={btn} onClick={() => api?.scrollNext()} disabled={!canNext} aria-label="Next doctors"><ArrowRight size={20} aria-hidden /></button>
      </div>
      <div ref={ref} className="-mx-5 overflow-hidden px-5 md:-mx-10 md:px-10" aria-roledescription="carousel" aria-label="Our doctors">
        <ul className="flex gap-5">
          {doctors.map((d) => (
            <li key={d.slug} className="w-[74vw] shrink-0 sm:w-[300px]">
              <Link href={`/doctors/${d.slug}`} className="card card-hover group block h-full overflow-hidden">
                <DoctorAvatar doctor={d} className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-[1.04]" sizes="300px" />
                <div className="p-5">
                  <h3>{d.name}</h3>
                  <p className="mt-0.5 text-sm font-semibold text-tan-deep">{d.degrees}</p>
                  <p className="mt-2 text-base text-muted">{d.role}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-cocoa">View profile <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
