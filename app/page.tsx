import Image from "next/image";
import { CalendarCheck, Clock, IndianRupee, MessageCircle, Users } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { Reveal } from "@/components/Reveal";
import { isDev } from "@/lib/placeholder";
import { site, whatsappHref } from "@/content/site";

const trust = [
  { icon: Users, text: "8 specialists" },
  { icon: IndianRupee, text: `₹${site.consultationFee} consultation` },
  { icon: Clock, text: site.hoursLabel },
];

// Phase 3 replaces these with the real sections.
const upcoming = [
  "Treatment finder", "Meet the Smile Architects", "Why patients choose Alpha", "Smile Gallery teaser",
  "Reviews", "First visit in 4 steps", "Technology & hygiene", "FAQ", "Visit us", "Final CTA band",
];

export default function Home() {
  return (
    <>
      <section className="container-page grid items-center gap-10 py-10 md:py-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">{site.tagline}</p>
          <h1 className="mt-4">Specialist dental care in R.A. Puram, Chennai</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Eight specialists, from root canals to Invisalign and implants, under one calm, modern studio.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href="/book">Book appointment</ActionLink>
            <ActionLink href={whatsappHref()} event="click_whatsapp" variant="secondary">
              <MessageCircle size={18} aria-hidden /> WhatsApp us
            </ActionLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-base text-ink">
            {trust.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon size={18} className="text-brand-600" aria-hidden /> {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5">
          <div className="arch relative aspect-[4/5] bg-sand">
            <Image
              src="/images/hero-operatory.jpg"
              alt="Modern dental treatment room with a dental chair and equipment"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="card absolute -bottom-4 left-4 flex items-center gap-3 px-4 py-3 shadow-md">
            <CalendarCheck size={22} className="text-success" aria-hidden />
            <span className="text-base font-semibold text-brand-900">Same-week appointments</span>
          </div>
        </div>
      </section>

      {isDev && (
        <section className="container-page pb-8">
          <Reveal>
            <div className="rounded-card border-2 border-dashed border-brand-600/40 p-6">
              <p className="eyebrow">Dev only · homepage shell</p>
              <p className="mt-2 text-base text-muted">Sections arriving in phase 3:</p>
              <ol className="mt-3 grid list-decimal gap-x-8 pl-5 text-base sm:grid-cols-2">
                {upcoming.map((s) => <li key={s}>{s}</li>)}
              </ol>
            </div>
          </Reveal>
        </section>
      )}
    </>
  );
}
