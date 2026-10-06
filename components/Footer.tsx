import Link from "next/link";
import { Logo } from "./Logo";
import { Field } from "./Todo";
import { fullAddress, site, telHref } from "@/content/site";
import { treatmentGroups } from "@/content/treatment-groups";
import { isPlaceholder } from "@/lib/placeholder";

const social = [
  { label: "Facebook", href: site.social.facebook },
  { label: "Instagram", href: site.social.instagram },
  { label: "YouTube", href: site.social.youtube },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-brand-900 pb-28 pt-16 text-white md:pb-12">
      <div className="container-page grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo white />
          <p className="mt-4 font-heading text-lg text-white/90">{site.tagline}</p>
          <ul className="mt-4 flex flex-wrap gap-x-4 text-base">
            {social.map((s) =>
              isPlaceholder(s.href) ? (
                <li key={s.label}>
                  <span className="text-white/60">{s.label}</span>
                  <Field value={s.href} label={s.label} />
                </li>
              ) : (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">
                    {s.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* NAP: must match site.ts exactly on every page */}
        <address className="text-base not-italic leading-relaxed text-white/90">
          <p className="font-heading text-lg font-semibold text-white">{site.name}</p>
          {fullAddress.map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p className="mt-3">
            <a href={telHref} className="font-semibold text-white underline underline-offset-4">{site.phone}</a>
          </p>
          <p><a href={`mailto:${site.email}`} className="text-white underline underline-offset-4">{site.email}</a></p>
          <p className="mt-3">{site.hoursLabel}</p>
          <p>Consultation ₹{site.consultationFee}</p>
        </address>

        <div>
          <p className="font-heading text-lg font-semibold">Treatments</p>
          <ul className="mt-3 space-y-1 text-base">
            {treatmentGroups.map((g) => (
              <li key={g.id}>
                <Link href={`/treatments#${g.id}`} className="inline-block py-1 text-white/90 hover:underline">{g.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-lg font-semibold">Explore</p>
          <ul className="mt-3 space-y-1 text-base">
            {[
              ["/doctors", "Our doctors"], ["/about", "About the studio"], ["/first-visit", "Your first visit"],
              ["/reviews", "Reviews"], ["/blog", "Dental guide"], ["/contact", "Contact"], ["/book", "Book appointment"],
            ].map(([href, label]) => (
              <li key={href}><Link href={href} className="inline-block py-1 text-white/90 hover:underline">{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page mt-12 border-t border-white/15 pt-6 text-sm text-white/75">
        <p>Patients visit us from {site.areasServed.join(", ")}.</p>
        <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <Link href="/privacy" className="underline">Privacy</Link>
          <Link href="/terms" className="underline">Terms</Link>
        </p>
        <p className="mt-3">Information on this site is general and not a substitute for an in-person examination.</p>
      </div>
    </footer>
  );
}
