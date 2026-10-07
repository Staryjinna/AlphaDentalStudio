import { ExternalLink } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { PageHeader } from "@/components/PageHeader";
import { GoogleReviews, getPlaceData } from "@/components/sections/GoogleReviews";
import { ReelsSection } from "@/components/sections/ReelsSection";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/content/site";
import { seo } from "@/lib/seo";

export const metadata = seo({
  title: "Patient Reviews | Alpha Dental Studio, R.A. Puram, Chennai",
  description: "Read what patients say about Alpha Dental Studio on Google.",
  path: "/reviews",
});

export default async function Reviews() {
  const data = await getPlaceData();
  return (
    <>
      <PageHeader trail={[{ name: "Reviews", href: "/reviews" }]} eyebrow="Reviews" title="What patients say" lead="Patient stories in their own words, and live reviews from Google." />
      {data?.reviews?.length ? (
        <GoogleReviews limit={6} />
      ) : (
        <section className="container-page py-10 md:py-14">
          <div className="card mx-auto max-w-xl p-8 text-center">
            <h2 className="!text-2xl">Read our reviews on Google</h2>
            <p className="mt-3 text-base text-muted">Reviews appear here once our Google connection is live. In the meantime, you can read them on Google Maps.</p>
            <div className="mt-6"><ActionLink href={site.googleMapsUrl} variant="secondary"><ExternalLink size={18} aria-hidden /> See reviews on Google</ActionLink></div>
          </div>
        </section>
      )}
      <section className="overflow-hidden bg-sand/70 py-10 md:py-14">
        <div className="container-page">
          <SectionHeading eyebrow="Patient stories" title="Hear it from our patients" lead="Short videos from our Instagram, shared by the patients themselves." />
          <div className="mt-10"><ReelsSection /></div>
        </div>
      </section>
    </>
  );
}
