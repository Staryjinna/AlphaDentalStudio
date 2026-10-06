# Alpha Dental Studio: Claude Code Build Prompt

**How to use:** create an empty folder, unzip this kit into it (you get `IMAGES_AND_SOURCES.md`, `content/images.json`, `brand/`), open Claude Code there, and paste **everything below the line**. It works in phases and stops for your review after each one.

Before you start, fill in the `[brackets]` in section A (phone, WhatsApp, email). Everything else has a safe default.

---

You are building the new website for **Alpha Dental Studio**, a multi-specialty dental clinic in R.A. Puram, Chennai. Goals, in priority order:
1. **Trust:** real doctors, real credentials, transparent first visit, real reviews.
2. **Bookings:** every screen offers Book / Call / WhatsApp within one tap.
3. **Local SEO:** rank for "dentist in R.A. Puram", "dental clinic Mylapore/Alwarpet/Adyar", and "<treatment> in Chennai".
4. **Speed:** Lighthouse mobile ≥ 95 performance, 100 SEO, ≥ 95 accessibility.

Read `IMAGES_AND_SOURCES.md` and `content/images.json` first. They hold the image sources, the rules for doctor photos and the logo, and the business facts.

## A. Business facts (single source of truth → `content/site.ts`)

```ts
export const site = {
  name: "Alpha Dental Studio",
  shortName: "ADS",
  tagline: "Innovating Smiles. Inspiring Lives.",
  url: "https://alphadentalstudios.com",
  phone: "[+91 XXXXX XXXXX]",          // TODO from clinic
  whatsapp: "[91XXXXXXXXXX]",          // digits only, for wa.me
  email: "[hello@alphadentalstudios.com]",
  address: {
    line1: "Door No. 2, 1st Floor, Plot No. 65, Thiruvengadam Street",
    landmark: "Next to CSI St. Luke's Church",
    locality: "Raja Annamalai Puram (R.A. Puram)",
    city: "Chennai", state: "Tamil Nadu", postalCode: "600028", country: "IN",
  },
  geo: { lat: 0, lng: 0 },             // TODO: copy from the Google Maps pin
  hours: [{ days: "Mo-Sa", opens: "10:00", closes: "20:00" }], // confirm Sunday
  consultationFee: 500,                // INR, confirm
  googleMapsUrl: "[paste share link]",
  googlePlaceId: "[for reviews widget]",
  social: { facebook: "https://www.facebook.com/alphadentalstudios/", instagram: "[ ]", youtube: "[ ]" },
  areasServed: ["R.A. Puram","Mylapore","Alwarpet","Mandaveli","Adyar","Teynampet","Nandanam","Abhiramapuram","Kotturpuram","Besant Nagar","T. Nagar","Santhome"],
};
```
Render a visible **"TODO" badge in dev only** wherever a `[ ]` value is still a placeholder, so nothing ships half-filled.

## B. Stack

- **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4**, statically generated, deployed on **Vercel**.
- Content in typed files for v1: `content/doctors.ts`, `content/treatments.ts`, `content/faqs.ts`, `content/posts/*.mdx`. Structure them so they can move to **Sanity** in v2 without changing components.
- `next/image` for all images. Download the URLs in `content/images.json` into `/public/images/` with a small script `scripts/fetch-images.mjs`, which writes `<id>.jpg` at 2000px wide. Serve them locally; no hot-linking.
- Fonts via `next/font`: **Fraunces** (headings, opsz axis, weights 400/600) and **Inter** (body, 400/500/600).
- Animations: **Motion** (`motion/react`), only for small reveal and slider effects. Respect `prefers-reduced-motion`.
- Icons: **lucide-react**, plus tooth/implant icons from **Healthicons** (CC0) saved as local SVG.
- Forms: a server action that sends email via **Resend** (env `RESEND_API_KEY`), with WhatsApp deep-link fallback.
- Booking v1: a request form (name, phone, treatment, preferred doctor, preferred date and time slot) that sends email, then opens WhatsApp with a prefilled message. Add a `BOOKING_PROVIDER` switch so a **Cal.com** embed can replace it later.
- Reviews: a `GoogleReviews` server component using the Places API (env `GOOGLE_PLACES_API_KEY`), cached 24h (`revalidate: 86400`). If no key is set, hide the section rather than show fake data. **Never hard-code or invent reviews.**
- Analytics: GA4 (env `NEXT_PUBLIC_GA_ID`) + Microsoft Clarity, loaded after consent. Track events `click_call`, `click_whatsapp`, `booking_submit`, `click_directions`.

## C. Design system ("calm boutique clinic")

Brand colours default to the palette below. If the clinic's real logo colours arrive, swap the `--brand-*` tokens only.

```css
:root{
  --bg:#F7F4EF;        /* warm ivory */
  --surface:#FFFFFF;
  --ink:#0E2A2F;       /* text */
  --muted:#5B6B6E;
  --brand-900:#0E3B43; /* deep teal: headings, footer */
  --brand-600:#1F6F78; /* links, icons */
  --brand-100:#E3F0EF; /* tints */
  --sand:#E8DCCB;      /* section bands */
  --accent:#C9733B;    /* ONLY for primary CTA buttons (Book appointment) */
  --success:#2F7D5B;
  --radius:18px;
}
```
- Type scale: H1 `clamp(2.4rem, 5vw, 4rem)` Fraunces 600, tight tracking. H2 `clamp(1.8rem, 3.2vw, 2.6rem)`. Body 17–18px Inter, line-height 1.65 (older patients read this site).
- Layout: max-width 1200px, generous whitespace, 12-col grid, cards with `--radius`, a 1px border at ink/8%, and a soft shadow on hover only.
- Photography-led, with rounded image masks. Add a subtle grain or arch shapes as a "studio" motif (an arch-topped image frame echoes the "α" shape).
- **Sticky mobile action bar** (bottom, under 768px wide): `Call` · `WhatsApp` · `Book` (accent). Desktop: a header CTA "Book appointment" plus a floating WhatsApp button.
- Header: logo left; nav: Treatments (mega-menu with 7 groups), Doctors, Smile Gallery, First Visit, Reviews, Blog, Contact; phone number visible on desktop.
- Motion: fade-up on scroll (16px, 0.6s), a before/after drag slider, a doctors carousel with snap scrolling. **No full-screen loader.**
- Accessibility: contrast ≥ 4.5:1, focus rings, 48px tap targets, alt text on every image, skip-link, labels on every input.

## D. Logo & doctor photos (strict)

- Use `brand/alpha-wordmark-placeholder.svg` until the real logo arrives at `/public/brand/logo.svg` (+ `logo-white.svg`, `icon.svg`). Generate favicon, apple-touch-icon and an OG image from `icon.svg`.
- Doctor photos: expect `/public/doctors/<slug>.jpg` (4:5). **If a file is missing, render an initials avatar** (tinted circle, Fraunces initials). **Never** substitute stock or AI faces for a named doctor.
- Before/after gallery: reads from `content/cases.ts`, which **starts empty**. The section hides itself until real consented cases are added. Each case needs `consent: true`.

## E. Sitemap & routes

```
/                                   Home
/treatments                         Hub (7 groups)
/treatments/[slug]                  19 treatment pages (list in F)
/doctors                            Team
/doctors/[slug]                     8 doctor pages
/smile-gallery                      Before/after (hidden from nav until cases exist)
/about                              Clinic, story, technology, sterilisation
/first-visit                        What to expect, fee, payment, directions
/reviews                            Google reviews + patient stories
/blog, /blog/[slug]                 Dental guide (MDX)
/contact                            Map, NAP, hours, form
/book                               Full booking page
/privacy, /terms                    DPDP-compliant privacy notice (placeholder text marked TODO)
```
Add **301 redirects** in `next.config.ts`:
`/about-us → /about`, `/services → /treatments`, `/services/general-dentistry → /treatments/dental-check-up-cleaning`, `/services/restorative-dentistry → /treatments/dental-crowns-bridges`, `/services/sedation-dentistry → /treatments/sedation-dentistry`, `/new-patients → /first-visit`. Keep `/blog/:slug` and `/contact` unchanged.

## F. Treatments (`content/treatments.ts`)

Group → slug → primary keyword (use in title, H1, first paragraph, one H2, image alt, URL):

| Group | Slug | Primary keyword | Doctor(s) |
|---|---|---|---|
| General | dental-check-up-cleaning | dental check-up and cleaning in Chennai | Dr. Varshini |
| General | tooth-extraction | tooth extraction in Chennai | Dr. Aravind Sai |
| General | kids-dentistry | kids dentist in R.A. Puram | Dr. Varshini |
| Restorative | root-canal-treatment | root canal treatment in Chennai | Dr. Mahalakshmi, Dr. Anjali Sankar |
| Restorative | dental-crowns-bridges | dental crowns and bridges in Chennai | Dr. Anjali Sankar |
| Restorative | dentures | dentures in Chennai | Dr. Aravind Sai |
| Implants & Surgery | dental-implants | dental implants in Chennai | Dr. Aravind Sai |
| Implants & Surgery | wisdom-tooth-removal | wisdom tooth removal in Chennai | Dr. Aravind Sai |
| Implants & Surgery | oral-maxillofacial-surgery | oral and maxillofacial surgeon in Chennai | Dr. Aravind Sai |
| Orthodontics | braces | braces treatment in Chennai | Dr. Deena Nancy, Dr. Diana Ashok |
| Orthodontics | invisalign-clear-aligners | Invisalign in Chennai | Dr. S. Zeenath, Dr. Deena Nancy |
| Gums | gum-treatment | gum disease treatment in Chennai | Dr. Akshaya |
| Gums | laser-dentistry | laser dentistry in Chennai | Dr. S. Zeenath, Dr. Mahalakshmi |
| Cosmetic | teeth-whitening | teeth whitening in Chennai | Dr. S. Zeenath |
| Cosmetic | veneers | dental veneers in Chennai | Dr. S. Zeenath |
| Cosmetic | smile-makeover | smile makeover in Chennai (incl. tooth jewellery) | Dr. S. Zeenath |
| Specialist | tmj-jaw-pain | TMJ and jaw pain treatment in Chennai | Dr. Aravind Sai |
| Specialist | sedation-dentistry | sedation dentistry in Chennai | [confirm] |
| Specialist | digital-dentistry | digital dentistry and intraoral scanning in Chennai | [confirm] |

**Each treatment page template (write original, accurate, plain-English content of 700–1,100 words):**
1. Hero: H1 = "<Treatment> in Chennai", a one-line promise, Book / WhatsApp buttons, and "Performed by" with the doctor chip(s).
2. "Is this right for you?": 4–6 signs or indications.
3. "How it works at Alpha": numbered steps, visit count, and typical duration.
4. "Benefits" and "Things to know" (honest risks and aftercare).
5. "Cost": a range `₹[from]–₹[to]` from `treatments.ts` (TODO values) with "Exact cost after examination; ₹500 consultation." Hide the range if it's empty.
6. Before/after (only if consented cases exist).
7. FAQs: 5–7, written to match real search questions ("Is root canal painful?", "How long do implants last?", "Invisalign vs braces cost in Chennai?").
8. Related treatments (3) + doctor card + booking form.
9. A medical disclaimer line: "Information is general and not a substitute for an in-person examination."

**Medical content rules:** be accurate, conservative and non-promotional. No "best / No.1 / painless guaranteed / 100% success". Dental Council of India ethics rules restrict superlatives and claims. Write as the clinic ("our specialists"), cite no statistics without a source, and add "Reviewed by Dr. <name>, <degree>" with a `lastReviewed` date on each page.

## G. Doctors (`content/doctors.ts`)

| Slug | Name | Credentials / role |
|---|---|---|
| dr-s-zeenath | Dr. S. Zeenath | BDS, FAAD · Managing Director & Chief Dental Surgeon · Laser, Aesthetic & Cosmetic Dentistry · Invisalign Provider |
| dr-mahalakshmi | Dr. Mahalakshmi | MDS, FAAD · Consultant Endodontist · Laser, Aesthetic & Cosmetic Dentistry |
| dr-aravind-sai | Dr. Aravind Sai | Consultant Implantologist · Oral & Maxillofacial Surgeon |
| dr-varshini | Dr. Varshini | BDS, FGDS · Senior Dental Surgeon |
| dr-anjali-sankar | Dr. Anjali Sankar | Endodontist & Conservative Dental Surgeon |
| dr-deena-nancy | Dr. Deena Nancy | Consultant Orthodontist · Invisalign Provider |
| dr-akshaya | Dr. Akshaya | Consultant Periodontist |
| dr-diana-ashok | Dr. Diana Ashok | Consultant Orthodontist |

Fields: `slug, name, degrees, role, specialties[], registrationNo (TODO), experienceYears (TODO), languages (TODO), bio (TODO, 80–120 words), photo, treatments[]`. Doctor page: portrait, credentials block (with the registration number), bio, "Treatments by Dr. X" cards, a "Book with Dr. X" form preselected, and Physician schema. **Leave TODO fields visibly empty in dev and hidden in prod; never invent experience years or registration numbers.**

## H. Home page (in order)

1. **Hero** (split): left H1 "Specialist dental care in R.A. Puram, Chennai". Sub: "Eight specialists, from root canals to Invisalign and implants, under one calm, modern studio." Buttons: Book appointment (accent) · WhatsApp us. Trust row: Google rating ★ (live) · "8 specialists" · "₹500 consultation" · "Mon–Sat 10 AM–8 PM". Right: an arch-masked photo (`hero-operatory`) with a small floating card "Next available: Today" (only if booking provider data exists; otherwise "Same-week appointments").
2. **Treatment finder**: 7 group tiles (General, Restorative, Implants & Surgery, Orthodontics, Gums, Cosmetic, Specialist) with icons and a "What do you need help with?" chip row (Tooth pain · Missing tooth · Crooked teeth · Whiter smile · Bleeding gums · Child's check-up), each linking to the right treatment.
3. **Meet the Smile Architects**: a doctors carousel (photo or initials, name, specialty, "View profile").
4. **Why patients choose Alpha** (4 points, each factual): Specialists for each discipline · Digital scanning and laser technology · Strict sterilisation protocol · Clear treatment plans and costs before we start.
5. **Smile Gallery teaser** (hidden until cases exist).
6. **Reviews**: live Google reviews (hidden if unavailable) + a "Read all reviews" link.
7. **Your first visit in 4 steps**: Book → Consultation and digital check-up → Clear plan and cost → Treatment at your pace.
8. **Technology & hygiene band**: scanner, laser, OPG X-ray, autoclave/sterilisation (use AI illustrations from `IMAGES_AND_SOURCES.md` §4 until clinic photos arrive).
9. **FAQ** (6 general questions) with FAQPage schema.
10. **Visit us**: map embed (click-to-load to protect performance), address with landmark, hours, parking note (TODO), and "Get directions".
11. **Final CTA band**: "Your smile, in expert hands." Book · Call · WhatsApp.

## I. SEO (must pass)

- **Titles and meta per page** from a single `seo()` helper. Patterns:
  - Home: `Alpha Dental Studio | Dental Clinic in R.A. Puram, Chennai` / "Specialist dental clinic in R.A. Puram, Chennai: implants, root canal, Invisalign, braces, gum and cosmetic care. ₹500 consultation. Book online or WhatsApp."
  - Treatment: `<Treatment> in Chennai | Alpha Dental Studio, R.A. Puram`
  - Doctor: `Dr. <Name>, <Specialty> in Chennai | Alpha Dental Studio`
- **JSON-LD:**
  - `Dentist` + `MedicalClinic` on every page: name, url, logo, image, telephone, address, geo, openingHoursSpecification, priceRange "₹₹", areaServed, sameAs, medicalSpecialty.
  - `Physician` per doctor.
  - `MedicalProcedure` + `FAQPage` per treatment.
  - `BreadcrumbList` everywhere.
  - `AggregateRating` **only** from live Google data.
- `app/sitemap.ts`, `app/robots.ts` (allow all, link sitemap), canonical URLs, `hreflang` ready for a future `/ta` Tamil version.
- One H1 per page, logical H2/H3, descriptive alt text, internal links: every treatment ↔ its doctors ↔ related treatments ↔ 1–2 blog posts.
- **Local SEO:** NAP exactly as in `site.ts` in the footer of every page. Add a "Patients visit us from Mylapore, Alwarpet, Mandaveli, Adyar, Teynampet…" line on Contact and First Visit (no doorway pages).
- **Blog starter posts (MDX, 800–1,200 words, accurate, reviewed-by line):**
  1. Root canal treatment cost in Chennai: what affects the price
  2. Invisalign vs braces: which is right for you?
  3. Dental implants: step-by-step, healing time and aftercare
  4. Bleeding gums: causes and when to see a periodontist
  5. Teeth whitening: in-clinic vs at-home, and what is safe
  6. Your child's first dental visit: an age-by-age guide
- Performance: static pages, AVIF/WebP images, `priority` only on the hero image, fonts subset, no layout shift, and third-party scripts deferred until interaction.

## J. Trust & compliance checklist

- Consultation fee, hours, address and landmark visible without scrolling on mobile Contact and First Visit pages.
- "Reviewed by" and last-updated dates on medical pages.
- No invented testimonials, ratings, awards, statistics or "years of experience".
- Cookie and consent banner before analytics. Privacy notice per India's DPDP Act 2023 (TODO legal text).
- Form copy: "We'll call or WhatsApp you within 2 working hours (Mon–Sat)." [confirm]
- 404 page with search + popular treatments + contact.

## K. Phases (stop after each for my review)

1. **Setup:** scaffold, tokens, fonts, layout (header, mega-menu, footer, sticky mobile bar), `site.ts`, image fetch script, placeholder logo. Show me the homepage shell.
2. **Content models:** `doctors.ts`, `treatments.ts` (all 19 with full copy), `faqs.ts`, initials avatars, treatment and doctor templates.
3. **Home page** (section H) with motion, then **About, First Visit, Contact, Book**.
4. **SEO and integrations:** metadata, JSON-LD, sitemap/robots, redirects, Resend form, WhatsApp links, Google Reviews, GA4/Clarity with consent.
5. **Blog** (6 posts), 404, privacy/terms placeholders.
6. **QA:** `npm run build` with zero errors, Lighthouse mobile scores (report them), axe accessibility pass, 360px no horizontal scroll, all links valid, schema validated (list any warnings), and a final **TODO report** listing every placeholder the clinic still has to supply.

Commit after each phase with a clear message.
