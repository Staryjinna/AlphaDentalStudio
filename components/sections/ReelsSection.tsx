"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TabsBar } from "../TabsBar";
import { ReelCard } from "../ReelCard";
import { ActionLink } from "../ActionLink";
import { reels } from "@/content/reels";
import { site } from "@/content/site";

type Kind = "story" | "tip";

/** Patient stories and dental tips from the clinic's Instagram: tabbed, swipeable, tap to play. */
export function ReelsSection({ initial = "story" }: { initial?: Kind }) {
  const [kind, setKind] = useState<Kind>(initial);
  const items = reels.filter((r) => r.kind === kind);
  const [ref, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);

  const sync = useCallback(() => {
    if (!api) return;
    setI(api.selectedScrollSnap());
    setPrev(api.canScrollPrev());
    setNext(api.canScrollNext());
  }, [api]);
  useEffect(() => { if (!api) return; sync(); api.on("select", sync).on("reInit", sync); }, [api, sync]);
  useEffect(() => { api?.reInit(); api?.scrollTo(0, true); }, [kind, api]);

  const snaps = api?.scrollSnapList().length ?? items.length;
  const btn = "flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-cocoa/50 text-cocoa transition-colors hover:bg-cocoa hover:text-white disabled:opacity-30";

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <TabsBar label="Video type" value={kind} onChange={(k) => setKind(k as Kind)} tabs={[{ id: "story", label: "Patient stories" }, { id: "tip", label: "Dental tips" }]} />
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => api?.scrollPrev()} disabled={!prev} aria-label="Previous videos"><ArrowLeft size={20} aria-hidden /></button>
          <button type="button" className={btn} onClick={() => api?.scrollNext()} disabled={!next} aria-label="Next videos"><ArrowRight size={20} aria-hidden /></button>
        </div>
      </div>

      <div ref={ref} className="-mx-5 mt-8 overflow-hidden px-5 md:-mx-10 md:px-10" aria-roledescription="carousel" aria-label={kind === "story" ? "Patient stories" : "Dental tips"} role="tabpanel">
        <ul className="flex gap-4 md:gap-5">
          {items.map((r) => (
            <li key={r.id} className={`shrink-0 ${kind === "story" ? "w-[74vw] sm:w-[22rem]" : "w-[60vw] sm:w-[17rem]"}`}>
              <ReelCard reel={r} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" aria-hidden>
          {Array.from({ length: snaps }).map((_, k) => <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-cocoa" : "w-2 bg-cocoa/25"}`} />)}
          <span className="ml-2 text-sm text-muted md:hidden">Swipe for more →</span>
        </div>
        <ActionLink href={site.social.instagram} variant="secondary" arrow className="!min-h-11">Follow @alphadentalstudios</ActionLink>
      </div>
      <p className="mt-4 text-sm text-muted">Videos play from Instagram when you tap them. Dental tips are general information and not a substitute for an in-person examination.</p>
    </div>
  );
}
