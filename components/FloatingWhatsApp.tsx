"use client";
import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { whatsappHref } from "@/content/site";

/** Desktop-only floating WhatsApp button with a soft pulse. Mobile uses the sticky action bar. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref()} target="_blank" rel="noopener noreferrer"
      onClick={() => track("click_whatsapp")}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-[0_12px_30px_-6px_rgb(47_125_91/.7)] transition-transform hover:scale-110 md:flex"
    >
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-success/40 [animation-duration:2.8s]" />
      <MessageCircle size={26} aria-hidden className="relative" />
    </a>
  );
}
