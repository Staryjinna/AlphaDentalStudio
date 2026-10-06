import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowUpRight, Check, Clock, MessageCircle, Repeat } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { BookingForm } from "@/components/BookingForm";
import { DoctorAvatar } from "@/components/DoctorAvatar";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TreatmentCard } from "@/components/TreatmentCard";
import { FaqList } from "@/components/sections/FaqList";
import { TodoBadge } from "@/components/Todo";
import { isDev } from "@/lib/placeholder";
import { JsonLd } from "@/lib/jsonld";
import { seo } from "@/lib/seo";
import { doctors, getDoctor } from "@/content/doctors";
import { site, whatsappHref } from "@/content/site";
import { getTreatment, groupOf, treatments } from "@/content/treatments";

export const dynamicParams = false;
export function generateStaticParams() { return treatments.map((t) => ({ slug: t.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTreatment((await params).slug);
  if (!t) return {};
  return seo({
    title: t.h1.endsWith("R.A. Puram") ? `${t.h1} | Alpha Dental Studio` : `${t.h1} | Alpha Dental Studio, R.A. Puram`,
    description: `${t.promise} ${t.keyword[0].toUpperCase()}${t.keyword.slice(1)} at Alpha Dental Studio, R.A. Puram and Kottivakkam. Book online or WhatsApp.`.slice(0, 300),
    path: `/treatments/${t.slug}`,
    image: `/images/${t.image}.jpg`,
  });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTreatment((await params).slug);
  if (!t) notFound();
  const group = groupOf(t);
  const docs = t.doctors.map(getDoctor).filter((d): d is NonNullable<typeof d> => !!d);
  const related = t.related.map((s) => treatments.find((x) => x.slug === s)).filter((x): x is NonNullable<typeof x> => !!x).slice(0, 3);
  const reviewer = t.reviewConfirmed && t.reviewedBy ? getDoctor(t.reviewedBy) : undefined;
  const hasCost = t.costFrom != null && t.costTo != null;

  return (
    <>
      <PageHeader
        trail={[{ name: "Treatments", href: "/treatments" }, { name: t.title, href: `/treatments/${t.slug}` }]}
        eyebrow={group.title}
        title={t.h1}
        lead={t.promise}
        aside={
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="arch hairline relative h-full bg-night-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/.7)]">
              <Image src={`/images/${t.image}.jpg`} alt={t.imageAlt} fill priority sizes="(min-width:1024px) 400px, 80vw" className="object-cover" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-brand-600/10" />
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <ActionLink href={`/book?treatment=${t.slug}`} magnetic arrow>Book appointment</ActionLink>
          <ActionLink href={whatsappHref(`Hello Alpha Dental Studio, I'd like to know more about ${t.title.toLowerCase()}.`)} event="click_whatsapp" variant="glass"><MessageCircle size={18} aria-hidden /> WhatsApp us</ActionLink>
        </div>
        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/60">Performed by</p>
          {docs.length ? (
            <ul className="mt-3 flex flex-wrap gap-3">
              {docs.map((d) => (
                <li key={d.slug}>
                  <Link href={`/doctors/${d.slug}`} className="glass-dark flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 text-white transition-colors hover:bg-white/20">
                    <DoctorAvatar doctor={d} className="h-10 w-10 rounded-full [&_span]:text-sm" sizes="40px" />
                    <span className="text-base font-medium">{d.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-base text-white/85">Our clinical team. <Link href="/contact" className="text-champagne underline underline-offset-4">Ask which specialist suits you</Link>.{isDev && <TodoBadge label="TODO: assign doctor" />}</p>
          )}
        </div>
      </PageHeader>

      <article className="container-page py-16">
        <Reveal className="max-w-3xl"><p className="text-xl leading-relaxed text-ink">{t.intro}</p></Reveal>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-base"><Repeat size={16} className="text-brand-600" aria-hidden /> {t.visits}</span>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-base"><Clock size={16} className="text-brand-600" aria-hidden /> {t.duration}</span>
        </div>

        {/* Is this right for you? */}
        <section className="mt-20" aria-labelledby="signs">
          <SectionHeading eyebrow="Is this right for you?" title={<span id="signs">Signs you may need {t.title.toLowerCase()}</span>} />
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.signs.map((s, i) => (
              <li key={s}><Reveal delay={i * 0.05} className="h-full"><div className="card flex h-full gap-4 p-5"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600"><Check size={18} aria-hidden /></span><p className="text-base">{s}</p></div></Reveal></li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section className="mt-24" aria-labelledby="how">
          <SectionHeading eyebrow="The process" title={<span id="how">{t.title} at Alpha Dental Studio: how it works</span>} />
          <ol className="mt-10 grid gap-5 md:grid-cols-2">
            {t.steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="card relative h-full overflow-hidden p-6">
                    <span aria-hidden className="absolute -right-2 -top-6 font-heading text-[7rem] font-semibold leading-none text-brand-100">{i + 1}</span>
                    <h3 className="relative">{s.title}</h3>
                    <p className="relative mt-2 text-base text-muted">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* Benefits + things to know */}
        <section className="mt-24 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="mesh-dark on-dark grain relative h-full overflow-hidden rounded-3xl p-8">
              <h2 className="relative !text-white !text-3xl">Benefits</h2>
              <ul className="relative mt-5 space-y-3">{t.benefits.map((b) => <li key={b} className="flex gap-3 text-base text-white/90"><Check size={20} className="mt-0.5 shrink-0 text-mint" aria-hidden /> {b}</li>)}</ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full p-8">
              <h2 className="!text-3xl">Things to know</h2>
              <ul className="mt-5 space-y-3">{t.thingsToKnow.map((b) => <li key={b} className="flex gap-3 text-base"><AlertCircle size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden /> {b}</li>)}</ul>
            </div>
          </Reveal>
        </section>

        {/* Cost: hidden until the clinic supplies a range */}
        {hasCost ? (
          <Reveal className="mt-16"><div className="glass hairline rounded-3xl p-8 text-center"><p className="eyebrow">Cost</p><p className="mt-2 font-heading text-4xl text-brand-900">₹{t.costFrom!.toLocaleString("en-IN")}–₹{t.costTo!.toLocaleString("en-IN")}</p><p className="mt-2 text-base text-muted">Exact cost after examination; ₹{site.consultationFee} consultation.</p></div></Reveal>
        ) : isDev ? (
          <p className="mt-16 rounded-2xl border-2 border-dashed border-amber-400 p-4 text-base">Cost range hidden <TodoBadge label="TODO: costFrom / costTo" /></p>
        ) : null}

        {/* FAQs */}
        <section className="mt-24 grid gap-10 lg:grid-cols-12" aria-labelledby="faq">
          <div className="lg:col-span-4"><SectionHeading eyebrow="FAQs" title={<span id="faq">Common questions about {t.title.toLowerCase()}</span>} /></div>
          <div className="lg:col-span-8"><FaqList faqs={t.faqs} /></div>
        </section>

        {/* Doctors + related */}
        {related.length > 0 && (
          <section className="mt-24">
            <SectionHeading eyebrow="Related treatments" title="You may also want to read" />
            <ul className="mt-8 grid gap-5 md:grid-cols-3">{related.map((r) => <li key={r.slug}><TreatmentCard t={r} /></li>)}</ul>
          </section>
        )}

        {/* Booking */}
        <section className="mt-24 grid gap-10 lg:grid-cols-12" aria-labelledby="book">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Book" title={<span id="book">Book {t.title.toLowerCase()}</span>} lead={`Request an appointment and we'll call or WhatsApp you. Consultation ₹${site.consultationFee}; we explain your options and cost before we begin.`} />
            <ActionLink href="/contact" variant="ghost" arrow className="mt-4">Find a branch</ActionLink>
          </div>
          <div className="lg:col-span-7"><BookingForm treatment={t.slug} doctor={docs[0]?.slug} /></div>
        </section>

        <footer className="mt-16 border-t border-ink/10 pt-6 text-sm text-muted">
          <p>Information is general and not a substitute for an in-person examination.</p>
          <p className="mt-1">
            {reviewer ? <>Reviewed by {reviewer.name}, {reviewer.degrees}. </> : isDev ? <>Medical review pending <TodoBadge label="TODO: confirm reviewer" /> </> : null}
            Last updated {fmt(t.lastReviewed)}.
          </p>
        </footer>
      </article>

      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "MedicalProcedure", name: t.title, description: t.intro, url: `${site.url}/treatments/${t.slug}`, procedureType: "https://schema.org/NoninvasiveProcedure", howPerformed: t.steps.map((s) => s.body).join(" ") },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ]} />
    </>
  );
}
