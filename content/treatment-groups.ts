// Navigation metadata for the 7 groups / 19 treatments. Full page copy arrives in content/treatments.ts (phase 2).
export type TreatmentGroup = {
  id: string;
  title: string;
  blurb: string;
  items: { slug: string; title: string }[];
};

export const treatmentGroups: TreatmentGroup[] = [
  {
    id: "general", title: "General", blurb: "Check-ups, cleaning, extractions and care for children.",
    items: [
      { slug: "dental-check-up-cleaning", title: "Check-up & cleaning" },
      { slug: "tooth-extraction", title: "Tooth extraction" },
      { slug: "kids-dentistry", title: "Kids dentistry" },
    ],
  },
  {
    id: "restorative", title: "Restorative", blurb: "Save and rebuild damaged or missing teeth.",
    items: [
      { slug: "root-canal-treatment", title: "Root canal treatment" },
      { slug: "dental-crowns-bridges", title: "Crowns & bridges" },
      { slug: "dentures", title: "Dentures" },
    ],
  },
  {
    id: "implants-surgery", title: "Implants & Surgery", blurb: "Replace missing teeth and treat jaw conditions.",
    items: [
      { slug: "dental-implants", title: "Dental implants" },
      { slug: "wisdom-tooth-removal", title: "Wisdom tooth removal" },
      { slug: "oral-maxillofacial-surgery", title: "Oral & maxillofacial surgery" },
    ],
  },
  {
    id: "orthodontics", title: "Orthodontics", blurb: "Straighten teeth with braces or clear aligners.",
    items: [
      { slug: "braces", title: "Braces" },
      { slug: "invisalign-clear-aligners", title: "Invisalign clear aligners" },
    ],
  },
  {
    id: "gums", title: "Gums", blurb: "Gum health and gentle laser care.",
    items: [
      { slug: "gum-treatment", title: "Gum treatment" },
      { slug: "laser-dentistry", title: "Laser dentistry" },
    ],
  },
  {
    id: "cosmetic", title: "Cosmetic", blurb: "Brighten and reshape your smile.",
    items: [
      { slug: "teeth-whitening", title: "Teeth whitening" },
      { slug: "veneers", title: "Veneers" },
      { slug: "smile-makeover", title: "Smile makeover" },
    ],
  },
  {
    id: "specialist", title: "Specialist", blurb: "Jaw pain, sedation, special needs and digital dentistry.",
    items: [
      { slug: "tmj-jaw-pain", title: "TMJ & jaw pain" },
      { slug: "sedation-dentistry", title: "Sedation dentistry" },
      { slug: "special-needs-dentistry", title: "Special needs dentistry" },
      { slug: "digital-dentistry", title: "Digital dentistry" },
    ],
  },
];
