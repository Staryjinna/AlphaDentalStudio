"use client";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { doctors } from "@/content/doctors";
import { site, telHref } from "@/content/site";
import { treatments } from "@/content/treatments";

export default function NotFound() {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const hits = term
    ? [
        ...treatments.filter((t) => `${t.title} ${t.keyword}`.toLowerCase().includes(term)).map((t) => ({ href: `/treatments/${t.slug}`, label: t.title })),
        ...doctors.filter((d) => `${d.name} ${d.role}`.toLowerCase().includes(term)).map((d) => ({ href: `/doctors/${d.slug}`, label: d.name })),
      ].slice(0, 8)
    : [];
  return (
    <section className="mesh-dark on-dark grain min-h-screen overflow-hidden pt-36">
      <div className="container-page relative z-10 max-w-2xl pb-24">
        <p className="eyebrow-dark eyebrow">404</p>
        <h1 className="mt-3 !text-white">We couldn&apos;t find that page</h1>
        <p className="mt-4 text-lg text-white/80">Try a search, pick a popular treatment, or get in touch.</p>
        <form role="search" className="mt-8" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="nf-search" className="sr-only">Search treatments and doctors</label>
          <div className="glass flex items-center gap-3 rounded-full px-5">
            <Search size={20} className="text-brand-600" aria-hidden />
            <input id="nf-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search treatments or doctors" className="min-h-14 w-full bg-transparent text-base text-ink placeholder:text-muted focus:outline-none" />
          </div>
        </form>
        {hits.length > 0 && <ul className="glass mt-3 rounded-3xl p-2">{hits.map((h) => <li key={h.href}><Link href={h.href} className="block rounded-2xl px-4 py-3 text-base text-ink hover:bg-brand-100">{h.label}</Link></li>)}</ul>}
        <p className="mt-10 font-heading text-xl text-white">Popular treatments</p>
        <ul className="mt-3 flex flex-wrap gap-3">
          {["dental-implants", "root-canal-treatment", "invisalign-clear-aligners", "braces", "teeth-whitening"].map((s) => {
            const t = treatments.find((x) => x.slug === s)!;
            return <li key={s}><Link href={`/treatments/${s}`} className="glass-dark inline-flex min-h-12 items-center rounded-full px-5 text-base text-white hover:bg-white/20">{t.title}</Link></li>;
          })}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3"><ActionLink href="/" variant="light">Home</ActionLink><ActionLink href={telHref()} event="click_call" variant="glass">Call {site.phone}</ActionLink></div>
      </div>
    </section>
  );
}
