import { Sparkles } from "lucide-react";

/** Infinite horizontal ticker. Pauses on hover; static for reduced motion (via global rule). */
export function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className={`group relative overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${dark ? "text-white/80" : "text-brand-900"}`} aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap group-hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-10 font-heading text-2xl md:text-3xl">
            {t} <Sparkles size={18} className="text-champagne" />
          </span>
        ))}
      </div>
    </div>
  );
}
