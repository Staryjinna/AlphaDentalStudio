# Alpha Dental Studio: Images, Logo & Sources

Three kinds of images, three rules:

| Kind | Where it comes from | Rule |
|---|---|---|
| **Doctors** | The clinic's own photos (or a photo shoot) | **Never** stock or AI faces for a named doctor. |
| **Logo** | The clinic's original files | Don't redraw or download from Google. Ask for the source file. |
| **Treatments, clinic mood, smiles** | Free Unsplash photos below, plus AI-generated illustrations (prompts below) | Free for commercial use; replace with real clinic photos over time. |

---

## 1. Doctor photos (real ones only)

Medical sites are judged on trust, and Google's health-content guidelines put weight on real, named experts. A stock or AI-generated face next to "Dr. Mahalakshmi, MDS" would be misleading to patients and could breach Dental Council of India ethics rules. Use only photos the clinic supplies.

**Where the real photos already exist (ask the clinic to send the originals, don't scrape):**
- The current site's team section: https://alphadentalstudios.com/ (the "Smile Architects" section). Ask the clinic or the old developer for the files from WordPress → Media Library.
- Practo doctor profiles: https://www.practo.com/chennai/clinic/alpha-dental-studio-thiruvengadam-nagar (doctors can download their own profile photos)
- The clinic's Facebook page: https://www.facebook.com/alphadentalstudios/

**Better: a 2-hour photo shoot at the clinic** (₹8k–20k with a Chennai commercial photographer). Shot list:
1. Each doctor: head-and-shoulders portrait, plain light background, white coat or scrubs, natural smile, shoulders angled 30°. Shoot both landscape and portrait.
2. Each doctor at work: with a patient (consented) or with the scanner or laser.
3. The team group photo in the reception.
4. Clinic: entrance and signboard, reception, each operatory, the sterilisation room, the intraoral scanner, the laser unit, the X-ray/OPG.
5. Details: instrument tray, sterilised pouches, a smiling patient leaving (consented).
6. A 20–30 s vertical video walk-through for the homepage and Instagram.

**Spec for the developer:** 1200 × 1500 px (4:5) portraits, sRGB, JPG. Name files `dr-zeenath.jpg`, `dr-mahalakshmi.jpg`, etc. Until photos arrive, the site shows an **initials avatar** (for example "SZ" on a tinted circle), never a stock face.

**Doctor details to collect for each:** full name as registered, degrees, college, DCI/TNSDC registration number, years of experience, special interests, languages (English, Tamil, Hindi, …), and 2–3 lines of bio in their own words.

---

## 2. Logo

- Ask the clinic for the **original logo files** (AI, EPS, SVG or PDF from their designer). Failing that, the highest-resolution PNG they have. Also get the brand colours (HEX) and font name if known.
- Needed: full logo (horizontal), icon only (for the favicon and app icon), and white versions for dark backgrounds.
- `/brand/alpha-wordmark-placeholder.svg` in this kit is a **temporary text wordmark for development only**. Swap in the real logo before launch.

**If the clinic wants a logo refresh**, use these prompts to explore ideas, then have a designer redraw the chosen one as a clean vector (AI images can't be used directly as a logo file):

```
Minimal premium logo for "Alpha Dental Studio", a boutique dental clinic in Chennai.
Monogram combining the Greek letter alpha (α) with a subtle tooth silhouette, single-weight
line, geometric, elegant. Deep ink teal (#0E3B43) on warm off-white. Wordmark in a refined
high-contrast serif, "ALPHA" letter-spaced, "Dental Studio" in a clean sans below. Flat vector,
no gradients, no 3D, no clip-art tooth, lots of negative space, luxury healthcare brand feel.
```
```
App icon for a dental clinic: a lowercase alpha symbol formed from one continuous line that
suggests a smile, centered in a rounded square, teal on cream, flat vector, crisp at 32px.
```

---

## 3. Free stock photos (Unsplash License: free commercial use, no attribution required)

✅ = I opened the photo page on 6 Oct 2026 and confirmed it exists and is free (not Unsplash+). The others came from the same Unsplash searches.
Use the image URL with sizing params, e.g. `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80&auto=format&fit=crop`.

| Use on | ✓ | Image URL | Photo page · Photographer |
|---|---|---|---|
| **Home hero / About**: modern operatory | ✅ | https://images.unsplash.com/photo-1629909613654-28e377c37b09 | [e7MJLM5VGjY](https://unsplash.com/photos/modern-dental-office-with-chair-and-equipment-e7MJLM5VGjY) · Benyamin Bohlouli |
| About / clinic: dental chair, bright room | ✅ | https://images.unsplash.com/photo-1598256989800-fe5f95da9787 | [XJptUS8nbhs](https://unsplash.com/photos/XJptUS8nbhs) · Atikah Akhtar |
| General dentistry: dentists performing a procedure | ✅ | https://images.unsplash.com/photo-1588776814546-daab30f310ce | [hl6uG9cHW5A](https://unsplash.com/photos/hl6uG9cHW5A) · Jonathan Borba |
| Root canal / Diagnosis: dentist reading X-rays | ✅ | https://images.unsplash.com/photo-1588776814546-1ffcf47267a5 | [v_2FRXEba94](https://unsplash.com/photos/v_2FRXEba94) · Jonathan Borba |
| Digital dentistry: patient with intraoral scanner | ✅ | https://images.unsplash.com/photo-1667133295315-820bb6481730 | [joILn6p_oeM](https://unsplash.com/photos/dentist-examining-patient-with-dental-scanner-joILn6p_oeM) · Filip Rankovic Grobgaard |
| Implants (hero): gloved hand with implant + crown | ✅ | https://images.unsplash.com/photo-1771442873035-474765b40ac6 | [eHwRLpfHSKY](https://unsplash.com/photos/gloved-hand-holding-a-dental-implant-and-crown-eHwRLpfHSKY) · Katarzyna Zygnerska |
| Implants (body): implant model | ✅ | https://images.unsplash.com/photo-1593022356769-11f762e25ed9 | [W9YEY6G8LVM](https://unsplash.com/photos/W9YEY6G8LVM) · Jonathan Borba |
| Invisalign / aligners | ✅ | https://images.unsplash.com/photo-1609840114035-3c981b782dfe | [fmB7IdFjhTM](https://unsplash.com/photos/person-inserting-clear-dental-aligner-fmB7IdFjhTM) · Diana Polekhina |
| Braces: close-up | ✅ | https://images.unsplash.com/photo-1720685193964-4529228a33c1 | [P8ernb_Ht-M](https://unsplash.com/photos/P8ernb_Ht-M) · Katarzyna Zygnerska |
| Teeth whitening / Veneers: bright smile close-up | ✅ | https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed | [RCQnbyQsnUg](https://unsplash.com/photos/a-close-up-of-a-womans-mouth-with-white-teeth-RCQnbyQsnUg) · Kamal Hoseinianzade |
| Kids dentistry: dentist examining a boy | ✅ | https://images.unsplash.com/photo-1758205307836-0829c799890b | [Y_D9bmeX1V0](https://unsplash.com/photos/Y_D9bmeX1V0) · Navy Medicine |
| Oral surgery / TMJ: panoramic X-ray | ✅ | https://images.unsplash.com/photo-1777445374290-eedda5be8e5b | [QWgq6Rjw0SE](https://unsplash.com/photos/QWgq6Rjw0SE) · Harold Hisona |
| Smile / emotion: Indian woman smiling | ✅ | https://images.unsplash.com/photo-1618245472177-2a74ad3b994a | [RgDVFbXllVA](https://unsplash.com/photos/woman-in-red-and-yellow-shirt-RgDVFbXllVA) · Yogendra Singh |
| Diagnostics: X-ray on a monitor |  | https://images.unsplash.com/photo-1755526739866-c73f65b82f8e | [DwlC4fija6o](https://unsplash.com/photos/DwlC4fija6o) · Fr0ggy5 |
| Treatment planning: scan on a tablet |  | https://images.unsplash.com/photo-1600170311833-c2cf5280ce49 | [VckdJzo7ig0](https://unsplash.com/photos/VckdJzo7ig0) · Quang Tri NGUYEN |
| Check-up: mirror + explorer on white |  | https://images.unsplash.com/photo-1606811856475-5e6fcdc6e509 | [ux18C551ghI](https://unsplash.com/photos/dental-mirror-and-explorer-tool-ux18C551ghI) · Caroline LM |
| Dentures: holding a denture |  | https://images.unsplash.com/photo-1468493858157-0da44aaf1d13 | [U1gvhqVQ2kQ](https://unsplash.com/photos/person-wearing-silver-colored-ring-while-holding-denture-U1gvhqVQ2kQ) · Peter Kasprzyk |
| Cosmetic / whitening: aligners + whitener |  | https://images.unsplash.com/photo-1564420228450-d9a5bc8d6565 | [WFsNCIn8OF4](https://unsplash.com/photos/hands-holding-dental-aligners-and-whitener-WFsNCIn8OF4) · Candid |
| Smile (alt) |  | https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2 | [1AhGNGKuhR0](https://unsplash.com/photos/long-black-haired-woman-smiling-close-up-photography-1AhGNGKuhR0) · Lesly Juarez |
| Clinic interior (alt) |  | https://images.unsplash.com/photo-1704455306251-b4634215d98f | [Fdku_oMrDvk](https://unsplash.com/photos/a-dental-room-with-a-desk-and-chairs-Fdku_oMrDvk) · Kari Bjorn Photography |

**Gaps in free stock** (use AI illustrations or the clinic's own photos): gum treatment, laser dentistry, sedation, tooth jewellery, crowns/bridges, sterilisation.

**More free sources to browse:**
- Unsplash: [dental clinic](https://unsplash.com/s/photos/dental-clinic) · [dentist](https://unsplash.com/s/photos/dentist) · [dental implant](https://unsplash.com/s/photos/dental-implant) · [clear aligner](https://unsplash.com/s/photos/clear-aligner) · [teeth whitening](https://unsplash.com/s/photos/teeth-whitening) · [dental x-ray](https://unsplash.com/s/photos/dental-x-ray) · [Indian smile](https://unsplash.com/s/photos/indian-smile)
- Pexels (free licence): [dentist](https://www.pexels.com/search/dentist/) · [dental clinic](https://www.pexels.com/search/dental%20clinic/) · [Indian dentist](https://www.pexels.com/search/indian%20dentist/)
- Icons: [Lucide](https://lucide.dev) (ISC licence), and [Healthicons](https://healthicons.org) (CC0, has tooth, implant and X-ray icons)

**Don't use:** Google Images, competitor clinic sites, Practo photos of other clinics, or Shutterstock/Freepik previews with watermarks. The before/after gallery must be **only the clinic's own cases with signed patient consent**. Stock "before/after" photos are misleading for a medical site.

---

## 4. AI image prompts (illustrations for gaps and section art)

Use Midjourney, Ideogram, Adobe Firefly, or ChatGPT/DALL·E. Generate at 1600 × 1200 (4:3) or 1600 × 900 (16:9). Keep **one consistent style** across all of them. These are illustrations or object shots, never fake patients or fake doctors.

**House style suffix (append to every prompt):**
```
soft studio lighting, clean clinical-luxury aesthetic, warm off-white (#F7F4EF) background,
accents of deep teal (#0E3B43) and soft sand (#E8DCCB), minimal, high detail, no text,
no logos, no people's faces
```

| For | Prompt |
|---|---|
| Home hero background (if no clinic photo yet) | `Wide editorial photo of a calm, modern boutique dental studio interior, a single sculptural dental chair in cream leather, oak wood panels, indoor plant, morning light through linen curtains, shallow depth of field` + style |
| Implants | `Macro 3D render of a titanium dental implant with a ceramic crown, cut-away view showing the implant in the jawbone, anatomically accurate, educational medical illustration` + style |
| Root canal | `Clean 3D medical illustration of a molar tooth cross-section showing the root canals being cleaned and filled, step diagram feel, accurate anatomy` + style |
| Crowns & bridges | `Three porcelain dental crowns and a three-unit bridge arranged on a stone tray, product photography, crisp shadows` + style |
| Gum treatment | `3D illustration comparing healthy pink gums and inflamed gums around lower front teeth, side-by-side educational layout` + style |
| Laser dentistry | `Close-up of a sleek modern dental laser handpiece resting on a sterile tray, thin soft-blue beam, product photography` + style |
| Sedation | `Calm dental treatment room with dimmed warm lighting, noise-cancelling headphones and a soft blanket on the chair, reassuring atmosphere` + style |
| Sterilisation | `Neat rows of sealed sterilisation pouches with dental instruments next to a modern autoclave, clinical precision, product photography` + style |
| Digital dentistry | `Intraoral scanner wand beside a monitor showing a colourful 3D scan of a dental arch, high-tech, product photography` + style |
| Tooth jewellery | `Macro photo of a tiny crystal tooth gem on a single porcelain tooth model, elegant jewellery-style photography` + style |
| Kids dentistry | `Friendly flat illustration of a smiling cartoon tooth character with a toothbrush, playful but soft pastel palette` + style |
| TMJ | `Educational 3D illustration of the human jaw joint (temporomandibular joint) with the muscles highlighted in soft teal` + style |
| Section dividers / pattern | `Seamless subtle line pattern of tiny alpha symbols and tooth outlines, 1px strokes, very low contrast, wallpaper tile` + style |
| Open Graph share image | `Elegant banner composition: cream background, single porcelain tooth model on a stone plinth at right, generous empty space on the left for a headline` + style |

After generating: export to WebP, under 200 KB each, file names like `ai-implant-cutaway.webp`, and add descriptive alt text.

---

## 5. Business facts used in the build (confirm the ones marked [confirm])

- **Name:** Alpha Dental Studio · **Tagline:** Innovating Smiles. Inspiring Lives.
- **Address:** Door No. 2, 1st Floor, Plot No. 65, Old Door No. 26/4 (New 4), Thiruvengadam Street, next to CSI St. Luke's Church, Raja Annamalai Puram, Chennai, Tamil Nadu 600028 [confirm exact format]
- **Hours:** Mon–Sat 10:00 AM–8:00 PM [confirm; Practo says Mon–Sun]
- **Consultation:** ₹500 (from Practo) [confirm]
- **Phone / WhatsApp / Email:** [get from clinic]
- **Doctors:** Dr. S. Zeenath (BDS, FAAD; Managing Director & Chief Dental Surgeon; Laser, Aesthetic & Cosmetic; Invisalign provider) · Dr. Mahalakshmi (MDS, FAAD; Consultant Endodontist; Laser, Aesthetic & Cosmetic) · Dr. Aravind Sai (Consultant Implantologist; Oral & Maxillofacial Surgeon) · Dr. Varshini (BDS, FGDS; Senior Dental Surgeon) · Dr. Anjali Sankar (Endodontist & Conservative Dental Surgeon) · Dr. Deena Nancy (Consultant Orthodontist; Invisalign provider) · Dr. Akshaya (Consultant Periodontist) · Dr. Diana Ashok (Consultant Orthodontist) [confirm the current team; Practo lists different names]

**Sources:**
- [Alpha Dental Studio website](https://alphadentalstudios.com/)
- [Practo clinic page](https://www.practo.com/chennai/clinic/alpha-dental-studio-thiruvengadam-nagar)
- [Practo services](https://www.practo.com/chennai/clinic/alpha-dental-studio-thiruvengadam-nagar/services)
- [ProManage listing](https://www.promanage.biz/alpha-dental-studio/dental-clinic-in-raja-annamalai-puram-chennai-11764323-profile)
- [Unsplash License](https://unsplash.com/license)
