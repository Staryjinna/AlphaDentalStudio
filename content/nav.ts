import { hasCases } from "./cases";

// Treatments is added in the header as a mega-menu. Smile Gallery stays hidden until real consented cases exist.
// Blog is added back when the first posts are published.
export const mainNav = [
  { href: "/doctors", label: "Doctors" },
  ...(hasCases ? [{ href: "/smile-gallery", label: "Smile Gallery" }] : []),
  { href: "/first-visit", label: "First Visit" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];
