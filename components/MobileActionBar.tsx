import { Calendar, MessageCircle, Phone } from "lucide-react";
import { ActionLink } from "./ActionLink";
import { telHref, whatsappHref } from "@/content/site";

/** Sticky bottom bar under 768px: Call · WhatsApp · Book. */
export function MobileActionBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-3 gap-1.5 rounded-full border border-cocoa/10 bg-cream/95 p-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_12px_40px_-8px_rgb(62_38_16/.35)] backdrop-blur md:hidden">
      <ActionLink href={telHref()} event="click_call" variant="ghost" className="!px-2"><Phone size={18} aria-hidden /> Call</ActionLink>
      <ActionLink href={whatsappHref()} event="click_whatsapp" variant="ghost" className="!px-2"><MessageCircle size={18} aria-hidden /> Chat</ActionLink>
      <ActionLink book variant="primary" className="!px-2"><Calendar size={18} aria-hidden /> Book</ActionLink>
    </nav>
  );
}
