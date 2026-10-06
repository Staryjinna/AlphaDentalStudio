"use client";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { CalendarCheck, ClipboardCheck, FileText, HeartHandshake } from "lucide-react";
import { Reveal } from "../Reveal";

const steps = [
  { icon: CalendarCheck, title: "Book", body: "Choose a time online, by phone or on WhatsApp. We confirm by call or message." },
  { icon: ClipboardCheck, title: "Consultation and digital check-up", body: "A thorough examination with digital imaging where it helps, explained in plain words." },
  { icon: FileText, title: "Clear plan and cost", body: "You see your options and the cost of each before anything begins." },
  { icon: HeartHandshake, title: "Treatment at your pace", body: "We proceed only with your agreement, with comfort options for anxious patients." },
];

/** Vertical timeline whose line fills as you scroll. */
export function FirstVisitSteps() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const height = useTransform(smooth, [0, 1], ["0%", "100%"]);
  return (
    <ol ref={ref} className="relative space-y-6 pl-14 md:pl-20">
      <span aria-hidden className="absolute bottom-4 left-5 top-4 w-px bg-white/20 md:left-8" />
      <motion.span aria-hidden style={{ height: reduce ? "100%" : height }} className="absolute left-5 top-4 w-px bg-gradient-to-b from-champagne to-mint md:left-8" />
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <span className="absolute -left-14 top-1 flex h-11 w-11 items-center justify-center rounded-full border border-champagne/60 bg-night text-champagne shadow-[0_0_24px_-4px_rgb(217_188_140/.5)] md:-left-20 md:h-14 md:w-14">
            <s.icon size={20} aria-hidden />
          </span>
          <Reveal delay={0.05}>
            <div className="glass-dark hairline rounded-2xl p-6">
              <p className="eyebrow">Step {i + 1}</p>
              <h3 className="mt-1 !text-white">{s.title}</h3>
              <p className="mt-2 text-base text-white/80">{s.body}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
