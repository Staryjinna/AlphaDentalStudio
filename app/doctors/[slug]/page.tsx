import { notFound } from "next/navigation";
import { Award, Globe, IdCard, Quote } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { DoctorAvatar } from "@/components/DoctorAvatar";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TreatmentCard } from "@/components/TreatmentCard";
import { TodoBadge } from "@/components/Todo";
import { isDev } from "@/lib/placeholder";
import { JsonLd } from "@/lib/jsonld";
import { seo } from "@/lib/seo";
import { doctors, getDoctor } from "@/content/doctors";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";

export const dynamicParams = false;
export function generateStaticParams() { return doctors.map((d) => ({ slug: d.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDoctor((await params).slug);
  if (!d) return {};
  return seo({
    title: `${d.name}, ${d.role.split(" & ")[0]} in Chennai | Alpha Dental Studio`,
    description: `${d.name} (${d.degrees}), ${d.role} at Alpha Dental Studio, Chennai. Book an appointment at R.A. Puram or Kottivakkam.`,
    path: `/doctors/${d.slug}`,
    image: d.photo,
  });
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDoctor((await params).slug);
  if (!d) notFound();
  const tx = d.treatments.map((s) => treatments.find((t) => t.slug === s)).filter((t): t is NonNullable<typeof t> => !!t);
  const rows: { icon: typeof Award; label: string; value?: string | number | string[] }[] = [
    { icon: Award, label: "Qualifications", value: d.degrees },
    { icon: IdCard, label: "Registration no.", value: d.registrationNo },
    { icon: Award, label: "Experience", value: d.experienceYears ? `${d.experienceYears} years` : undefined },
    { icon: Globe, label: "Languages", value: d.languages?.join(", ") },
  ];
  return (
    <>
      <PageHeader
        trail={[{ name: "Doctors", href: "/doctors" }, { name: d.name, href: `/doctors/${d.slug}` }]}
        eyebrow={d.role}
        title={d.name}
        lead={d.specialties.join(" · ")}
        aside={
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="relative h-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-cocoa-2 shadow-[0_30px_60px_-25px_rgb(62_38_16/.55)]">
              <DoctorAvatar doctor={d} className="h-full w-full" priority sizes="(min-width:1024px) 400px, 80vw" />
            </div>
          </div>
        }
      />
      <div className="container-page py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="card p-7">
              <h2 className="!text-2xl">Credentials</h2>
              <dl className="mt-5 space-y-4">
                {rows.map((r) => {
                  const has = r.value != null && r.value !== "";
                  if (!has && !isDev) return null; // hidden in production until the clinic supplies it
                  return (
                    <div key={r.label} className="flex gap-3">
                      <r.icon size={20} className="mt-1 shrink-0 text-brown" aria-hidden />
                      <div><dt className="text-sm text-muted">{r.label}</dt><dd className="text-base font-medium text-ink">{has ? String(r.value) : <TodoBadge label={`TODO: ${r.label}`} />}</dd></div>
                    </div>
                  );
                })}
              </dl>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            {d.quote && (
              <figure className="on-dark relative overflow-hidden rounded-[2rem] bg-cocoa p-8 md:p-10">
                <Quote size={36} className="text-peach" aria-hidden />
                <blockquote className="mt-3 text-2xl font-medium leading-snug text-white">&ldquo;{d.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-base text-white/75">{d.name}</figcaption>
              </figure>
            )}
            {d.bio ? <p className="mt-6 text-lg">{d.bio}</p> : isDev ? <p className="mt-6 rounded-2xl border-2 border-dashed border-amber-400 p-4 text-base">Bio <TodoBadge label="TODO: 80–120 words from the doctor" /></p> : null}
          </Reveal>
        </div>

        {tx.length > 0 && (
          <section className="mt-20">
            <SectionHeading eyebrow="Treatments" title={`Treatments by ${d.name}`} />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{tx.map((t) => <li key={t.slug}><TreatmentCard t={t} /></li>)}</ul>
          </section>
        )}

        <section className="mt-24 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5"><SectionHeading eyebrow="Book" title={`Book with ${d.name}`} lead="Request a slot and we will call or WhatsApp you to confirm." /></div>
          <div className="lg:col-span-7"><BookingForm doctor={d.slug} treatment={tx[0]?.slug} /></div>
        </section>
      </div>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Physician", name: d.name, url: `${site.url}/doctors/${d.slug}`,
        jobTitle: d.role, medicalSpecialty: d.specialties, ...(d.photo ? { image: `${site.url}${d.photo}` } : {}),
        worksFor: { "@type": "Dentist", name: site.name, url: site.url },
      }} />
    </>
  );
}
