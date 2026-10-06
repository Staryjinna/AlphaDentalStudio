import { JsonLd } from "@/lib/jsonld";
import { branches, site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholder";
import { getPlaceData } from "./sections/GoogleReviews";

/** Dentist + MedicalClinic markup for each branch. AggregateRating only from live Google data. */
export async function OrgSchema() {
  const place = await getPlaceData();
  const sameAs = Object.values(site.social).filter((u) => !isPlaceholder(u));
  const nodes = branches.map((b) => ({
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalClinic"],
    "@id": `${site.url}/#${b.id}`,
    name: `${site.name}, ${b.name}`,
    url: site.url,
    logo: `${site.url}/brand/mark-rose.png`,
    image: `${site.url}/opengraph-image.png`,
    telephone: b.phone,
    email: site.email,
    priceRange: "₹₹",
    medicalSpecialty: ["Dentistry", "Endodontic", "Periodontics", "Orthodontics", "OralSurgery"],
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.line1, addressLocality: b.address.city, addressRegion: b.address.state,
      postalCode: b.address.postalCode, addressCountry: b.address.country,
    },
    ...(b.geo.lat && b.geo.lng ? { geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng } } : {}),
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: site.hours[0].opens, closes: site.hours[0].closes,
    }],
    areaServed: site.areasServed.map((a) => ({ "@type": "Place", name: a })),
    sameAs,
    ...(place?.rating && place.user_ratings_total
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: place.rating, reviewCount: place.user_ratings_total } }
      : {}),
  }));
  return <JsonLd data={nodes} />;
}
