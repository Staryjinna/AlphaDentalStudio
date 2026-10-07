"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { ActionLink } from "./ActionLink";
import { GroupIcon } from "./GroupIcon";
import { mainNav } from "@/content/nav";
import { treatmentGroups } from "@/content/treatment-groups";
import { branches, site, telHref } from "@/content/site";

const links = [{ href: "/about", label: "About" }, ...mainNav];

/** Fixed header with a full-screen hamburger overlay (reference-site pattern). Solid once scrolled. */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", key);
    return () => { window.removeEventListener("scroll", on); document.removeEventListener("keydown", key); };
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; document.documentElement.classList.remove("lenis-stopped"); };
  }, [open]);

  const solid = scrolled || open;
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? "bg-cream/95 shadow-[0_1px_0_rgb(62_38_16/.08)] backdrop-blur" : "bg-transparent"}`}>
        <div className={`container-page flex items-center justify-between gap-3 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <Logo onDark={!solid && pathname === "/"} />
          <div className="flex items-center gap-2">
            <a href={telHref()} className={`hidden min-h-11 items-center gap-2 rounded-full px-4 text-[0.95rem] font-semibold lg:inline-flex ${!solid && pathname === "/" ? "text-white hover:bg-white/15" : "text-cocoa hover:bg-sand"}`}>
              <Phone size={16} aria-hidden /> {site.phone}
            </a>
            <ActionLink book className="!min-h-11 !px-5 max-sm:hidden">Book appointment</ActionLink>
            <button
              type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="site-menu"
              className={`inline-flex h-12 items-center gap-2 rounded-full border-[1.5px] px-4 text-[0.95rem] font-semibold transition-colors ${open || solid || pathname !== "/" ? "border-cocoa/60 text-cocoa hover:bg-cocoa hover:text-white" : "border-white/70 text-white hover:bg-white hover:text-cocoa"}`}
            >
              {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
              <span>{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="on-dark fixed inset-0 z-40 overflow-y-auto bg-cocoa pb-32 pt-12 md:pt-[4.5rem] md:pt-28"
          >
            <div className="container-page grid gap-12 lg:grid-cols-12">
              <nav aria-label="Main" className="lg:col-span-5">
                <ul>
                  {[{ href: "/", label: "Home" }, ...links, { href: "/book", label: "Book" }].map((n, i) => (
                    <motion.li key={n.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}>
                      <Link href={n.href} className="group flex items-baseline gap-4 border-b border-white/10 py-3 text-[clamp(2rem,6vw,3.4rem)] font-semibold leading-tight text-white transition-colors hover:text-peach">
                        <span className="text-sm font-medium text-tan">{String(i + 1).padStart(2, "0")}</span>
                        {n.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="lg:col-span-7">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="eyebrow">Treatments</motion.p>
                <div className="mt-5 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {treatmentGroups.map((g, i) => (
                    <motion.div key={g.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.05 }}>
                      <p className="flex items-center gap-2 text-lg font-semibold text-white"><GroupIcon id={g.id} size={18} className="text-peach" /> {g.title}</p>
                      <ul className="mt-1.5">
                        {g.items.map((t) => (
                          <li key={t.slug}><Link href={`/treatments/${t.slug}`} className="block py-1 text-[0.97rem] text-white/75 hover:text-peach">{t.title}</Link></li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
                  {branches.map((b) => (
                    <div key={b.id}>
                      <p className="font-semibold text-white">{b.name}</p>
                      <a href={telHref(b.phone)} className="mt-1 inline-flex min-h-11 items-center text-peach underline underline-offset-4">{b.phone}</a>
                    </div>
                  ))}
                  <p className="text-sm text-white/65 sm:col-span-2">{site.hoursLabel} · {site.sundayLabel}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
