import { PageHeader } from "@/components/PageHeader";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { ReelsSection } from "@/components/sections/ReelsSection";
import { SectionHeading } from "@/components/SectionHeading";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: "Patient Reviews | Alpha Dental Studio, R.A. Puram, Chennai",
  description: "Read what patients say about Alpha Dental Studio on Google, and watch patient stories.",
  path: "/reviews",
});

export default function Reviews() {
  return (
    <>
      <PageHeader trail={[{ name: "Reviews", href: "/reviews" }]} eyebrow="Reviews" title="What patients say" lead="Reviews from Google, and patient stories in their own words." />
      <GoogleReviews />
      <section className="overflow-hidden bg-sand/70 py-10 md:py-14">
        <div className="container-page">
          <SectionHeading eyebrow="Patient stories" title="Hear it from our patients" lead="Short videos from our Instagram, shared by the patients themselves." />
          <div className="mt-6"><ReelsSection /></div>
        </div>
      </section>
    </>
  );
}
