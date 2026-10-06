import { Check } from "lucide-react";
import { ParallaxImage } from "../Parallax";
import { Reveal } from "../Reveal";
import { ActionLink } from "../ActionLink";

type Row = { eyebrow: string; title: string; body: string; bullets: string[]; image: string; alt: string; cta?: { href: string; label: string } };

/** Alternating text/image rows with parallax photography. */
export function Showcase({ rows }: { rows: Row[] }) {
  return (
    <div className="space-y-24 md:space-y-32">
      {rows.map((r, i) => (
        <div key={r.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
            <ParallaxImage src={r.image} alt={r.alt} range={36} sizes="(min-width:1024px) 600px, 100vw" className={`aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] ${i % 2 ? "rounded-[2rem] rounded-tr-[9rem]" : "rounded-[2rem] rounded-tl-[9rem]"}`} />
          </Reveal>
          <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : ""}`}>
            <Reveal>
              <p className="eyebrow">{r.eyebrow}</p>
              <h2 className="mt-3">{r.title}</h2>
              <p className="mt-5 text-lg text-muted">{r.body}</p>
              <ul className="mt-6 space-y-3">
                {r.bullets.map((b) => <li key={b} className="flex gap-3 text-base"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-peach text-cocoa"><Check size={14} aria-hidden /></span>{b}</li>)}
              </ul>
              {r.cta && <div className="mt-8"><ActionLink href={r.cta.href} variant="secondary" arrow>{r.cta.label}</ActionLink></div>}
            </Reveal>
          </div>
        </div>
      ))}
    </div>
  );
}
