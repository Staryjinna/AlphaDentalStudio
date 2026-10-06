import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { Logo } from "./Logo";
import { TodoBadge } from "./Todo";
import { Spotlight } from "./Spotlight";
import { branches, formatAddress, site, telHref } from "@/content/site";
import { treatmentGroups } from "@/content/treatment-groups";
import { treatments } from "@/content/treatments";
import { isPlaceholder } from "@/lib/placeholder";
import { mainNav } from "@/content/nav";

export function Footer() {
  return (
    <Spotlight as="div" className="mesh-dark on-dark grain mt-0 overflow-hidden pb-28 pt-20 md:pb-12">
      <footer className="container-page relative z-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo white />
            <p className="mt-5 font-heading text-2xl text-white">{site.tagline}</p>
            <ul className="mt-6 flex gap-3">
              <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="glass-dark flex h-12 w-12 items-center justify-center rounded-full text-white hover:bg-white/20"><InstagramIcon /></a></li>
              <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="glass-dark flex h-12 w-12 items-center justify-center rounded-full text-white hover:bg-white/20"><FacebookIcon /></a></li>
              {isPlaceholder(site.social.youtube) && <li className="self-center"><TodoBadge label="TODO: YouTube" /></li>}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-base text-white/85"><Clock size={16} aria-hidden className="text-champagne" /> {site.hoursLabel} · {site.sundayLabel}</p>
          </div>

          {/* NAP: kept identical to site.ts on every page */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {branches.map((b) => (
              <address key={b.id} className="glass-dark hairline rounded-2xl p-5 text-base not-italic leading-relaxed text-white/90">
                <p className="flex items-center gap-2 font-heading text-lg font-semibold text-white"><MapPin size={16} aria-hidden className="text-champagne" /> {site.name}, {b.name}</p>
                {formatAddress(b).map((l) => <p key={l}>{l}</p>)}
                <p className="mt-2"><a href={telHref(b.phone)} className="inline-flex items-center gap-2 font-semibold text-white underline underline-offset-4"><Phone size={14} aria-hidden /> {b.phone}</a></p>
              </address>
            ))}
            <p className="text-base text-white/85 sm:col-span-2">
              <Mail size={14} aria-hidden className="mr-2 inline text-champagne" />
              <a href={`mailto:${site.email}`} className="text-white underline underline-offset-4">{site.email}</a>
              <span className="mx-2 text-white/40">·</span>
              <a href={telHref(site.landline)} className="text-white underline underline-offset-4">{site.landline}</a>
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-lg font-semibold text-white">Treatments</p>
            <ul className="mt-3 space-y-1 text-base">
              {treatmentGroups.map((g) => <li key={g.id}><Link href={`/treatments#${g.id}`} className="inline-block py-1 text-white/85 hover:text-champagne">{g.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-white">Explore</p>
            <ul className="mt-3 space-y-1 text-base">
              {[...mainNav, { href: "/about", label: "About" }, { href: "/book", label: "Book" }].map((n) => (
                <li key={n.href}><Link href={n.href} className="inline-block py-1 text-white/85 hover:text-champagne">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2">
            <p className="font-heading text-lg font-semibold text-white">Popular</p>
            <ul className="mt-3 grid gap-x-6 text-base sm:grid-cols-2">
              {["dental-implants", "root-canal-treatment", "invisalign-clear-aligners", "braces", "teeth-whitening", "gum-treatment"].map((slug) => {
                const t = treatments.find((x) => x.slug === slug)!;
                return <li key={slug}><Link href={`/treatments/${slug}`} className="inline-block py-1 text-white/85 hover:text-champagne">{t.title}</Link></li>;
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/75">
          <p>Patients visit us from {site.areasServed.join(", ")}.</p>
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
            <Link href="/privacy" className="underline">Privacy</Link>
            <Link href="/terms" className="underline">Terms</Link>
          </p>
          <p className="mt-3">Information on this site is general and not a substitute for an in-person examination.</p>
        </div>
      </footer>
    </Spotlight>
  );
}
