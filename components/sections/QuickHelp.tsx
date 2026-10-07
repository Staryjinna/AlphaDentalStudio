import { Baby, CalendarPlus, MapPin, MessageCircle, Phone, Siren, Smile, Sparkles } from "lucide-react";
import { ActionLink } from "../ActionLink";
import { ToothIcon } from "../ToothIcon";
import { Reveal } from "../Reveal";
import { branches, telHref, whatsappHref } from "@/content/site";
import { OpenNow } from "../OpenNow";
import Link from "next/link";

const chips = [
  { icon: Siren, label: "Tooth pain or emergency", href: "/treatments/root-canal-treatment" },
  { icon: ToothIcon, label: "Missing tooth", href: "/treatments/dental-implants" },
  { icon: Smile, label: "Crooked teeth", href: "/treatments/invisalign-clear-aligners" },
  { icon: Sparkles, label: "Whiter smile", href: "/treatments/teeth-whitening" },
  { icon: Baby, label: "Child's check-up", href: "/treatments/kids-dentistry" },
  { icon: ToothIcon, label: "Bleeding gums", href: "/treatments/gum-treatment" },
];

/** Practical help right under the hero: what do you need, and one tap to act. */
export function QuickHelp() {
  return (
    <section className="container-page relative z-10 -mt-8 md:-mt-10" aria-labelledby="qh">
      <Reveal>
        <div className="rounded-[1.75rem] border border-cocoa/10 bg-white p-4 shadow-[0_20px_50px_-28px_rgb(62_38_16/.5)] md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <h2 id="qh" className="!text-lg md:!text-xl">How can we help today?</h2>
            <OpenNow className="text-cocoa" />
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c.label}>
                <Link href={c.href} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-sand px-4 text-[0.9rem] font-medium text-cocoa transition-colors hover:bg-cocoa hover:text-white">
                  <c.icon size={16} aria-hidden /> {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-cocoa/10 pt-4 md:flex md:flex-wrap">
            <ActionLink book arrow className="col-span-2 md:col-auto"><CalendarPlus size={18} aria-hidden /> Book appointment</ActionLink>
            <ActionLink href={telHref()} event="click_call" variant="secondary"><Phone size={18} aria-hidden /> Call</ActionLink>
            <ActionLink href={whatsappHref()} event="click_whatsapp" variant="secondary"><MessageCircle size={18} aria-hidden /> WhatsApp</ActionLink>
            <ActionLink href={branches[0].mapsUrl} event="click_directions" variant="ghost" className="col-span-2 md:col-auto"><MapPin size={18} aria-hidden /> Directions</ActionLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
