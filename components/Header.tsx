"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { ActionLink } from "./ActionLink";
import { GroupIcon } from "./GroupIcon";
import { mainNav } from "@/content/nav";
import { treatmentGroups } from "@/content/treatment-groups";
import { site, telHref } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMegaOpen(false); setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMegaOpen(false); setMobileOpen(false); } };
    const onDown = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setMegaOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const items = [{ href: "/treatments", label: "Treatments", mega: true }, ...mainNav.map((n) => ({ ...n, mega: false }))];
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5" ref={wrapRef}>
        <div className="relative mx-auto max-w-[1200px]">
          <div className={`glass flex items-center justify-between gap-3 rounded-full pl-5 pr-2 transition-[padding] duration-300 ${scrolled ? "py-1" : "py-2"}`}>
            <Logo />

            <nav aria-label="Main" className="hidden items-center lg:flex" onMouseLeave={() => setHover(null)}>
              {items.map((n) => {
                const active = isActive(n.href);
                const cls = "relative inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-full px-3.5 text-[0.95rem] font-medium text-ink";
                const pill = hover === n.href && (
                  <motion.span layoutId="nav-hover" className="absolute inset-0 rounded-full bg-brand-900/8" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
                );
                const dot = active && <span aria-hidden className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />;
                return n.mega ? (
                  <button
                    key={n.href} type="button" className={cls}
                    aria-expanded={megaOpen} aria-controls="mega-menu"
                    onClick={() => setMegaOpen(true)}
                    onMouseEnter={() => { setHover(n.href); setMegaOpen(true); }}
                    onFocus={() => setHover(n.href)}
                  >
                    {pill}
                    <span className="relative inline-flex items-center gap-1">Treatments <ChevronDown size={15} aria-hidden className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} /></span>
                    {dot}
                  </button>
                ) : (
                  <Link
                    key={n.href} href={n.href} className={cls} aria-current={active ? "page" : undefined}
                    onMouseEnter={() => { setHover(n.href); setMegaOpen(false); }} onFocus={() => setHover(n.href)}
                  >
                    {pill}<span className="relative">{n.label}</span>{dot}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5">
              <a href={telHref()} className="max-xl:hidden inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full px-3 text-[0.95rem] font-semibold text-brand-900 hover:bg-brand-900/8">
                <Phone size={16} aria-hidden /> {site.phone}
              </a>
              <ActionLink href="/book" className="max-lg:hidden !min-h-11 !px-5">Book appointment</ActionLink>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-900 hover:bg-brand-900/8 lg:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-menu"
                onClick={() => setMobileOpen((o) => !o)}
              >
                {mobileOpen ? <X aria-hidden /> : <Menu aria-hidden />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {megaOpen && (
              <motion.div
                id="mega-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                onMouseLeave={() => setMegaOpen(false)}
                className="glass absolute inset-x-0 top-full mt-3 hidden rounded-[28px] p-6 lg:block"
                style={{ background: "color-mix(in srgb, #fff 92%, transparent)" }}
              >
                <div className="grid grid-cols-4 gap-x-6 gap-y-6">
                  {treatmentGroups.map((g) => (
                    <div key={g.id} className="rounded-2xl p-3 transition-colors hover:bg-brand-100/60">
                      <p className="flex items-center gap-2.5 font-heading text-lg font-semibold text-brand-900">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-900 text-champagne"><GroupIcon id={g.id} size={18} /></span>
                        {g.title}
                      </p>
                      <ul className="mt-2 space-y-0.5">
                        {g.items.map((t) => (
                          <li key={t.slug}>
                            <Link href={`/treatments/${t.slug}`} className="block rounded py-1 text-[0.97rem] text-ink hover:text-brand-600 hover:underline">{t.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="mesh-dark relative flex flex-col justify-between overflow-hidden rounded-2xl p-5">
                    <div>
                      <p className="font-heading text-lg font-semibold text-white">Not sure what you need?</p>
                      <p className="mt-1 text-base text-white/80">Start with a consultation and we&apos;ll guide you.</p>
                    </div>
                    <Link href="/treatments" className="mt-3 inline-block font-semibold text-champagne underline underline-offset-4">See all treatments</Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mesh-dark on-dark fixed inset-0 z-40 overflow-y-auto pb-28 pt-24 lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page">
              <details className="border-b border-white/15" open>
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-heading text-2xl font-semibold text-white">
                  Treatments <ChevronDown size={20} aria-hidden />
                </summary>
                <div className="space-y-5 pb-5">
                  {treatmentGroups.map((g) => (
                    <div key={g.id}>
                      <p className="eyebrow flex items-center gap-2"><GroupIcon id={g.id} size={15} /> {g.title}</p>
                      <ul>
                        {g.items.map((t) => (
                          <li key={t.slug}><Link href={`/treatments/${t.slug}`} className="flex min-h-12 items-center text-base text-white/90">{t.title}</Link></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
              {mainNav.map((n) => (
                <Link key={n.href} href={n.href} className="flex min-h-14 items-center border-b border-white/15 font-heading text-2xl font-semibold text-white">{n.label}</Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
