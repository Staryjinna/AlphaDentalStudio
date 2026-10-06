import { Armchair, Coffee, Music, ScanLine, Sparkles, Waves } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { PageHeader } from "@/components/PageHeader";
import { ParallaxImage } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltCard } from "@/components/TiltCard";
import { DoctorCarousel } from "@/components/sections/DoctorCarousel";
import { doctors } from "@/content/doctors";
import { branches, site } from "@/content/site";
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
      <PageHeader trail={[{ name: "About", href: "/about" }]} eyebrow="About us" title="Comprehensive care, with a touch of innovation" lead="From routine check-ups to advanced procedures, we make sure each visit supports both your health and your confidence." />

      <section className="container-page grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Our mission</p>
          <h2 className="mt-3">&ldquo;Every dental visit should be a positive and comfortable experience.&rdquo;</h2>
          <p className="mt-5 text-lg text-muted">We create a soothing atmosphere that puts your well-being first, and we build long-lasting relationships founded on trust and open communication.</p>
          <p className="mt-4 font-heading text-2xl text-brand-600">{site.tagline}</p>
        </Reveal>
        <Reveal delay={0.1}><ParallaxImage src="/images/clinic-chair.jpg" alt="Dental chair in a bright clinical treatment room" className="aspect-[4/3] rounded-[var(--radius)]" /></Reveal>
      </section>

      <section className="mesh-dark on-dark grain overflow-hidden py-20">
        <div className="container-page relative z-10">
          <SectionHeading dark eyebrow="Technology" title="Cutting-edge tools, used with care" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tech.map((x, i) => (
              <li key={x.t}><Reveal delay={i * 0.07} className="h-full"><TiltCard className="glass-dark hairline h-full rounded-2xl p-6"><x.icon className="text-champagne" size={28} aria-hidden /><h3 className="mt-4 !text-white">{x.t}</h3><p className="mt-1 text-base text-white/75">{x.d}</p></TiltCard></Reveal></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading eyebrow="Comfort" title="Designed to feel relaxed" lead="Small things make a big difference to how a dental visit feels." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {comfort.map((c, i) => (
            <li key={c.t}><Reveal delay={i * 0.06}><div className="card flex items-center gap-4 p-5"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-champagne"><c.icon size={22} aria-hidden /></span><p className="text-base font-medium">{c.t}</p></div></Reveal></li>
          ))}
        </ul>
      </section>

      <section className="container-page pb-20">
        <SectionHeading eyebrow="Two branches" title="Find us in Chennai" />
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {branches.map((b) => <li key={b.id} className="card p-6"><h3>{b.name}</h3><p className="mt-2 text-base text-muted">{b.address.line1}, {b.address.locality}, {b.address.city} {b.address.postalCode}</p></li>)}
        </ul>
      </section>

      <section className="container-page pb-24">
        <SectionHeading eyebrow="Our team" title="Meet the Smile Architects" />
        <div className="mt-8"><DoctorCarousel doctors={doctors} /></div>
        <div className="mt-6"><ActionLink href="/book" arrow>Book appointment</ActionLink></div>
      </section>
    </>
  );
}
