import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, lead, dark = false, align = "left", className = "" }: { eyebrow: string; title: React.ReactNode; lead?: string; dark?: boolean; align?: "left" | "center"; className?: string }) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p className={dark ? "eyebrow-dark eyebrow" : "eyebrow"}>{eyebrow}</p>
      <h2 className={`mt-3 ${dark ? "!text-white" : ""}`}>{title}</h2>
      {lead && <p className={`mt-4 text-lg ${dark ? "text-white/80" : "text-muted"}`}>{lead}</p>}
    </Reveal>
  );
}
