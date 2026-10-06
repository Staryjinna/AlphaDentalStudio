import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";
import { Spotlight } from "./Spotlight";
import { Reveal } from "./Reveal";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-white/75">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={14} aria-hidden />}
              {i === all.length - 1 ? <span aria-current="page" className="text-white">{c.name}</span> : <Link href={c.href} className="py-2 text-white/75 underline-offset-4 hover:text-white hover:underline">{c.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${site.url}${c.href === "/" ? "" : c.href}` })) }} />
    </>
  );
}

/** Dark hero band for inner pages. The header floats over it, so it has generous top padding. */
export function PageHeader({ trail, eyebrow, title, lead, children, aside }: { trail: Crumb[]; eyebrow?: string; title: React.ReactNode; lead?: string; children?: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <Spotlight as="div" className="mesh-dark on-dark grain overflow-hidden">
      <div className="container-page relative z-10 grid items-center gap-10 pb-16 pt-32 md:pt-36 lg:grid-cols-12 lg:pb-20">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
          <Breadcrumbs trail={trail} />
          {eyebrow && <Reveal><p className="eyebrow-dark eyebrow mt-8">{eyebrow}</p></Reveal>}
          <Reveal delay={0.05}><h1 className="mt-3 !text-white">{title}</h1></Reveal>
          {lead && <Reveal delay={0.12}><p className="mt-5 max-w-2xl text-lg text-white/80">{lead}</p></Reveal>}
          {children && <Reveal delay={0.2}><div className="mt-8">{children}</div></Reveal>}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </Spotlight>
  );
}
