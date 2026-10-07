import { ExternalLink, Star } from "lucide-react";
import { ActionLink } from "../ActionLink";
import { SectionHeading } from "../SectionHeading";
import { ReviewsCarousel, type ReviewItem } from "./ReviewsCarousel";
import { snapshotReviews } from "@/content/google-reviews";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholder";

type Review = { author_name: string; rating: number; text: string; time?: number; relative_time_description: string };
type PlaceData = { rating?: number; user_ratings_total?: number; reviews?: Review[] };

export async function getPlaceData(): Promise<PlaceData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key || isPlaceholder(site.googlePlaceId)) return null;
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(site.googlePlaceId)}&fields=rating,user_ratings_total,reviews&reviews_sort=newest&key=${key}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.result ?? null;
  } catch {
    return null;
  }
}

/**
 * Google reviews. Live from the Places API when a key + Place ID are configured (cached 24h);
 * otherwise the clinic's real reviews copied verbatim from Google (dated, see content/google-reviews.ts).
 */
export async function GoogleReviews({ limit = 10, compact = false }: { limit?: number; compact?: boolean }) {
  const data = await getPlaceData();
  const live: ReviewItem[] | undefined = data?.reviews
    ?.filter((r) => r.text?.trim())
    .slice(0, limit)
    .map((r) => ({ name: r.author_name, rating: r.rating, text: r.text, date: r.time ? new Date(r.time * 1000).toISOString() : new Date().toISOString() }));
  const items: ReviewItem[] = live?.length ? live : snapshotReviews.slice(0, limit);
  const isLive = !!live?.length;

  return (
    <section className={compact ? "" : "py-12 md:py-16"} aria-labelledby="g-reviews">
      <div className={compact ? "" : "container-page"}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Patient reviews" title={<span id="g-reviews">What patients say on Google</span>} lead={isLive && data?.rating ? `${data.rating.toFixed(1)} from ${data.user_ratings_total} Google reviews.` : "Real reviews from our patients, copied word for word from Google."} />
          <ActionLink href={site.googleProfileUrl} variant="secondary" arrow className="!min-h-11"><Star size={16} aria-hidden className="fill-[#F5B301] text-[#F5B301]" /> Read all reviews on Google</ActionLink>
        </div>
        <div className="mt-6"><ReviewsCarousel reviews={items} /></div>
        {!isLive && <p className="mt-4 text-sm text-muted">Showing reviews posted in Sept–Oct 2024. <a href={site.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-brown underline underline-offset-4">See the latest on Google <ExternalLink size={13} aria-hidden /></a></p>}
      </div>
    </section>
  );
}
