import { ActionLink } from "@/components/ActionLink";
import { Marquee } from "@/components/Marquee";
import { SectionHeading } from "@/components/SectionHeading";
import { Hero } from "@/components/sections/Hero";
import { QuickHelp } from "@/components/sections/QuickHelp";
import { SpecialtiesSection } from "@/components/sections/SpecialtiesSection";
import { TreatmentFinder } from "@/components/sections/TreatmentFinder";
import { DoctorCarousel } from "@/components/sections/DoctorCarousel";
import { ReelsSection } from "@/components/sections/ReelsSection";
import { FirstVisitSteps } from "@/components/sections/FirstVisitSteps";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { FaqList } from "@/components/sections/FaqList";
import { VisitUs } from "@/components/sections/VisitUs";
import { WellnessMenu } from "@/components/sections/WellnessMenu";
import { JsonLd } from "@/lib/jsonld";
import { doctors } from "@/content/doctors";
import { generalFaqs } from "@/content/faqs";
import { site, telHref, whatsappHref } from "@/content/site";
import { MessageCircle, Phone } from "lucide-react";

export default function Home() {
  const team = [...doctors].sort((a, b) => Number(!!b.lead) - Number(!!a.lead));
  return (
    <>
      <Hero />
      <QuickHelp />

      <div className="mt-8 border-y border-cocoa/10 py-3 text-[clamp(1.5rem,5vw,3rem)] leading-none md:mt-12 md:py-4">
        <Marquee outline items={["Innovating smiles.", "Inspiring lives.", "Innovating smiles.", "Inspiring lives."]} />
      </div>

      {/* Specialties: 3D arc carousel (drag, tap, arrows, keys) */}
      <SpecialtiesSection />

      {/* Treatment finder */}
      <section className="container-page pb-12 md:pb-[4.5rem]">
        <SectionHeading eyebrow="Treatments" title="Find the care you need" lead="Pick a group. Every guide is written in plain English." />
        <div className="mt-6"><TreatmentFinder /></div>
      </section>

      {/* Team */}
      <section className="on-dark overflow-hidden bg-cocoa py-12 md:py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Our team" title="Meet the Smile Architects" lead="Ten clinicians covering every discipline." />
          <div className="mt-6"><DoctorCarousel doctors={team} dark /></div>
          <div className="mt-4"><ActionLink href="/doctors" variant="outline-light" arrow>See the whole team</ActionLink></div>
        </div>
      </section>

      {/* Real stories and tips from the clinic's Instagram */}
      <section className="overflow-hidden bg-sand/70 py-12 md:py-16" aria-labelledby="stories">
        <div className="container-page">
          <SectionHeading eyebrow="Real stories" title={<span id="stories">Real patients, real smiles</span>} lead="Hear from patients in their own words, and pick up simple tips from our team." />
          <div className="mt-6"><ReelsSection /></div>
        </div>
      </section>

      <GoogleReviews />

      {/* First visit */}
      <section className="container-page py-12 md:py-16">
        <SectionHeading eyebrow="Your first visit" title="Four calm steps from booking to treatment" lead="No surprises: you will know the plan and the cost before we begin." />
        <div className="mt-8"><FirstVisitSteps /></div>
        <div className="mt-6"><ActionLink href="/first-visit" variant="secondary" arrow>What to expect</ActionLink></div>
      </section>

      {/* FAQ */}
      <section className="bg-sand/60 py-12 md:py-16">
        <div className="container-page grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="FAQ" title="Questions we hear often" lead="Can't find your answer? Message us on WhatsApp." /></div>
          <div className="lg:col-span-8"><FaqList faqs={generalFaqs} /></div>
        </div>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: generalFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      </section>

      {/* Visit */}
      <section className="container-page py-12 md:py-16">
        <SectionHeading eyebrow="Visit us" title="Two branches in Chennai" />
        <div className="mt-6"><VisitUs /></div>
      </section>

      {/* The ADS Wellness Menu */}
      <section className="pb-12 md:pb-16">
        <div className="container-page">
          <SectionHeading eyebrow="The ADS wellness menu" title="Little things that make a visit easier" />
          <div className="mt-6"><WellnessMenu /></div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page pb-12 md:pb-16">
        <div className="on-dark relative overflow-hidden rounded-[2rem] bg-cocoa px-5 py-10 text-center md:px-14 md:py-16">
          <h2 className="mx-auto max-w-xl !text-white">Your smile, in <span className="text-peach">expert hands.</span></h2>
          <p className="mx-auto mt-2 max-w-md text-white/75">{site.hoursLabel} · {site.sundayLabel}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <ActionLink book variant="light" magnetic arrow>Book appointment</ActionLink>
            <ActionLink href={telHref()} event="click_call" variant="outline-light"><Phone size={18} aria-hidden /> Call</ActionLink>
            <ActionLink href={whatsappHref()} event="click_whatsapp" variant="outline-light"><MessageCircle size={18} aria-hidden /> WhatsApp</ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}
