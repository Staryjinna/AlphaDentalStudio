// Single source of truth for business facts. Values wrapped in [brackets] are placeholders:
// they show a "TODO" badge in dev and are hidden in production (see lib/placeholder.ts).
export const site = {
  name: "Alpha Dental Studio",
  shortName: "ADS",
  tagline: "Innovating Smiles. Inspiring Lives.",
  url: "https://alphadentalstudios.com",
  phone: "+91 93639 37900",
  whatsapp: "919363937900", // digits only, for wa.me
  email: "hello@alphadentalstudios.com", // TODO: confirm with clinic
  address: {
    line1: "Door No. 2, 1st Floor, Plot No. 65, Thiruvengadam Street",
    landmark: "Next to CSI St. Luke's Church",
    locality: "Raja Annamalai Puram (R.A. Puram)",
    city: "Chennai",
    state: "Tamil Nadu",
    postalCode: "600028",
    country: "IN",
  },
  geo: { lat: 0, lng: 0 }, // TODO: copy from the Google Maps pin
  hours: [{ days: "Mo-Sa", opens: "10:00", closes: "20:00" }], // TODO: confirm Sunday
  hoursLabel: "Mon–Sat 10 AM–8 PM",
  consultationFee: 500, // INR, TODO: confirm
  googleMapsUrl: "[paste share link]",
  googlePlaceId: "[for reviews widget]",
  social: {
    facebook: "https://www.facebook.com/alphadentalstudios/",
    instagram: "[ ]",
    youtube: "[ ]",
  },
  areasServed: [
    "R.A. Puram", "Mylapore", "Alwarpet", "Mandaveli", "Adyar", "Teynampet",
    "Nandanam", "Abhiramapuram", "Kotturpuram", "Besant Nagar", "T. Nagar", "Santhome",
  ],
} as const;

export const telHref = `tel:+${site.phone.replace(/\D/g, "")}`;

export function whatsappHref(message = "Hello Alpha Dental Studio, I'd like to book an appointment.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const fullAddress = [
  site.address.line1,
  site.address.landmark,
  site.address.locality,
  `${site.address.city}, ${site.address.state} ${site.address.postalCode}`,
];
