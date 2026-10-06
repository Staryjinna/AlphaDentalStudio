import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DoctorAvatar } from "@/components/DoctorAvatar";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { doctors } from "@/content/doctors";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: "Our Dentists and Specialists in Chennai | Alpha Dental Studio",
  description: "Meet the clinicians at Alpha Dental Studio: endodontist, implantologist and oral surgeon, orthodontists, periodontist and dental surgeons in R.A. Puram and Kottivakkam, Chennai.",
  path: "/doctors",
});

export default function Doctors() {
  return (
    <>
      <PageHeader trail={[{ name: "Doctors", href: "/doctors" }]} eyebrow="Our team" title="The Smile Architects" lead={`${doctors.length} clinicians covering endodontics, implants and oral surgery, orthodontics, periodontics, cosmetic and general dentistry.`} />
      <section className="container-page py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d, i) => (
            <li key={d.slug}>
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <Link href={`/doctors/${d.slug}`} className="card card-hover group block overflow-hidden">
                    <DoctorAvatar doctor={d} className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-[1.03]" sizes="(min-width:1024px) 380px, 90vw" />
                    <div className="p-6">
                      <h2 className="!text-2xl">{d.name}</h2>
                      <p className="mt-0.5 text-sm font-semibold text-tan-deep">{d.degrees}</p>
                      <p className="mt-2 text-base text-muted">{d.role}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">{d.specialties.map((s) => <li key={s} className="rounded-full bg-sand px-3 py-1 text-sm text-cocoa">{s}</li>)}</ul>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-cocoa">View profile <ArrowUpRight size={16} aria-hidden /></span>
                    </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
