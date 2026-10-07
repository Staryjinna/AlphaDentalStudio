"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ExternalLink, Play, X } from "lucide-react";
import { reelUrl, type Reel } from "@/content/reels";

/**
 * Cover card that opens a player sheet on tap. Nothing from Instagram loads until then
 * (keeps the page fast and avoids third-party cookies before a deliberate click).
 */
export function ReelCard({ reel, className = "" }: { reel: Reel; className?: string }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [live, setLive] = useState(false);
  const story = reel.kind === "story";

  const open = () => { setLive(true); dlg.current?.showModal(); document.documentElement.classList.add("lenis-stopped"); };
  const close = () => dlg.current?.close();
  const onClose = () => { setLive(false); document.documentElement.classList.remove("lenis-stopped"); };

  return (
    <>
      <button type="button" onClick={open} aria-label={`Play video: ${reel.title}`} className={`group relative block w-full overflow-hidden rounded-[2rem] bg-black text-left ${story ? "aspect-square" : "aspect-[9/16]"} ${className}`}>
        <Image
          src={`/images/reels/${reel.id}.jpg`} alt="" fill sizes="(min-width:1024px) 280px, 70vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${story ? "object-[50%_16%] scale-[1.02]" : ""}`}
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-transparent to-cocoa/10" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cocoa">{story ? "Patient story" : "Dental tip"}</span>
        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-cocoa shadow-xl transition-transform duration-300 group-hover:scale-110">
          <Play size={26} className="ml-1 fill-current" aria-hidden />
        </span>
        <span className="absolute inset-x-0 bottom-0 p-5">
          <span className="block text-lg font-semibold leading-snug text-white">{reel.title}</span>
          <span className="mt-1 block text-sm text-white/80">{reel.blurb}</span>
        </span>
      </button>

      <dialog ref={dlg} className="sheet" aria-label={reel.title} onClose={onClose} onClick={(e) => { if (e.target === dlg.current) close(); }}>
        <div className="flex h-full items-center justify-center p-3" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="relative flex h-[min(88dvh,780px)] w-[min(94vw,420px)] flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 bg-cream px-4 py-2.5">
              <p className="truncate text-sm font-semibold text-cocoa">{reel.title}</p>
              <button type="button" onClick={close} aria-label="Close video" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-cocoa hover:bg-peach"><X size={20} aria-hidden /></button>
            </div>
            {live && (
              <iframe
                title={reel.title} src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen loading="lazy"
                className="min-h-0 w-full flex-1 border-0"
              />
            )}
            <a href={reelUrl(reel.id)} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 bg-cream text-sm font-semibold text-brown underline-offset-4 hover:underline">
              <ExternalLink size={14} aria-hidden /> Open on Instagram
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
