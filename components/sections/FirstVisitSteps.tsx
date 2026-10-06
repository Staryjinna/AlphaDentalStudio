import { CalendarCheck, ClipboardCheck, FileText, HeartHandshake } from "lucide-react";

const steps = [
  { icon: CalendarCheck, title: "Book", body: "Choose a time online, by phone or on WhatsApp. We confirm by call or message." },
  { icon: ClipboardCheck, title: "Consultation and digital check-up", body: "A thorough examination with digital imaging where it helps, explained in plain words." },
  { icon: FileText, title: "Clear plan and cost", body: "You see your options and the cost of each before anything begins." },
  { icon: HeartHandshake, title: "Treatment at your pace", body: "We proceed only with your agreement, with comfort options for anxious patients." },
];

/** Cards that stack as you scroll (CSS sticky: smooth, light, and fine on phones). */
export function FirstVisitSteps({ dark = false }: { dark?: boolean }) {
  return (
    <ol className="space-y-6 pb-4">
      {steps.map((s, i) => (
        <li key={s.title} className="sticky" style={{ top: `calc(6rem + ${i * 0.9}rem)` }}>
          <div className={`relative overflow-hidden rounded-[2rem] p-7 shadow-xl md:p-9 ${dark ? "bg-cocoa-2 text-white shadow-black/30" : "bg-white shadow-cocoa/10"}`}>
            <span aria-hidden className={`absolute -right-3 -top-8 text-[9rem] font-bold leading-none ${dark ? "text-white/[.06]" : "text-sand"}`}>{i + 1}</span>
            <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${dark ? "bg-peach text-cocoa" : "bg-cocoa text-peach"}`}><s.icon size={26} aria-hidden /></span>
            <p className="eyebrow relative mt-5">Step {i + 1}</p>
            <h3 className={`relative mt-1 !text-2xl ${dark ? "!text-white" : ""}`}>{s.title}</h3>
            <p className={`relative mt-2 max-w-md text-base ${dark ? "text-white/80" : "text-muted"}`}>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
