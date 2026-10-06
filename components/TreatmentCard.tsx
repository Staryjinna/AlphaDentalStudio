"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "./TiltCard";
import type { Treatment } from "@/content/treatments";

export function TreatmentCard({ t }: { t: Pick<Treatment, "slug" | "title" | "promise" | "image" | "imageAlt"> }) {
  return (
    <TiltCard className="group card overflow-hidden">
      <Link href={`/treatments/${t.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={`/images/${t.image}.jpg`} alt={t.imageAlt} fill sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="flex items-start justify-between gap-3 text-brand-900">
            {t.title}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-900 group-hover:text-white"><ArrowUpRight size={18} aria-hidden /></span>
          </h3>
          <p className="mt-2 text-base text-muted">{t.promise}</p>
        </div>
      </Link>
    </TiltCard>
  );
}
