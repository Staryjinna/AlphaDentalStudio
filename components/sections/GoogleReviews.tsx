import Link from "next/link";
import { Star } from "lucide-react";
import { Reveal } from "../Reveal";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholder";

type Review = { author_name: string; rating: number; text: string; relative_time_description: string };
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

/** Live Google reviews. Hidden entirely when there is no key / place id: never shows invented reviews. */
export async function GoogleReviews({ limit = 3 }: { limit?: number }) {
  const data = await getPlaceData();
  const reviews = data?.reviews?.filter((r) => r.text?.trim()).slice(0, limit);
  if (!reviews?.length) return null;
  return (
    <section className="container-page py-20">
      <Reveal>
        <p className="eyebrow">Patient reviews</p>
        <h2 className="mt-3">What patients say on Google</h2>
        {data?.rating && (
          <p className="mt-3 flex items-center gap-2 text-lg"><Star className="fill-champagne text-champagne" size={20} aria-hidden /> <strong>{data.rating.toFixed(1)}</strong> from {data.user_ratings_total} reviews</p>
        )}
      </Reveal>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <li key={i}>
            <Reveal delay={i * 0.08} className="h-full">
              <figure className="card h-full p-6">
                <div className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>{Array.from({ length: r.rating }).map((_, k) => <Star key={k} size={16} className="fill-champagne text-champagne" aria-hidden />)}</div>
                <blockquote className="mt-3 text-base text-ink">&ldquo;{r.text.length > 260 ? `${r.text.slice(0, 260)}…` : r.text}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm text-muted">{r.author_name} · {r.relative_time_description}</figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
      <p className="mt-8"><Link href="/reviews" className="font-semibold text-brand-600 underline underline-offset-4">Read all reviews</Link></p>
    </section>
  );
}
