"use client";
import Link from "next/link";
import { animate, motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SplitWords, Reveal } from "../Reveal";
import { SpecialtyCard } from "./SpecialtyCard";
import { specialties } from "@/content/specialties";

const N = specialties.length;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Position of a card on the arc, given its (fractional) distance d from the centre. */
function arc(d: number, step: number) {
  const a = Math.abs(d);
  const y = a <= 1 ? 12 * a : a <= 2 ? 12 + 36 * (a - 1) : 48 + 24 * clamp(a - 2, 0, 1);
  const z = -110 * clamp(a, 0, 1) - 110 * clamp(a - 1, 0, 1);
  const rot = -12 * clamp(d, -1, 1);
  const sc = 1 - 0.15 * clamp(a, 0, 1);
  const opacity = a <= 1 ? 1 : a <= 2 ? 1 - 0.9 * (a - 1) : clamp(0.1 - 0.1 * (a - 2), 0, 0.1);
  return { transform: `translate3d(${d * step}px, ${y}px, ${z}px) rotateY(${rot}deg) scale(${sc})`, opacity, dim: 0.4 * clamp(a, 0, 1), z: 100 - Math.round(a * 10) };
}

function ArcCard({ i, pos, step, width, active, onGo, onCardClick }: { i: number; pos: MotionValue<number>; step: number; width: number; active: number; onGo: (i: number) => void; onCardClick: (i: number, e: React.MouseEvent) => void }) {
  const transform = useTransform(pos, (p) => arc(i - p, step).transform);
  const opacity = useTransform(pos, (p) => arc(i - p, step).opacity);
  const dim = useTransform(pos, (p) => arc(i - p, step).dim);
  const zIndex = useTransform(pos, (p) => arc(i - p, step).z);
  const events = useTransform(pos, (p) => (Math.abs(i - p) < 2.5 ? "auto" : "none"));
  return (
    <motion.li
      data-i={i} style={{ transform, opacity, zIndex, pointerEvents: events, width, marginLeft: -width / 2 }}
      className="absolute left-1/2 top-0 will-change-transform"
    >
      <SpecialtyCard s={specialties[i]} onFocus={() => onGo(i)} onClick={(e) => onCardClick(i, e)} priority={i < 3} />
      <motion.span aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-cream" />
    </motion.li>
  );
}

export function SpecialtiesSection() {
  const wrap = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [arcMode, setArcMode] = useState(false);
  const [w, setW] = useState(1200);
  const drag = useRef({ down: false, x: 0, p: 0, moved: false, lastX: 0, v: 0 });
  const cursor = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState("Drag");
  const [swipe, setSwipe] = useState(0);

  const cardW = clamp(w * 0.32, 250, 336);
  const step = cardW + 10;
  const cardH = (cardW * 5.3) / 4;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const on = () => setArcMode(mq.matches);
    on();
    mq.addEventListener("change", on);
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    if (wrap.current) ro.observe(wrap.current);
    return () => { mq.removeEventListener("change", on); ro.disconnect(); };
  }, []);

  const goTo = useCallback((i: number) => {
    const t = clamp(Math.round(i), 0, N - 1);
    setActive(t);
    animate(pos, t, { type: "spring", stiffness: 130, damping: 20 });
  }, [pos]);

  // drag: window listeners (no pointer capture, so link clicks still work)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { down: true, x: e.clientX, p: pos.get(), moved: false, lastX: e.clientX, v: 0 };
    const move = (ev: PointerEvent) => {
      const d = drag.current;
      if (!d.down) return;
      const dx = ev.clientX - d.x;
      if (Math.abs(dx) > 6) d.moved = true;
      d.v = ev.clientX - d.lastX; d.lastX = ev.clientX;
      if (d.moved) pos.set(clamp(d.p - dx / step, -0.4, N - 0.6));
    };
    const up = () => {
      const d = drag.current;
      d.down = false;
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up);
      if (d.moved) goTo(pos.get() - d.v / step * 4);
    };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
  };
  // A click on a side card brings it to the centre; only the centred card navigates. A drag never navigates.
  const onCardClick = (i: number, e: React.MouseEvent) => {
    if (drag.current.moved) { e.preventDefault(); drag.current.moved = false; return; }
    if (i !== active) { e.preventDefault(); goTo(i); }
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!cursor.current || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    cursor.current.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px) translate(-50%, -50%)`;
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-i]");
    setCursorLabel(card && Number(card.dataset.i) === active ? "Explore ↗" : "Drag");
  };

  const arrows = (
    <div className="hidden gap-2 md:flex">
      <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous specialty" className="flex h-11 w-11 items-center justify-center rounded-full border border-cocoa/25 bg-white text-cocoa shadow-sm transition-all hover:bg-cocoa hover:text-white disabled:opacity-35"><ArrowLeft size={18} aria-hidden /></button>
      <button type="button" onClick={() => goTo(active + 1)} disabled={active === N - 1} aria-label="Next specialty" className="flex h-11 w-11 items-center justify-center rounded-full border border-cocoa/25 bg-white text-cocoa shadow-sm transition-all hover:bg-cocoa hover:text-white disabled:opacity-35"><ArrowRight size={18} aria-hidden /></button>
    </div>
  );

  return (
    <section id="specialties" className="relative overflow-x-clip py-20" aria-labelledby="spec">
      <div className="container-page">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5">
          <div className="max-w-2xl">
            <Reveal><div aria-hidden className="mb-5 h-px w-40 origin-left bg-cocoa/30" /></Reveal>
            <Reveal><p className="eyebrow flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brown" /> Our specialties</p></Reveal>
            <h2 id="spec" className="mt-4 !text-[clamp(2rem,4.4vw,3.4rem)]" aria-label="Built around every part of your smile.">
              <SplitWords text="Built around every part of your" /> <em className="font-medium italic text-brown"><SplitWords text="smile." delay={0.35} /></em>
            </h2>
            <Reveal delay={0.2}><p className="mt-4 text-lg text-muted">Nine areas of dentistry, one team: from everyday care to specialist treatment.</p></Reveal>
          </div>
          {arrows}
        </div>
      </div>

      {arcMode ? (
        <div
          ref={wrap} role="group" aria-roledescription="carousel" aria-label="Specialties" tabIndex={0}
          onPointerDown={onPointerDown} onKeyDown={onKeyDown} onMouseMove={onMouseMove}
          onMouseEnter={() => cursor.current && (cursor.current.style.opacity = "1")} onMouseLeave={() => cursor.current && (cursor.current.style.opacity = "0")}
          className="relative mt-8 cursor-grab touch-pan-y active:cursor-grabbing [@media(hover:hover)]:cursor-none"
          style={{ height: cardH + 90, perspective: 1500 }}
        >
          <ul>
            {specialties.map((_, i) => <ArcCard key={i} i={i} pos={pos} step={step} width={cardW} active={active} onGo={goTo} onCardClick={onCardClick} />)}
          </ul>
          <div ref={cursor} aria-hidden className="pointer-events-none absolute left-0 top-0 z-[200] hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-cocoa opacity-0 shadow-xl transition-opacity [@media(hover:hover)]:block">{cursorLabel}</div>
        </div>
      ) : (
        <div ref={wrap} className="mt-10">
          <ul
            onScroll={(e) => { const el = e.currentTarget; setSwipe(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)); }}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-10" aria-label="Specialties"
          >
            {specialties.map((s) => <li key={s.n} className="w-[78vw] max-w-[22rem] shrink-0 snap-center"><SpecialtyCard s={s} /></li>)}
          </ul>
          <div className="container-page mt-3 flex items-center gap-4" aria-hidden>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-cocoa/15"><div className="h-full rounded-full bg-brown transition-[width]" style={{ width: `${Math.max(12, swipe * 100)}%` }} /></div>
            <span className="text-sm font-medium text-muted">Swipe →</span>
          </div>
        </div>
      )}

      {arcMode && (
        <p className="mt-6 text-center text-lg" aria-live="polite">
          <strong className="font-semibold text-cocoa">{String(active + 1).padStart(2, "0")}</strong>
          <span className="text-muted"> / {String(N).padStart(2, "0")}</span>
          <span className="sr-only"> {specialties[active].title}</span>
        </p>
      )}
      <p className="container-page mt-6 text-center text-sm text-muted">Prefer a list? <Link href="/treatments" className="font-semibold text-brown underline underline-offset-4">Browse all treatments</Link></p>
    </section>
  );
}
