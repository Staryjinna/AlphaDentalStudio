import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Clock, MapPin, MessageCircle, Phone, ScanLine, ShieldCheck, Sofa, Users, Zap } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { Hero3D } from "@/components/Hero3D";
import { Marquee } from "@/components/Marquee";
import { CountUp } from "@/components/CountUp";
import { Reveal, SplitWords } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Spotlight } from "@/components/Spotlight";
import { TiltCard } from "@/components/TiltCard";
import { ParallaxImage } from "@/components/Parallax";
import { TreatmentFinder } from "@/components/sections/TreatmentFinder";
import { DoctorCarousel } from "@/components/sections/DoctorCarousel";
import { FirstVisitSteps } from "@/components/sections/FirstVisitSteps";
import { FaqList } from "@/components/sections/FaqList";
import { VisitUs } from "@/components/sections/VisitUs";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { JsonLd } from "@/lib/jsonld";
import { doctors } from "@/content/doctors";
import { generalFaqs } from "@/content/faqs";
import { branches, site, telHref, whatsappHref } from "@/content/site";
import { treatments } from "@/content/treatments";

const why = [
  { icon: Users, title: "Specialists for each discipline", body: "Endodontics, implants and oral surgery, orthodontics, periodontics and general care, each handled by the right clinician.", span: "md:col-span-2" },
  { icon: ScanLine, title: "Digital scanning and laser technology", body: "Digital X-rays with reduced radiation, intraoral cameras, 3D imaging for complex cases and laser treatments.", span: "" },
  { icon: ShieldCheck, title: "Strict sterilisation protocol", body: "Hygiene you can see and ask about at every visit.", span: "" }, // TODO: clinic to supply protocol details
  { icon: Sofa, title: "Clear plans, comfort-first care", body: "Options and costs explained before we start, with a comfort menu of blankets, neck pillows, music or shows and refreshments.", span: "md:col-span-2" },
];

export default function Home() {
  const carouselDocs = [...doctors].sort((a, b) => Number(!!b.lead) - Number(!!a.lead));
  return (
    <>
      {/* 1. HERO */}
      <section className="mesh-dark on-dark grain relative overflow-hidden">
        <Spotlight as="div" className="container-page grid items-center gap-10 pb-20 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-8 lg:pb-28">
          <div className="relative z-10 lg:col-span-7">
            <Reveal><p className="eyebrow-dark eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5"><span className="h-1.5 w-1.5 rounded-full bg-mint" /> R.A. Puram · Kottivakkam · Chennai</p></Reveal>
            <h1 className="mt-6 !text-white">
              <SplitWords text="Specialist dental care in" />{" "}
              <span className="gradient-text"><SplitWords text="R.A. Puram, Chennai" delay={0.3} /></span>
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                {doctors.length} clinicians, from root canals to Invisalign and implants, under one calm, modern studio.
              </p>
            </Reveal>
            <Reveal delay={0.65}>
              <div className="mt-9 flex flex-wrap gap-3">
                <ActionLink href="/book" magnetic arrow>Book appointment</ActionLink>
                <ActionLink href={whatsappHref()} event="click_whatsapp" variant="glass"><MessageCircle size={18} aria-hidden /> WhatsApp us</ActionLink>
                <ActionLink href={telHref()} event="click_call" variant="glass" className="sm:hidden"><Phone size={18} aria-hidden /> Call</ActionLink>
              </div>
            </Reveal>
            <Reveal delay={0.8}>
              <ul className="mt-10 flex flex-wrap gap-3 text-sm">
                {[
                  { i: Users, t: `${doctors.length} clinicians` },
                  { i: MapPin, t: `${branches.length} Chennai branches` },
                  { i: Clock, t: site.hoursLabel },
                ].map(({ i: Icon, t }) => (
                  <li key={t} className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-white/90"><Icon size={16} className="text-champagne" aria-hidden /> {t}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="arch hairline relative h-full w-[82%] translate-x-[12%] bg-night-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/.7)]">
              <Image
                src="/images/hero-operatory.jpg"
                alt="Modern dental treatment room with a dental chair and equipment"
                fill priority sizes="(min-width:1024px) 420px, 80vw"
                className="object-cover opacity-90 saturate-[.85]"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-brand-600/20" />
            </div>
            <Hero3D className="absolute -inset-x-[14%] -top-[4%] bottom-[6%] z-10" />
            <div className="glass absolute -left-1 bottom-6 z-20 flex animate-float items-center gap-3 rounded-2xl px-4 py-3">
              <CalendarCheck size={22} className="text-success" aria-hidden />
              <span className="text-sm font-semibold text-brand-900">Same-week appointments</span>
            </div>
            <div className="glass absolute right-0 top-8 z-20 hidden animate-float items-center gap-3 rounded-2xl px-4 py-3 [animation-delay:-3s] sm:flex">
              <Zap size={20} className="text-accent" aria-hidden />
              <span className="text-sm font-semibold text-brand-900">Laser · Digital · Sedation</span>
            </div>
          </div>
        </Spotlight>
        <div className="border-t border-white/10">
          <Marquee dark items={["General dentistry", "Cosmetic dentistry", "Orthodontics", "Endodontics", "Periodontics", "Restorative dentistry", "Oral surgery", "Sedation dentistry", "Special needs dentistry"]} />
        </div>
      </section>

      {/* 2. STATS (facts only) */}
      <section className="container-page relative z-10 mt-8 md:-mt-10">
        <Reveal>
          <dl className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4">
            {[
              { n: doctors.length, s: "", l: "Clinicians" },
              { n: branches.length, s: "", l: "Branches in Chennai" },
              { n: 9, s: "", l: "Areas of dentistry" },
              { n: 6, s: "", l: "Days a week, Mon–Sat" },
            ].map((x) => (
              <div key={x.l} className="bg-white/50 p-6 text-center md:p-8">
                <dd className="font-heading text-5xl font-semibold text-brand-900"><CountUp to={x.n} suffix={x.s} /></dd>
                <dt className="mt-1 text-base text-muted">{x.l}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* 3. TREATMENT FINDER */}
      <section className="container-page py-24">
        <SectionHeading eyebrow="Treatments" title="Find the care you need" lead="Seven groups of treatments, each led by the right specialist." />
        <div className="mt-10"><TreatmentFinder /></div>
        <p className="mt-8 text-sm text-muted">{treatments.length} treatment guides. Information is general and not a substitute for an in-person examination.</p>
      </section>

      {/* 4. DOCTORS */}
      <Spotlight className="mesh-dark on-dark grain overflow-hidden py-24">
        <div className="container-page relative z-10">
          <SectionHeading dark eyebrow="Our team" title="Meet the Smile Architects" lead="Ten clinicians covering every discipline, from endodontics and implants to orthodontics and gum care." />
          <div className="mt-10"><DoctorCarousel doctors={carouselDocs} dark /></div>
          <div className="mt-4"><ActionLink href="/doctors" variant="glass" arrow>See the whole team</ActionLink></div>
        </div>
      </Spotlight>

      {/* 5. WHY ALPHA (bento) */}
      <section className="container-page py-24">
        <SectionHeading eyebrow="Why Alpha" title="Why patients choose Alpha" />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {why.map((w, i) => (
            <li key={w.title} className={w.span}>
              <Reveal delay={i * 0.07} className="h-full">
                <TiltCard className="card group h-full p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-900 text-champagne shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"><w.icon size={26} aria-hidden /></span>
                  <h3 className="mt-5">{w.title}</h3>
                  <p className="mt-2 text-base text-muted">{w.body}</p>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. REVIEWS (live Google only; hidden without key) */}
      <GoogleReviews />

      {/* 7. FIRST VISIT */}
      <Spotlight className="mesh-dark on-dark grain overflow-hidden py-24">
        <div className="container-page relative z-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionHeading dark eyebrow="Your first visit" title="Four calm steps from booking to treatment" lead="No surprises: you will know the plan and the cost before we begin." />
            <div className="mt-8"><ActionLink href="/first-visit" variant="glass" arrow>What to expect</ActionLink></div>
          </div>
          <div className="lg:col-span-7"><FirstVisitSteps /></div>
        </div>
      </Spotlight>

      {/* 8. TECHNOLOGY & HYGIENE */}
      <section className="container-page py-24">
        <SectionHeading eyebrow="Technology and comfort" title="Modern tools, a calmer visit" lead="Digital X-rays with reduced radiation, intraoral cameras, 3D imaging and laser treatments, in a room designed to feel relaxed." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Reveal className="md:col-span-2"><ParallaxImage src="/images/intraoral-scanner.jpg" alt="Dentist scanning a patient's teeth with an intraoral scanner" className="h-80 rounded-[var(--radius)] md:h-[26rem]" sizes="(min-width:1024px) 780px, 100vw" /></Reveal>
          <div className="grid gap-5">
            <Reveal delay={0.1}><ParallaxImage src="/images/opg-xray.jpg" alt="Panoramic dental X-ray of teeth and jaw" className="h-48 rounded-[var(--radius)] md:h-[12.5rem]" sizes="(min-width:1024px) 380px, 100vw" /></Reveal>
            <Reveal delay={0.2}><ParallaxImage src="/images/clinic-chair.jpg" alt="Dental chair in a bright clinical treatment room" className="h-48 rounded-[var(--radius)] md:h-[12.5rem]" sizes="(min-width:1024px) 380px, 100vw" /></Reveal>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">Illustrative photography. Clinic photos coming soon.</p>
      </section>

      {/* 9. FAQ */}
      <section className="mesh-light py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="FAQ" title="Questions we hear often" lead="Can't find your answer? Message us on WhatsApp." /></div>
          <div className="lg:col-span-8"><FaqList faqs={generalFaqs} /></div>
        </div>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: generalFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      </section>

      {/* 10. VISIT US */}
      <section className="container-page py-24">
        <SectionHeading eyebrow="Visit us" title="Two branches, one standard of care" />
        <div className="mt-10"><VisitUs /></div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="container-page pb-24">
        <Spotlight as="div" className="mesh-dark on-dark grain overflow-hidden rounded-[2rem] px-6 py-16 text-center md:px-16 md:py-24">
          <div className="relative z-10">
            <p className="eyebrow-dark eyebrow">{site.tagline}</p>
            <h2 className="mx-auto mt-4 max-w-2xl !text-white !text-[clamp(2rem,4.5vw,3.4rem)]">Your smile, in <span className="gradient-text">expert hands.</span></h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ActionLink href="/book" magnetic arrow>Book appointment</ActionLink>
              <ActionLink href={telHref()} event="click_call" variant="glass"><Phone size={18} aria-hidden /> Call {site.phone}</ActionLink>
              <ActionLink href={whatsappHref()} event="click_whatsapp" variant="glass"><MessageCircle size={18} aria-hidden /> WhatsApp</ActionLink>
            </div>
          </div>
        </Spotlight>
      </section>
    </>
  );
}
