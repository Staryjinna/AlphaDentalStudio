import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { BookingForm } from "@/components/BookingForm";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { VisitUs } from "@/components/sections/VisitUs";
import { branches, formatAddress, site, telHref, whatsappHref } from "@/content/site";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: "Contact Alpha Dental Studio | Dentist in R.A. Puram & Kottivakkam, Chennai",
  description: "Address, phone, WhatsApp, hours and map for Alpha Dental Studio at R.A. Puram and Kottivakkam, Chennai. Open Mon–Sat 10 AM–8 PM.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <PageHeader trail={[{ name: "Contact", href: "/contact" }]} eyebrow="Contact" title="Visit or call us" lead={`${site.hoursLabel} · ${site.sundayLabel} · Consultation ₹${site.consultationFee}`}>
        <div className="flex flex-wrap gap-3">
          <ActionLink href={telHref()} event="click_call" variant="secondary"><Phone size={18} aria-hidden /> {site.phone}</ActionLink>
          <ActionLink href={whatsappHref()} event="click_whatsapp" variant="secondary"><MessageCircle size={18} aria-hidden /> WhatsApp</ActionLink>
        </div>
      </PageHeader>

      <section className="container-page py-16">
        <ul className="grid gap-6 md:grid-cols-2">
          {branches.map((b, i) => (
            <li key={b.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <address className="card h-full p-7 not-italic">
                  <h2 className="!text-2xl flex items-center gap-2"><MapPin size={22} className="text-brown" aria-hidden /> {site.name}, {b.name}</h2>
                  <div className="mt-3 text-base text-muted">{formatAddress(b).map((l) => <p key={l}>{l}</p>)}{b.landmark && <p className="font-medium text-ink">{b.landmark}</p>}</div>
                  <p className="mt-4"><a href={telHref(b.phone)} className="inline-flex min-h-12 items-center gap-2 font-semibold text-cocoa underline underline-offset-4"><Phone size={16} aria-hidden /> {b.phone}</a></p>
                </address>
              </Reveal>
            </li>
          ))}
        </ul>
        <ul className="mt-6 grid gap-4 text-base sm:grid-cols-3">
          <li className="card flex items-center gap-3 p-5"><Clock size={20} className="text-brown" aria-hidden /> {site.hoursLabel}<br />{site.sundayLabel}</li>
          <li className="card flex items-center gap-3 p-5"><Mail size={20} className="text-brown" aria-hidden /> <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a></li>
          <li className="card flex items-center gap-3 p-5"><Phone size={20} className="text-brown" aria-hidden /> <a href={telHref(site.landline)} className="underline underline-offset-4">{site.landline}</a></li>
        </ul>
        <p className="mt-6 text-base text-muted">Patients visit us from {site.areasServed.join(", ")}.</p>
      </section>

      <section className="container-page pb-16"><VisitUs /></section>

      <section className="container-page grid gap-10 pb-12 md:pb-[4.5rem] lg:grid-cols-12">
        <div className="lg:col-span-5"><SectionHeading eyebrow="Message us" title="Request an appointment" lead="We'll call or WhatsApp you within 2 working hours (Mon–Sat)." /></div>
        <div className="lg:col-span-7"><BookingForm /></div>
      </section>
    </>
  );
}
