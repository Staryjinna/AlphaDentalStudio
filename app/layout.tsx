import type { Metadata, Viewport } from "next";
import "./globals.css";
import { poppins } from "@/lib/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Consent } from "@/components/Consent";
import { OrgSchema } from "@/components/OrgSchema";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BookingProvider } from "@/components/BookingModal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Alpha Dental Studio | Dental Clinic in R.A. Puram, Chennai",
  description:
    "Specialist dental clinic in R.A. Puram and Kottivakkam, Chennai: implants, root canal, Invisalign, braces, gum and cosmetic care. Book online or WhatsApp.",
};

export const viewport: Viewport = { themeColor: "#3E2610" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={poppins.variable}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:text-white">
          Skip to content
        </a>
        <BookingProvider>
          <OrgSchema />
          <SmoothScroll />
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
          <FloatingWhatsApp />
          <Consent />
        </BookingProvider>
      </body>
    </html>
  );
}
