import type { Metadata } from "next";
import { site } from "@/content/site";

type SeoInput = { title: string; description: string; path: string; image?: string; noindex?: boolean };

/** Single place for per-page metadata: canonical, Open Graph, Twitter, and hreflang ready for a future /ta version. */
export function seo({ title, description, path, image, noindex }: SeoInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title, description,
    alternates: { canonical: url, languages: { "en-IN": url /* "ta-IN": `${site.url}/ta${path}` when Tamil ships */ } },
    openGraph: { title, description, url, siteName: site.name, locale: "en_IN", type: "website", ...(image ? { images: [{ url: image }] } : {}) },
    twitter: { card: "summary_large_image", title, description },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
