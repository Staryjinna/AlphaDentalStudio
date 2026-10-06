"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { ActionLink } from "./ActionLink";
import { mainNav } from "@/content/nav";
import { treatmentGroups } from "@/content/treatment-groups";
import { site, telHref } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  // Close menus on navigation.
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Escape closes; click outside closes the mega-menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock scroll behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkCls = "inline-flex min-h-12 items-center whitespace-nowrap rounded-full px-2.5 text-base font-medium text-ink hover:bg-brand-100";

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-bg/90 backdrop-blur">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <div ref={megaRef} onMouseLeave={() => setMegaOpen(false)}>
            <button
              type="button"
              className={`${linkCls} gap-1`}
              aria-expanded={megaOpen}
              aria-controls="mega-menu"
              onClick={() => setMegaOpen(true)}
              onMouseEnter={() => setMegaOpen(true)}
            >
              Treatments <ChevronDown size={16} aria-hidden className={megaOpen ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {megaOpen && (
              <div
                id="mega-menu"
                className="absolute inset-x-0 top-full border-b border-ink/8 bg-surface shadow-xl"
              >
                <div className="container-page grid grid-cols-4 gap-x-8 gap-y-8 py-8">
                  {treatmentGroups.map((g) => (
                    <div key={g.id}>
                      <p className="font-heading text-lg font-semibold text-brand-900">{g.title}</p>
                      <ul className="mt-2 space-y-0.5">
                        {g.items.map((t) => (
                          <li key={t.slug}>
                            <Link href={`/treatments/${t.slug}`} className="block rounded py-1.5 text-base text-ink hover:text-brand-600 hover:underline">
                              {t.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="rounded-card bg-brand-100 p-5">
                    <p className="font-heading text-lg font-semibold text-brand-900">Not sure what you need?</p>
                    <p className="mt-1 text-base text-muted">Start with a ₹{site.consultationFee} consultation and we&apos;ll guide you.</p>
                    <Link href="/treatments" className="mt-3 inline-block font-semibold text-brand-600 underline">
                      See all treatments
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {mainNav.map((n) => (
            <Link key={n.href} href={n.href} className={linkCls} aria-current={pathname === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="max-xl:hidden inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full px-3 font-semibold text-brand-900 hover:bg-brand-100"
          >
            <Phone size={18} aria-hidden /> {site.phone}
          </a>
          <ActionLink href="/book" className="max-lg:hidden whitespace-nowrap">Book appointment</ActionLink>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-brand-900 hover:bg-brand-100 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>
    </header>

      {mobileOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-bg pb-28 lg:hidden">
          <nav aria-label="Mobile" className="container-page py-4">
            <details className="border-b border-ink/10" open>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-heading text-xl font-semibold text-brand-900">
                Treatments <ChevronDown size={20} aria-hidden />
              </summary>
              <div className="space-y-4 pb-4">
                {treatmentGroups.map((g) => (
                  <div key={g.id}>
                    <p className="eyebrow">{g.title}</p>
                    <ul>
                      {g.items.map((t) => (
                        <li key={t.slug}>
                          <Link href={`/treatments/${t.slug}`} className="flex min-h-12 items-center text-base">
                            {t.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
            {mainNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex min-h-14 items-center border-b border-ink/10 font-heading text-xl font-semibold text-brand-900"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
