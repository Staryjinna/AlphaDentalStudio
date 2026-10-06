import { Calendar, MessageCircle, Phone } from "lucide-react";
import { ActionLink } from "./ActionLink";
import { telHref, whatsappHref } from "@/content/site";

/** Sticky bottom bar on screens under 768px: Call · WhatsApp · Book. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-2 border-t border-ink/10 bg-bg/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
    >
      <ActionLink href={telHref} event="click_call" variant="secondary" className="px-2">
        <Phone size={18} aria-hidden /> Call
      </ActionLink>
      <ActionLink href={whatsappHref()} event="click_whatsapp" variant="secondary" className="px-2">
        <MessageCircle size={18} aria-hidden /> WhatsApp
      </ActionLink>
      <ActionLink href="/book" variant="primary" className="px-2">
        <Calendar size={18} aria-hidden /> Book
      </ActionLink>
    </nav>
  );
}
