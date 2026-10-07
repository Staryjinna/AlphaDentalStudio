import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { TodoBadge } from "./Todo";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { ActionLink } from "./ActionLink";
import { branches, formatAddress, site, telHref } from "@/content/site";
import { treatmentGroups } from "@/content/treatment-groups";
import { treatments } from "@/content/treatments";
import { isPlaceholder } from "@/lib/placeholder";
import { mainNav } from "@/content/nav";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-cocoa pb-24 pt-12 md:pb-10">
      <div aria-hidden className="pointer-events-none absolute -bottom-10 left-1/2 w-[140%] -translate-x-1/2 select-none text-center text-[clamp(4rem,15vw,13rem)] font-semibold leading-none tracking-tight outline-text opacity-60">ALPHA DENTAL</div>
      <div className="container-page relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo onDark />
            <p className="mt-5 text-xl font-semibold leading-snug text-white">{site.tagline}</p>
            <p className="mt-4 flex items-center gap-2 text-base text-white/80"><Clock size={16} aria-hidden className="text-peach" /> {site.hoursLabel} · {site.sundayLabel}</p>
            <ul className="mt-6 flex items-center gap-3">
              <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white hover:bg-peach hover:text-cocoa"><InstagramIcon /></a></li>
              <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white hover:bg-peach hover:text-cocoa"><FacebookIcon /></a></li>
              {isPlaceholder(site.social.youtube) && <li><TodoBadge label="TODO: YouTube" /></li>}
            </ul>
            <div className="mt-8"><ActionLink book variant="light" arrow>Book appointment</ActionLink></div>
          </div>

          {/* NAP: kept identical to site.ts on every page */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {branches.map((b) => (
              <address key={b.id} className="rounded-3xl border border-white/15 p-5 text-[0.95rem] not-italic leading-relaxed text-white/85">
                <p className="flex items-center gap-2 text-lg font-semibold text-white"><MapPin size={16} aria-hidden className="text-peach" /> {site.name}, {b.name}</p>
                <div className="mt-2">{formatAddress(b).map((l) => <p key={l}>{l}</p>)}</div>
                <p className="mt-3"><a href={telHref(b.phone)} className="inline-flex min-h-11 items-center gap-2 font-semibold text-white underline underline-offset-4"><Phone size={14} aria-hidden /> {b.phone}</a></p>
              </address>
            ))}
            <p className="text-base text-white/85 sm:col-span-2">
              <Mail size={14} aria-hidden className="mr-2 inline text-peach" />
              <a href={`mailto:${site.email}`} className="text-white underline underline-offset-4">{site.email}</a>
              <span className="mx-2 text-white/40">·</span>
              <a href={telHref(site.landline)} className="text-white underline underline-offset-4">{site.landline}</a>
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-8 lg:grid-cols-4">
          <div>
            <p className="font-semibold text-white">Treatments</p>
            <ul className="mt-3 text-base">{treatmentGroups.map((g) => <li key={g.id}><Link href={`/treatments#${g.id}`} className="inline-block py-1 text-white/80 hover:text-peach">{g.title}</Link></li>)}</ul>
          </div>
          <div>
            <p className="font-semibold text-white">Explore</p>
            <ul className="mt-3 text-base">{[{ href: "/about", label: "About" }, ...mainNav, { href: "/book", label: "Book" }].map((n) => <li key={n.href}><Link href={n.href} className="inline-block py-1 text-white/80 hover:text-peach">{n.label}</Link></li>)}</ul>
          </div>
          <div className="col-span-2">
            <p className="font-semibold text-white">Popular</p>
            <ul className="mt-3 grid gap-x-6 text-base sm:grid-cols-2">
              {["dental-implants", "root-canal-treatment", "invisalign-clear-aligners", "braces", "teeth-whitening", "gum-treatment"].map((slug) => {
                const t = treatments.find((x) => x.slug === slug)!;
                return <li key={slug}><Link href={`/treatments/${slug}`} className="inline-block py-1 text-white/80 hover:text-peach">{t.title}</Link></li>;
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/70">
          <p>Patients visit us from {site.areasServed.join(", ")}.</p>
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
            <Link href="/privacy" className="underline">Privacy</Link>
            <Link href="/terms" className="underline">Terms</Link>
          </p>
          <p className="mt-3">Information on this site is general and not a substitute for an in-person examination.</p>
        </div>
      </div>
    </footer>
  );
}
