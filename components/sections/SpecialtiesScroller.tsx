"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { specialties } from "@/content/specialties";

/**
 * Pinned horizontal scroll on large screens (vertical scrolling drives the track sideways).
 * On phones and tablets it is a native swipe carousel with snap.
 */
export function SpecialtiesScroller({ header }: { header: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [pinned, setPinned] = useState(false);
  const [dist, setDist] = useState(0);
  const [swipe, setSwipe] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const measure = () => {
      setPinned(mq.matches);
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 80));
    };
    measure();
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => { mq.removeEventListener("change", measure); window.removeEventListener("resize", measure); };
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={outer} style={pinned ? { height: `${100 + dist / 8}vh` } : undefined} className="relative">
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden pt-20" : ""}>
        <div className="container-page mb-10 lg:mb-0">{header}</div>
        <motion.ul
          ref={track}
          onScroll={(e) => { if (!pinned) { const el = e.currentTarget; setSwipe(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)); } }}
          style={pinned ? { x } : undefined}
          className={`flex gap-5 ${pinned ? "pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))] pr-10" : "no-scrollbar snap-x snap-mandatory overflow-x-auto px-5 pb-4 md:px-10"}`}
        >
          {specialties.map((s) => (
            <li key={s.n} className="w-[78vw] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]">
              <Link href={s.href} className="group relative block aspect-[4/5] overflow-hidden rounded-[2rem] bg-cocoa">
                <Image src={s.image} alt={s.alt} fill sizes="(min-width:1024px) 384px, 78vw" className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-110" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/40 to-transparent" />
                <span className="absolute left-6 top-5 text-sm font-semibold tracking-widest text-peach">{s.n}</span>
                <span className="absolute right-5 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-cocoa transition-all duration-300 group-hover:rotate-45 group-hover:bg-peach"><ArrowUpRight size={18} aria-hidden /></span>
                <span className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="block text-2xl font-semibold leading-tight">{s.title}</span>
                  <span className="mt-2 block text-[0.95rem] leading-relaxed text-white/80">{s.blurb}</span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {s.items.slice(0, 3).map((i) => <span key={i} className="rounded-full border border-white/30 px-3 py-0.5 text-xs">{i}</span>)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </motion.ul>
        {!pinned && (
          <div className="container-page mt-4 flex items-center gap-4" aria-hidden>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-cocoa/15"><div className="h-full rounded-full bg-brown transition-[width]" style={{ width: `${Math.max(12, swipe * 100)}%` }} /></div>
            <span className="text-sm font-medium text-muted">Swipe →</span>
          </div>
        )}
        {pinned && (
          <div className="container-page"><div className="h-0.5 w-full bg-cocoa/15"><motion.div style={{ width: bar }} className="h-full bg-brown" /></div></div>
        )}
      </div>
    </div>
  );
}
