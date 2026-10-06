// Names, degrees and roles are from the clinic's live team page. Registration numbers, years of experience,
// languages and bios are NOT published there, so they stay empty (TODO) rather than invented.
export type Doctor = {
  slug: string;
  name: string;
  degrees: string;
  role: string;
  specialties: string[];
  treatments: string[]; // treatment slugs
  registrationNo?: string; // TODO
  experienceYears?: number; // TODO
  languages?: string[]; // TODO
  bio?: string; // TODO (80–120 words, in the doctor's own words)
  quote?: string; // verbatim from the live site, if any
  photo?: string; // set automatically if /public/doctors/<slug>.jpg exists
  lead?: boolean;
};

const doctorData: Omit<Doctor, "photo">[] = [
  {
    slug: "dr-s-zeenath", name: "Dr. S. Zeenath", degrees: "B.D.S, F.A.A.D",
    role: "Managing Director & Chief Dental Surgeon",
    specialties: ["Laser dentistry", "Aesthetic & cosmetic dentistry", "Invisalign provider"],
    treatments: ["invisalign-clear-aligners", "laser-dentistry", "teeth-whitening", "veneers", "smile-makeover"],
    quote: "With a passion for artistry and precision, I have dedicated my career to mastering the latest techniques in aesthetic dentistry.",
    lead: true,
  },
  {
    slug: "dr-mahalakshmi", name: "Dr. Mahalakshmi", degrees: "M.D.S, F.A.A.D",
    role: "Consultant Endodontist",
    specialties: ["Endodontics", "Laser dentistry", "Aesthetic & cosmetic dentistry"],
    treatments: ["root-canal-treatment", "laser-dentistry"],
  },
  {
    slug: "dr-aravind-sai", name: "Dr. Aravind Sai", degrees: "M.D.S",
    role: "Consultant Implantologist & Oral and Maxillofacial Surgeon",
    specialties: ["Dental implants", "Oral & maxillofacial surgery"],
    treatments: ["dental-implants", "tooth-extraction", "wisdom-tooth-removal", "oral-maxillofacial-surgery", "dentures", "tmj-jaw-pain"],
  },
  {
    slug: "dr-arulmozhi", name: "Dr. Arulmozhi", degrees: "B.D.S, M.D.S, PGCE, Dip. in Laser Dentistry",
    role: "Clinical Head",
    specialties: ["Clinical leadership", "Laser dentistry"],
    treatments: ["laser-dentistry"],
  },
  {
    slug: "dr-varshini", name: "Dr. Varshini", degrees: "B.D.S, F.G.D.S",
    role: "Senior Dental Surgeon",
    specialties: ["General dentistry", "Scaling & polishing", "Paediatric care"],
    treatments: ["dental-check-up-cleaning", "kids-dentistry"],
  },
  {
    slug: "dr-archana", name: "Dr. Archana", degrees: "B.D.S",
    role: "Senior Dental Surgeon",
    specialties: ["General dentistry"],
    treatments: ["dental-check-up-cleaning", "tooth-extraction"],
  },
  {
    slug: "dr-anjali-sankar", name: "Dr. Anjali Sankar", degrees: "M.D.S",
    role: "Endodontist & Conservative Dental Surgeon",
    specialties: ["Endodontics", "Conservative dentistry"],
    treatments: ["root-canal-treatment", "dental-crowns-bridges"],
  },
  {
    slug: "dr-deena-nancy", name: "Dr. Deena Nancy", degrees: "M.D.S",
    role: "Consultant Orthodontist & Invisalign Provider",
    specialties: ["Orthodontics", "Clear aligners"],
    treatments: ["braces", "invisalign-clear-aligners"],
  },
  {
    slug: "dr-akshaya", name: "Dr. Akshaya", degrees: "M.D.S",
    role: "Consultant Periodontist",
    specialties: ["Gum disease", "Periodontal surgery"],
    treatments: ["gum-treatment"],
  },
  {
    slug: "dr-diana-ashok", name: "Dr. Diana Ashok", degrees: "M.D.S",
    role: "Consultant Orthodontist",
    specialties: ["Orthodontics", "Braces"],
    treatments: ["braces"],
  },
];

// Doctors with a real photo in /public/doctors/<slug>.jpg (the clinic's own images from its live site).
// Anyone not listed gets an initials avatar: never a stock or AI face.
const withPhoto = new Set([
  "dr-s-zeenath", "dr-mahalakshmi", "dr-aravind-sai", "dr-varshini",
  "dr-anjali-sankar", "dr-deena-nancy", "dr-akshaya", "dr-diana-ashok",
]);

export const doctors: Doctor[] = doctorData.map((d) => ({ ...d, photo: withPhoto.has(d.slug) ? `/doctors/${d.slug}.jpg` : undefined }));

export const getDoctor = (slug: string) => doctors.find((d) => d.slug === slug);
