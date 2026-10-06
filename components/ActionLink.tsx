"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/analytics";
import { Magnetic } from "./Magnetic";
import { useBooking } from "./BookingModal";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const base = "group inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-[0.95rem] font-semibold transition-all duration-300";
const variants: Record<Variant, string> = {
  primary: "sheen bg-cta text-white shadow-[0_12px_28px_-10px_rgb(107_66_32/.8)] hover:bg-cta-hover hover:shadow-[0_16px_34px_-10px_rgb(107_66_32/.9)]",
  secondary: "border-[1.5px] border-cocoa/70 text-cocoa hover:bg-cocoa hover:text-white",
  ghost: "text-cocoa hover:bg-sand",
  light: "bg-white text-cocoa shadow-md hover:bg-peach",
  "outline-light": "border-[1.5px] border-white/70 text-white hover:bg-white hover:text-cocoa",
};

type Props = {
  href?: string;
  variant?: Variant;
  event?: TrackEvent;
  arrow?: boolean;
  magnetic?: boolean;
  /** Opens the booking sheet instead of navigating (falls back to /book without JS). */
  book?: { treatment?: string; doctor?: string } | true;
  className?: string;
  children: ReactNode;
};

/** Pill button/link. Fires analytics events; `book` opens the app-wide booking sheet. */
export function ActionLink({ href = "/book", variant = "primary", event, arrow = false, magnetic = false, book, className = "", children }: Props) {
  const { open } = useBooking();
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowUpRight size={18} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </>
  );
  const external = /^(https?:|tel:|mailto:)/.test(href);
  let el: ReactNode;
  if (book) {
    el = (
      <Link href={href} className={cls} onClick={(e) => { e.preventDefault(); open(book === true ? {} : book); }}>
        {inner}
      </Link>
    );
  } else if (external) {
    el = (
      <a href={href} className={cls} onClick={() => event && track(event)} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  } else {
    el = <Link href={href} className={cls} onClick={() => event && track(event)}>{inner}</Link>;
  }
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
