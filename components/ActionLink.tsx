"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/analytics";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "ghost" | "light" | "glass";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-base font-semibold transition-all duration-300";
const variants: Record<Variant, string> = {
  // the only accent-coloured element type
  primary: "sheen bg-accent-btn text-white shadow-[0_10px_28px_-8px_rgb(168_90_40/.7)] hover:bg-accent-btn-hover hover:shadow-[0_14px_34px_-8px_rgb(168_90_40/.85)]",
  secondary: "border border-brand-900/70 text-brand-900 hover:bg-brand-900 hover:text-white",
  ghost: "text-brand-900 hover:bg-brand-100",
  light: "bg-white text-brand-900 shadow-md hover:bg-brand-100",
  glass: "glass-dark text-white hover:bg-white/15",
};

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: Variant;
  event?: TrackEvent;
  arrow?: boolean;
  magnetic?: boolean;
  children: ReactNode;
};

/** Pill link/button with consistent styling; fires an analytics event on click. */
export function ActionLink({ href, variant = "primary", event, arrow = false, magnetic = false, className = "", children, ...rest }: Props) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const cls = `group ${base} ${variants[variant]} ${className}`;
  const onClick = () => event && track(event);
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight size={18} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </>
  );
  const el = external ? (
    <a href={href} className={cls} onClick={onClick} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} onClick={onClick} {...rest}>
      {inner}
    </Link>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
