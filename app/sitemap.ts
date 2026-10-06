import type { MetadataRoute } from "next";
import { doctors } from "@/content/doctors";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { hasCases } from "@/content/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = ["", "/treatments", "/doctors", "/about", "/first-visit", "/reviews", "/contact", "/book", ...(hasCases ? ["/smile-gallery"] : [])];
  return [
    ...fixed.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.8 })),
    ...treatments.map((t) => ({ url: `${site.url}/treatments/${t.slug}`, lastModified: new Date(t.lastReviewed), priority: 0.7 })),
    ...doctors.map((d) => ({ url: `${site.url}/doctors/${d.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
