"use client";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "ghost" | "light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-base font-semibold transition-colors";
const variants: Record<Variant, string> = {
  primary: "bg-accent-btn text-white hover:bg-accent-btn-hover", // the only accent-coloured element type
  secondary: "border border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white",
  ghost: "text-brand-900 hover:bg-brand-100",
  light: "bg-white text-brand-900 hover:bg-brand-100",
};

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: Variant;
  event?: TrackEvent;
  children: ReactNode;
};

/** Link/button with consistent styling that fires an analytics event on click. */
export function ActionLink({ href, variant = "primary", event, className = "", children, ...rest }: Props) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const cls = `${base} ${variants[variant]} ${className}`;
  const onClick = () => event && track(event);
  if (external) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
