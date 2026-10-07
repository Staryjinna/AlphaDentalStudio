// Single source of truth for business facts, taken from the clinic's live site (alphadentalstudios.com).
// Values wrapped in [brackets] are placeholders: TODO badge in dev, hidden in production (lib/placeholder.ts).
export type Branch = {
  id: string;
  name: string;
  address: { line1: string; line2?: string; locality: string; city: string; state: string; postalCode: string; country: string };
  landmark?: string;
  phone: string;
  mapsUrl: string;
  cid?: string; // Google place CID: shows the real Google place card in the map embed
  geo: { lat: number; lng: number };
};

export const branches: Branch[] = [
  {
    id: "ra-puram",
    name: "R.A. Puram",
    address: {
      line1: "Plot No. 65, First Floor, Old Door No. 2/4, Thiruvengadam Street",
      locality: "Raja Annamalai Puram (R.A. Puram)",
      city: "Chennai", state: "Tamil Nadu", postalCode: "600028", country: "IN",
    },
    landmark: "Next to CSI St. Luke's Church", // from the clinic brief; confirm
    phone: "+91 93639 37900",
    mapsUrl: "https://www.google.com/maps?cid=3435406455493692534",
    cid: "3435406455493692534",
    geo: { lat: 0, lng: 0 }, // TODO: R.A. Puram coordinates (not published by the clinic)
  },
  {
    id: "kottivakkam",
    name: "Kottivakkam",
    address: {
      line1: "No. 2/311, AGS Colony, 2nd Main Road, Kannappa Nagar",
      locality: "Kottivakkam",
      city: "Chennai", state: "Tamil Nadu", postalCode: "600041", country: "IN",
    },
    phone: "+91 86374 38826",
    mapsUrl: "https://maps.app.goo.gl/xiHkZvmhSbx2V2vVA", // the clinic's own published link; pin is exact (from that link)
    geo: { lat: 12.9743426, lng: 80.2565387 },
  },
];

export const site = {
  name: "Alpha Dental Studio",
  shortName: "ADS",
  tagline: "Innovating Smiles. Inspiring Lives.",
  url: "https://alphadentalstudios.com",
  phone: "+91 93639 37900", // main line / R.A. Puram
  landline: "044 3503 7900",
  whatsapp: "919363937900", // digits only, for wa.me
  email: "info@alphadentalstudios.com",
  // Primary branch drives NAP, schema and the map. Both are listed on Contact.
  address: branches[0].address,
  landmark: branches[0].landmark,
  geo: branches[0].geo,
  hours: [{ days: "Mo-Sa", opens: "10:00", closes: "20:00" }], // Sunday closed (per live site)
  hoursLabel: "Mon–Sat 10 AM–8 PM",
  sundayLabel: "Sunday closed",
  consultationFee: 500, // INR. Not on the live site (Practo listing): TODO confirm
  googleMapsUrl: branches[0].mapsUrl,
  googleProfileUrl: "https://share.google/FqQZSiNvfJ4kgmJhH", // the clinic's Google business profile (reviews live here)
  googlePlaceId: "[for reviews widget]",
  social: {
    facebook: "https://www.facebook.com/alphadentalstudios",
    instagram: "https://www.instagram.com/alphadentalstudios/",
    youtube: "[ ]",
  },
  areasServed: [
    "R.A. Puram", "Mylapore", "Alwarpet", "Mandaveli", "Adyar", "Teynampet",
    "Nandanam", "Abhiramapuram", "Kotturpuram", "Besant Nagar", "T. Nagar", "Santhome",
    "Kottivakkam", "Thiruvanmiyur", "Neelankarai", "Palavakkam",
  ],
} as const;

/** Real Google map embed: place card via CID when known, otherwise an exact coordinate pin. */
export const mapEmbedSrc = (b: Branch) =>
  b.cid
    ? `https://maps.google.com/maps?cid=${b.cid}&hl=en&output=embed`
    : `https://maps.google.com/maps?q=${b.geo.lat},${b.geo.lng}&hl=en&z=17&output=embed`;

const digits = (s: string) => s.replace(/\D/g, "");
export const telHref = (phone: string = site.phone) => {
  const d = digits(phone).replace(/^0+/, "");
  return `tel:+${d.startsWith("91") ? d : `91${d}`}`;
};

export function whatsappHref(message = "Hello Alpha Dental Studio, I'd like to book an appointment.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatAddress(b: Branch) {
  return [b.address.line1, b.address.locality, `${b.address.city}, ${b.address.state} ${b.address.postalCode}`];
}
