import { CalendarCheck, ClipboardCheck, FileText, HeartHandshake } from "lucide-react";
import { Reveal } from "../Reveal";

const steps = [
  { icon: CalendarCheck, title: "Book", body: "Online, by phone or on WhatsApp. We confirm by call or message." },
  { icon: ClipboardCheck, title: "Consultation & digital check-up", body: "A thorough examination, with digital imaging where it helps." },
  { icon: FileText, title: "Clear plan and cost", body: "Your options and the cost of each, before anything begins." },
  { icon: HeartHandshake, title: "Treatment at your pace", body: "Only with your agreement, with comfort options for anxious patients." },
];

/** Compact stepper: a row on desktop, a tidy rail on phones. */
export function FirstVisitSteps({ dark = false }: { dark?: boolean }) {
  return (
    <ol className="relative grid gap-4 md:grid-cols-4 md:gap-5">
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 md:block">
          <Reveal delay={i * 0.07} className="flex w-full gap-4 md:block">
            <span className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${dark ? "bg-peach text-cocoa" : "bg-cocoa text-peach"}`}><s.icon size={22} aria-hidden /></span>
            {i < steps.length - 1 && <span aria-hidden className="absolute left-6 top-12 h-[calc(100%-1rem)] w-px bg-cocoa/20 md:left-12 md:top-6 md:h-px md:w-[calc(100%-2rem)]" />}
            <div className="md:mt-4">
              <p className="eyebrow">Step {i + 1}</p>
              <h3 className={`mt-0.5 ${dark ? "!text-white" : ""}`}>{s.title}</h3>
              <p className={`mt-1 text-[0.92rem] leading-snug ${dark ? "text-white/80" : "text-muted"}`}>{s.body}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
