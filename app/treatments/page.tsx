import { PageHeader } from "@/components/PageHeader";
import { TreatmentsHub } from "@/components/sections/TreatmentsHub";
import { ActionLink } from "@/components/ActionLink";
import { whatsappHref } from "@/content/site";
import { treatments } from "@/content/treatments";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: "Dental Treatments in Chennai | Alpha Dental Studio, R.A. Puram",
  description: "Implants, root canal, Invisalign, braces, gum care, cosmetic and sedation dentistry in Chennai. Specialist-led care at R.A. Puram and Kottivakkam.",
  path: "/treatments",
});

export default function Treatments() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Treatments", href: "/treatments" }]}
        eyebrow="Treatments"
        title="Dental treatments, led by the right specialist"
        lead={`${treatments.length} treatment guides in seven groups, written in plain English. Not sure where to start? Book a consultation and we will guide you.`}
      >
        <div className="flex flex-wrap gap-3"><ActionLink book arrow>Book appointment</ActionLink><ActionLink href={whatsappHref()} event="click_whatsapp" variant="secondary">Ask on WhatsApp</ActionLink></div>
      </PageHeader>
      <section className="container-page py-16"><TreatmentsHub /></section>
    </>
  );
}
