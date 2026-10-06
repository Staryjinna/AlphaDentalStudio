import { ExternalLink } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { PageHeader } from "@/components/PageHeader";
import { GoogleReviews, getPlaceData } from "@/components/sections/GoogleReviews";
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
      <PageHeader trail={[{ name: "Reviews", href: "/reviews" }]} eyebrow="Reviews" title="What patients say" lead="Live from Google. We never edit, select or invent reviews." />
      {data?.reviews?.length ? (
        <GoogleReviews limit={6} />
      ) : (
        <section className="container-page py-20">
          <div className="card mx-auto max-w-xl p-8 text-center">
            <h2 className="!text-2xl">Read our reviews on Google</h2>
            <p className="mt-3 text-base text-muted">Reviews appear here once our Google connection is live. In the meantime, you can read them on Google Maps.</p>
            <div className="mt-6"><ActionLink href={site.googleMapsUrl} variant="secondary"><ExternalLink size={18} aria-hidden /> See reviews on Google</ActionLink></div>
          </div>
        </section>
      )}
    </>
  );
}
