import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, lead, align = "left", className = "" }: { eyebrow: string; title: React.ReactNode; lead?: string; align?: "left" | "center"; className?: string }) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3">{title}</h2>
      {lead && <p className="mt-4 text-lg text-muted [.on-dark_&]:text-white/80">{lead}</p>}
    </Reveal>
  );
}
