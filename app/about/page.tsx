import Image from "next/image";
import { Armchair, Coffee, Music, ScanLine, Sparkles, Waves } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { Marquee } from "@/components/Marquee";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { DoctorCarousel } from "@/components/sections/DoctorCarousel";
import { WellnessMenu } from "@/components/sections/WellnessMenu";
import { doctors } from "@/content/doctors";
import { branches, formatAddress, site } from "@/content/site";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: "About Alpha Dental Studio | Dental Clinic in R.A. Puram, Chennai",
  description: "Alpha Dental Studio offers comprehensive dental care with a touch of innovation, from routine check-ups to advanced procedures, at R.A. Puram and Kottivakkam, Chennai.",
  path: "/about",
});

const tech = [
  { icon: ScanLine, t: "Digital X-rays", d: "Reduced radiation exposure." },
  { icon: Sparkles, t: "Intraoral cameras", d: "See your own teeth on screen." },
  { icon: Waves, t: "Laser treatments", d: "Gentle options for suitable procedures." },
  { icon: ScanLine, t: "3D imaging", d: "For complex procedures such as implants." },
];
const comfort = [
  { icon: Armchair, t: "Plush chairs, blankets and neck pillows" },
  { icon: Music, t: "Shows or music while you are treated" },
  { icon: Coffee, t: "Refreshment beverages" },
  { icon: Sparkles, t: "A personalised comfort menu, including aromatherapy" },
];

export default function About() {
  return (
    <>
      <PageHeader
        trail={[{ name: "About", href: "/about" }]} eyebrow="About us" title="Comprehensive care, with a touch of innovation"
        lead="From routine check-ups to advanced procedures, we make sure each visit supports both your health and your confidence."
        aside={<div className="relative mx-auto aspect-[4/5] w-full max-w-xs lg:max-w-sm"><div className="relative h-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-cocoa-2 shadow-[0_30px_60px_-25px_rgb(62_38_16/.55)]"><Image src="/images/clinic/clinic-work.jpg" alt="A dentist at Alpha Dental Studio treating a patient" fill priority sizes="(min-width:1024px) 380px, 80vw" className="object-cover" /></div></div>}
      />

      <section className="container-page py-20">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Our mission</p>
          <h2 className="mt-3">&ldquo;Every dental visit should be a positive and comfortable experience.&rdquo;</h2>
          <p className="mt-5 text-lg text-muted">We create a soothing atmosphere that puts your well-being first, and we build long-lasting relationships founded on trust and open communication.</p>
        </Reveal>
      </section>

      <div className="border-y border-cocoa/10 py-5 text-[clamp(2rem,6vw,4.5rem)] leading-none"><Marquee outline items={["Innovating smiles.", "Inspiring lives.", "Innovating smiles.", "Inspiring lives."]} /></div>

      <section className="on-dark bg-cocoa py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Technology" title="Cutting-edge tools, used with care" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tech.map((x, i) => (
              <li key={x.t}><Reveal delay={i * 0.07} className="h-full"><div className="h-full rounded-[2rem] border border-white/15 p-6 transition-colors hover:bg-white/5"><x.icon className="text-peach" size={28} aria-hidden /><h3 className="mt-4 !text-white">{x.t}</h3><p className="mt-1 text-base text-white/75">{x.d}</p></div></Reveal></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading eyebrow="Comfort" title="Designed to feel relaxed" lead="Small things make a big difference to how a dental visit feels." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {comfort.map((c, i) => (
            <li key={c.t}><Reveal delay={i * 0.06}><div className="card flex items-center gap-4 p-5"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-peach text-cocoa"><c.icon size={22} aria-hidden /></span><p className="text-base font-medium">{c.t}</p></div></Reveal></li>
          ))}
        </ul>
      </section>

      <section className="bg-sand/60 py-20"><div className="container-page"><SectionHeading eyebrow="The ADS wellness menu" title="Little things that make a visit easier" /><div className="mt-10"><WellnessMenu /></div></div></section>

      <section className="container-page py-20">
        <SectionHeading eyebrow="Two branches" title="Find us in Chennai" />
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {branches.map((b) => <li key={b.id} className="card p-6"><h3>{site.name}, {b.name}</h3><p className="mt-2 text-base text-muted">{formatAddress(b).join(", ")}</p></li>)}
        </ul>
      </section>

      <section className="container-page overflow-hidden pb-24">
        <SectionHeading eyebrow="Our team" title="Meet the Smile Architects" />
        <div className="mt-8"><DoctorCarousel doctors={doctors} /></div>
        <div className="mt-6"><ActionLink book arrow>Book appointment</ActionLink></div>
      </section>
    </>
  );
}
