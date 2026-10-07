import Image from "next/image";
import Link from "next/link";
import type { Specialty } from "@/content/specialties";

/** One specialty card: gradient face, badge, title, blurb and a photo "screen" at the bottom. */
export function SpecialtyCard({ s, onFocus, onClick, priority = false }: { s: Specialty; onFocus?: () => void; onClick?: (e: React.MouseEvent) => void; priority?: boolean }) {
  return (
    <Link
      href={s.href} draggable={false} onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) onFocus?.(); }} onClick={onClick} data-specialty={s.n}
      style={{ background: `linear-gradient(165deg, ${s.c1}, ${s.c2})` }}
      className="group relative flex aspect-[4/5.3] w-full select-none flex-col items-center overflow-hidden rounded-[1.75rem] px-4 pt-4 text-center md:px-5 md:pt-5 text-white shadow-[0_24px_50px_-18px_rgb(42_24_8/.55)]"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-cocoa shadow-md transition-transform duration-500 group-hover:-translate-y-1">
        <i className="h-1.5 w-1.5 rounded-full bg-brown" /> Specialty {s.n}
      </span>
      <h3 className="mt-3 text-[1.25rem] font-semibold leading-tight !text-white md:mt-4 md:text-[1.55rem]">{s.title}</h3>
      <p className="mt-1.5 line-clamp-2 max-w-[94%] text-[0.82rem] leading-snug text-white/85 md:mt-2 md:text-[0.92rem]">{s.blurb}</p>
      <span className="relative mt-auto h-[44%] w-[88%] overflow-hidden rounded-t-[1.6rem] border-[5px] border-b-0 border-cocoa bg-cocoa shadow-[0_-10px_40px_rgb(0_0_0/.25)]">
        <Image src={s.image} alt={s.alt} fill sizes="(min-width:768px) 300px, 70vw" priority={priority} draggable={false} className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute inset-x-0 bottom-3 flex justify-center">
          <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-cocoa shadow-lg md:px-4 md:py-2 md:text-sm">Explore</span>
        </span>
      </span>
    </Link>
  );
}
