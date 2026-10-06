import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fraunces, inter } from "@/lib/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Alpha Dental Studio | Dental Clinic in R.A. Puram, Chennai",
  description:
    "Specialist dental clinic in R.A. Puram, Chennai: implants, root canal, Invisalign, braces, gum and cosmetic care. ₹500 consultation. Book online or WhatsApp.",
};

export const viewport: Viewport = { themeColor: "#0E3B43" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-900 focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
