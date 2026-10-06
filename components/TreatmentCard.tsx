import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Treatment } from "@/content/treatments";

export function TreatmentCard({ t }: { t: Pick<Treatment, "slug" | "title" | "promise" | "image" | "imageAlt"> }) {
  return (
    <Link href={`/treatments/${t.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image src={`/images/${t.image}.jpg`} alt={t.imageAlt} fill sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="flex items-start justify-between gap-3">
          {t.title}
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-cocoa transition-all duration-300 group-hover:rotate-45 group-hover:bg-cocoa group-hover:text-white"><ArrowUpRight size={18} aria-hidden /></span>
        </h3>
        <p className="mt-2 text-base text-muted">{t.promise}</p>
      </div>
    </Link>
  );
}
