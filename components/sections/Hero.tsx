import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { ActionLink } from "../ActionLink";
import { RotatingBadge } from "../RotatingBadge";
import { Reveal, SplitWords } from "../Reveal";
import { branches, site, whatsappHref } from "@/content/site";
import { doctors } from "@/content/doctors";

export function Hero() {
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-cocoa">
      <Image src="/images/hero-operatory.jpg" alt="" fill priority sizes="100vw" className="-z-20 animate-kenburns object-cover opacity-75 saturate-[.85]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-cocoa/85 via-cocoa/60 to-cocoa lg:bg-gradient-to-r lg:from-cocoa/95 lg:via-cocoa/70 lg:to-cocoa/10" />

      <div className="container-page grid items-center gap-10 pb-28 pt-28 lg:grid-cols-12 lg:gap-8 lg:pb-16">
        <div className="lg:col-span-7">
          <Reveal><p className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[.16em] text-peach"><span className="h-1.5 w-1.5 rounded-full bg-peach" /> {branches.map((b) => b.name).join(" · ")} · Chennai</p></Reveal>
          <h1 className="mt-6 !text-white">
            <SplitWords text="Personalised dentistry in" /> <span className="text-peach"><SplitWords text="R.A. Puram, Chennai" delay={0.3} /></span>
          </h1>
          <Reveal delay={0.55}>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              {site.tagline} {doctors.length} clinicians, from root canals to Invisalign and implants, in a calm studio where every visit should feel comfortable.
            </p>
          </Reveal>
          <Reveal delay={0.7}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink book magnetic arrow>Book appointment</ActionLink>
              <ActionLink href={whatsappHref()} event="click_whatsapp" variant="outline-light"><MessageCircle size={18} aria-hidden /> WhatsApp us</ActionLink>
            </div>
          </Reveal>
          <Reveal delay={0.85}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/80">
              <li>{doctors.length} clinicians</li><li aria-hidden className="text-peach">•</li>
              <li>{branches.length} branches</li><li aria-hidden className="text-peach">•</li>
              <li>{site.hoursLabel}</li>
            </ul>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-[19rem] lg:col-span-5 lg:max-w-sm lg:justify-self-end">
          <Reveal delay={0.4}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-[6px] border-white/10 bg-cocoa-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/.8)]">
              <Image src="/images/clinic/clinic-work.jpg" alt="A dentist at Alpha Dental Studio treating a patient" fill priority sizes="(min-width:1024px) 380px, 80vw" className="object-cover" />
            </div>
            <RotatingBadge className="absolute -bottom-8 -left-8 h-32 w-32 md:-left-14 md:h-36 md:w-36" />
          </Reveal>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[.2em] text-white/60 lg:flex">
        Scroll
        <span className="h-10 w-px overflow-hidden bg-white/20"><span className="block h-4 w-px animate-[scrollcue_1.8s_ease-in-out_infinite] bg-peach" /></span>
      </div>
    </section>
  );
}
