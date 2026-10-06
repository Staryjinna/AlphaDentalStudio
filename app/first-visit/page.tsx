import { Check, FileClock, HeartPulse, IdCard, Pill } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TodoBadge } from "@/components/Todo";
import { FirstVisitSteps } from "@/components/sections/FirstVisitSteps";
import { VisitUs } from "@/components/sections/VisitUs";
import { FaqList } from "@/components/sections/FaqList";
import { generalFaqs } from "@/content/faqs";
import { site, whatsappHref } from "@/content/site";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: "Your First Visit | Alpha Dental Studio, R.A. Puram, Chennai",
  description: "What to expect at your first visit to Alpha Dental Studio: consultation, digital check-up, a clear plan and cost, and treatment at your pace. Mon–Sat 10 AM–8 PM.",
  path: "/first-visit",
});

const bring = [
  { icon: IdCard, t: "A photo ID" },
  { icon: FileClock, t: "Previous dental records or X-rays, if you have them" },
  { icon: Pill, t: "A list of the medicines you take" },
  { icon: HeartPulse, t: "Details of any medical conditions or allergies" },
];

export default function FirstVisit() {
  return (
    <>
      <PageHeader trail={[{ name: "First visit", href: "/first-visit" }]} eyebrow="New patients" title="What to expect at your first visit" lead="A comprehensive consultation, a clear plan and no surprises.">
        <ul className="flex flex-wrap gap-3 text-base">
          <li className="rounded-full bg-white px-4 py-2">{site.hoursLabel}</li>
          <li className="rounded-full bg-white px-4 py-2">{site.sundayLabel}</li>
          <li className="rounded-full bg-white px-4 py-2">Consultation ₹{site.consultationFee}</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3"><ActionLink book magnetic arrow>Book appointment</ActionLink><ActionLink href={whatsappHref()} event="click_whatsapp" variant="secondary">WhatsApp us</ActionLink></div>
      </PageHeader>

      <section className="container-page max-w-3xl py-20"><FirstVisitSteps /></section>

      <section className="container-page grid gap-10 pb-20 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Before you come" title="What to bring" />
          <ul className="mt-8 space-y-3">
            {bring.map((b) => <li key={b.t}><Reveal><div className="card flex items-center gap-4 p-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sand text-cocoa"><b.icon size={20} aria-hidden /></span><p className="text-base">{b.t}</p></div></Reveal></li>)}
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow="Fees and payment" title="Know the cost first" />
          <Reveal><div className="card mt-8 space-y-3 p-6 text-base">
            <p className="flex gap-3"><Check size={20} className="mt-0.5 shrink-0 text-success" aria-hidden /> Consultation: ₹{site.consultationFee}.</p>
            <p className="flex gap-3"><Check size={20} className="mt-0.5 shrink-0 text-success" aria-hidden /> After your examination we explain your options and the cost of each before we begin.</p>
            <p className="flex gap-3"><Check size={20} className="mt-0.5 shrink-0 text-success" aria-hidden /> Payment methods and plans: please ask when you book.<TodoBadge label="TODO: payment methods / insurance" /></p>
          </div></Reveal>
          <p className="mt-6 text-base text-muted">Patients visit us from {site.areasServed.join(", ")}.</p>
        </div>
      </section>

      <section className="container-page pb-16"><VisitUs /></section>
      <section className="bg-sand/60 py-20"><div className="container-page grid gap-10 lg:grid-cols-12"><div className="lg:col-span-4"><SectionHeading eyebrow="FAQ" title="Before you visit" /></div><div className="lg:col-span-8"><FaqList faqs={generalFaqs} /></div></div></section>
    </>
  );
}
