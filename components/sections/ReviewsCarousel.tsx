"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

export type ReviewItem = { name: string; date: string; rating: number; text: string };

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
const initial = (n: string) => n.replace(/^Dr\.?\s*/i, "").trim()[0]?.toUpperCase() ?? "?";

function Card({ r }: { r: ReviewItem }) {
  const [open, setOpen] = useState(false);
  const long = r.text.length > 210;
  return (
    <figure className="flex h-full flex-col rounded-[1.75rem] border border-cocoa/10 bg-white p-5 shadow-[0_18px_40px_-28px_rgb(62_38_16/.45)]">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-peach text-lg font-semibold text-cocoa" aria-hidden>{initial(r.name)}</span>
        <div className="min-w-0">
          <figcaption className="truncate font-semibold text-cocoa">{r.name}</figcaption>
          <p className="text-xs text-muted">{fmt(r.date)} · Google review</p>
        </div>
      </div>
      <div className="mt-3 flex gap-0.5" role="img" aria-label={`${r.rating} out of 5 stars`}>{Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={16} className="fill-[#F5B301] text-[#F5B301]" aria-hidden />)}</div>
      <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-ink">
        {open || !long ? r.text : `${r.text.slice(0, 210).trim()}…`}
      </blockquote>
      {long && <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="mt-2 self-start py-1 text-sm font-semibold text-brown underline underline-offset-4">{open ? "Show less" : "Read more"}</button>}
    </figure>
  );
}

/** Swipeable review cards (Embla). */
export function ReviewsCarousel({ reviews }: { reviews: ReviewItem[] }) {
  const [ref, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const [i, setI] = useState(0);
  const sync = useCallback(() => { if (!api) return; setPrev(api.canScrollPrev()); setNext(api.canScrollNext()); setI(api.selectedScrollSnap()); }, [api]);
  useEffect(() => { if (!api) return; sync(); api.on("select", sync).on("reInit", sync); }, [api, sync]);
  const btn = "flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-cocoa/50 text-cocoa transition-colors hover:bg-cocoa hover:text-white disabled:opacity-30";
  const snaps = api?.scrollSnapList().length ?? reviews.length;
  return (
    <div>
      <div ref={ref} className="-mx-[1.1rem] overflow-hidden px-[1.1rem] md:-mx-8 md:px-8" aria-roledescription="carousel" aria-label="Google reviews">
        <ul className="flex items-stretch gap-4">
          {reviews.map((r) => <li key={r.name + r.date} className="w-[84vw] shrink-0 sm:w-[22rem]"><Card r={r} /></li>)}
        </ul>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5" aria-hidden>
          {Array.from({ length: snaps }).map((_, k) => <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-7 bg-cocoa" : "w-1.5 bg-cocoa/25"}`} />)}
        </div>
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => api?.scrollPrev()} disabled={!prev} aria-label="Previous reviews"><ArrowLeft size={18} aria-hidden /></button>
          <button type="button" className={btn} onClick={() => api?.scrollNext()} disabled={!next} aria-label="Next reviews"><ArrowRight size={18} aria-hidden /></button>
        </div>
      </div>
    </div>
  );
}
