import { hasCases } from "./cases";

export const mainNav = [
  { href: "/doctors", label: "Doctors" },
  // Hidden from nav until real consented cases exist.
  ...(hasCases ? [{ href: "/smile-gallery", label: "Smile Gallery" }] : []),
  { href: "/first-visit", label: "First Visit" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
