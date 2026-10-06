"use client";
import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { whatsappHref } from "@/content/site";

/** Desktop-only floating WhatsApp button. Mobile uses the sticky action bar instead. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("click_whatsapp")}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-lg transition-transform hover:scale-105 md:flex"
    >
      <MessageCircle size={26} aria-hidden />
    </a>
  );
}
