import { ActionLink } from "@/components/ActionLink";
import { CountUp } from "@/components/CountUp";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Hero } from "@/components/sections/Hero";
import { WellnessMenu } from "@/components/sections/WellnessMenu";
import { SpecialtiesScroller } from "@/components/sections/SpecialtiesScroller";
import { TreatmentFinder } from "@/components/sections/TreatmentFinder";
import { Showcase } from "@/components/sections/Showcase";
import { DoctorCarousel } from "@/components/sections/DoctorCarousel";
import { FirstVisitSteps } from "@/components/sections/FirstVisitSteps";
import { FaqList } from "@/components/sections/FaqList";
import { VisitUs } from "@/components/sections/VisitUs";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { JsonLd } from "@/lib/jsonld";
import { doctors } from "@/content/doctors";
import { generalFaqs } from "@/content/faqs";
import { branches, site, telHref, whatsappHref } from "@/content/site";
import { specialties } from "@/content/specialties";
import { Phone, MessageCircle } from "lucide-react";

const stats = [
  { n: doctors.length, l: "Clinicians" },
  { n: branches.length, l: "Branches in Chennai" },
  { n: specialties.length, l: "Areas of dentistry" },
  { n: 6, l: "Days a week, Mon–Sat" },
];

export default function Home() {
  const team = [...doctors].sort((a, b) => Number(!!b.lead) - Number(!!a.lead));
  return (
    <>
      <Hero />

      <div className="border-y border-cocoa/10 bg-cream py-5 text-[clamp(2rem,6vw,4.5rem)] leading-none">
        <Marquee outline items={["Innovating smiles.", "Inspiring lives.", "Innovating smiles.", "Inspiring lives."]} />
      </div>

      {/* Intro: what Alpha is, in the clinic's own words */}
      <section className="container-page grid gap-12 py-24 lg:grid-cols-12 lg:items-center lg:py-32">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="Welcome" title="Comprehensive care, with a touch of innovation" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-muted">From routine check-ups to advanced procedures, we make sure each visit supports both your health and your confidence.</p>
            <p className="mt-4 max-w-2xl text-lg text-muted">Our friendly team takes the time to understand your concerns and goals, so you leave with a healthy, comfortable smile. Your comfort is our priority.</p>
            <div className="mt-8 flex flex-wrap gap-3"><ActionLink book arrow>Book appointment</ActionLink><ActionLink href="/about" variant="secondary">About the studio</ActionLink></div>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-5">
          <dl className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={s.l} className={`rounded-[2rem] p-6 ${i % 3 === 0 ? "bg-cocoa text-white" : i === 1 ? "bg-peach text-cocoa" : "bg-sand text-cocoa"}`}>
                <dd className="text-5xl font-semibold"><CountUp to={s.n} /></dd>
                <dt className="mt-1 text-[0.95rem] opacity-85">{s.l}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* The ADS Wellness Menu */}
      <section className="bg-sand/60 py-24">
        <div className="container-page">
          <SectionHeading eyebrow="The ADS wellness menu" title="Little things that make a visit easier" lead="Because comfort is part of care." />
          <div className="mt-12"><WellnessMenu /></div>
        </div>
      </section>

      {/* Specialties: pinned horizontal scroll on desktop, swipe on mobile */}
      <section className="pt-24" aria-labelledby="spec">
        <SpecialtiesScroller header={<SectionHeading eyebrow="Our specialties" title={<span id="spec">Expert teams for every part of your smile</span>} lead="Scroll to explore the nine areas of dentistry we offer." />} />
      </section>

      {/* Treatment finder */}
      <section className="container-page py-24">
        <SectionHeading eyebrow="Treatments" title="Find the care you need" lead="Pick a group, or tell us what is bothering you. Each guide is written in plain English." />
        <div className="mt-10"><TreatmentFinder /></div>
      </section>

      {/* Showcase */}
      <section className="container-page pb-24 pt-8">
        <Showcase rows={[
          { eyebrow: "Technology", title: "Tools that let you see what we see", body: "Modern equipment makes diagnosis clearer and treatment more precise, and helps us explain every step.", bullets: ["Digital X-rays with reduced radiation exposure", "Intraoral cameras, so you can see your own teeth", "3D imaging for complex procedures", "Laser treatments where they suit the case"], image: "/images/intraoral-scanner.jpg", alt: "Dentist scanning a patient's teeth with an intraoral scanner", cta: { href: "/treatments/digital-dentistry", label: "Digital dentistry" } },
          { eyebrow: "Comfort", title: "Designed so you can actually relax", body: "We want every dental visit to be a positive and comfortable experience, from the chair to the little extras.", bullets: ["Plush chairs, cosy blankets and supportive neck pillows", "Shows or music while you are treated", "Refreshments and aromatherapy", "Oral conscious sedation for anxious patients"], image: "/images/clinic-chair.jpg", alt: "Dental chair in a bright treatment room", cta: { href: "/treatments/sedation-dentistry", label: "Sedation dentistry" } },
        ]} />
      </section>

      {/* Team */}
      <section className="overflow-hidden bg-cocoa py-24 on-dark">
        <div className="container-page">
          <SectionHeading eyebrow="Our team" title="Meet the Smile Architects" lead="Ten clinicians covering every discipline, from endodontics and implants to orthodontics and gum care." />
          <div className="mt-10"><DoctorCarousel doctors={team} dark /></div>
          <div className="mt-6"><ActionLink href="/doctors" variant="outline-light" arrow>See the whole team</ActionLink></div>
        </div>
      </section>

      {/* Journey */}
      <section className="container-page grid gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Your first visit" title="Four calm steps from booking to treatment" lead="No surprises: you will know the plan and the cost before we begin." />
          <div className="mt-8"><ActionLink href="/first-visit" variant="secondary" arrow>What to expect</ActionLink></div>
        </div>
        <div className="lg:col-span-7"><FirstVisitSteps /></div>
      </section>

      <GoogleReviews />

      {/* FAQ */}
      <section className="bg-sand/60 py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="FAQ" title="Questions we hear often" lead="Can't find your answer? Message us on WhatsApp." /></div>
          <div className="lg:col-span-8"><FaqList faqs={generalFaqs} /></div>
        </div>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: generalFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      </section>

      {/* Visit */}
      <section className="container-page py-24">
        <SectionHeading eyebrow="Visit us" title="Two branches, one standard of care" />
        <div className="mt-10"><VisitUs /></div>
      </section>

      {/* Final CTA */}
      <section className="container-page pb-24">
        <div className="on-dark relative overflow-hidden rounded-[2.5rem] bg-cocoa px-6 py-16 text-center md:px-16 md:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-6 text-[clamp(3rem,10vw,8rem)] leading-none"><Marquee outline items={["Your smile.", "In expert hands.", "Your smile.", "In expert hands."]} /></div>
          <div className="relative z-10 pt-16 md:pt-24">
            <h2 className="mx-auto max-w-2xl !text-white">Your smile, in <span className="text-peach">expert hands.</span></h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ActionLink book variant="light" magnetic arrow>Book appointment</ActionLink>
              <ActionLink href={telHref()} event="click_call" variant="outline-light"><Phone size={18} aria-hidden /> Call {site.phone}</ActionLink>
              <ActionLink href={whatsappHref()} event="click_whatsapp" variant="outline-light"><MessageCircle size={18} aria-hidden /> WhatsApp</ActionLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
