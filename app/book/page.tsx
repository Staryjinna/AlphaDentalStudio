import { CalendarCheck, Clock, MessageCircle, Phone } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { BookingFormFromUrl } from "@/components/BookingFormFromUrl";
import { PageHeader } from "@/components/PageHeader";
import { site, telHref, whatsappHref } from "@/content/site";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: "Book a Dental Appointment in Chennai | Alpha Dental Studio",
  description: "Request an appointment at Alpha Dental Studio, R.A. Puram or Kottivakkam, Chennai. We'll call or WhatsApp you to confirm. Open Mon–Sat 10 AM–8 PM.",
  path: "/book",
});

export default function Book() {
  return (
    <>
      <PageHeader trail={[{ name: "Book", href: "/book" }]} eyebrow="Book" title="Book your appointment" lead="Tell us what you need and when suits you. We'll call or WhatsApp to confirm your slot." />
      <section className="container-page grid gap-10 py-16 lg:grid-cols-12">
        <div className="lg:col-span-7"><BookingFormFromUrl /></div>
        <aside className="space-y-5 lg:col-span-5">
          <div className="card p-6">
            <h2 className="!text-2xl">Prefer to talk?</h2>
            <div className="mt-4 flex flex-col gap-3">
              <ActionLink href={telHref()} event="click_call" variant="secondary"><Phone size={18} aria-hidden /> {site.phone}</ActionLink>
              <ActionLink href={whatsappHref()} event="click_whatsapp" variant="secondary"><MessageCircle size={18} aria-hidden /> WhatsApp us</ActionLink>
            </div>
          </div>
          <ul className="card space-y-3 p-6 text-base">
            <li className="flex gap-3"><Clock size={20} className="mt-0.5 text-brown" aria-hidden /> {site.hoursLabel}. {site.sundayLabel}.</li>
            <li className="flex gap-3"><CalendarCheck size={20} className="mt-0.5 text-brown" aria-hidden /> Consultation ₹{site.consultationFee}. We explain options and cost before treatment.</li>
          </ul>
        </aside>
      </section>
    </>
  );
}
