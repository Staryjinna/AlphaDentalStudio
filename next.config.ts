import type { NextConfig } from "next";

// 301s from the previous WordPress site's URLs.
const moved: [string, string][] = [
  ["/about-us", "/about"],
  ["/our-team", "/doctors"],
  ["/new-patients", "/first-visit"],
  ["/contact-us", "/contact"],
  ["/services", "/treatments"],
  ["/services/general-dentistry", "/treatments/dental-check-up-cleaning"],
  ["/services/cosmetic-dentistry", "/treatments#cosmetic"],
  ["/services/orthodontics", "/treatments#orthodontics"],
  ["/services/endodontics", "/treatments/root-canal-treatment"],
  ["/services/periodontics", "/treatments/gum-treatment"],
  ["/services/restorative-dentistry", "/treatments/dental-crowns-bridges"],
  ["/services/oral-surgery", "/treatments/oral-maxillofacial-surgery"],
  ["/services/sedation-dentistry", "/treatments/sedation-dentistry"],
  ["/services/special-needs-dentistry", "/treatments/special-needs-dentistry"],
];

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
