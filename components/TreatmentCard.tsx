import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Treatment } from "@/content/treatments";

/** Compact row on phones (photo left, text right); stacked card from sm up. */
export function TreatmentCard({ t }: { t: Pick<Treatment, "slug" | "title" | "promise" | "image" | "imageAlt"> }) {
  return (
    <Link href={`/treatments/${t.slug}`} className="card card-hover group flex h-full flex-row overflow-hidden sm:flex-col">
      <div className="relative w-28 shrink-0 overflow-hidden sm:aspect-[16/10] sm:w-full">
        <Image src={`/images/${t.image}.jpg`} alt={t.imageAlt} fill sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, 112px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <h3 className="flex items-start justify-between gap-3">
          {t.title}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand text-cocoa transition-all duration-300 group-hover:rotate-45 group-hover:bg-cocoa group-hover:text-white sm:h-9 sm:w-9"><ArrowUpRight size={16} aria-hidden /></span>
        </h3>
        <p className="mt-1 line-clamp-2 text-[0.9rem] leading-snug text-muted sm:line-clamp-3 sm:text-base">{t.promise}</p>
      </div>
    </Link>
  );
}
