import type { Faq } from "./treatments";
import { site } from "./site";

// General FAQs. Answers stick to facts from the clinic's own site; anything unconfirmed is phrased as "ask us".
export const generalFaqs: Faq[] = [
  { q: "Where are your clinics and what are your opening hours?", a: `We have two branches in Chennai: R.A. Puram (Thiruvengadam Street) and Kottivakkam (Kannappa Nagar). Both are open ${site.hoursLabel}. We are closed on Sundays.` },
  { q: "How do I book an appointment?", a: "You can book through the form on our Book page, call us, or message us on WhatsApp. We will confirm your slot by call or WhatsApp." },
  { q: "Do you have specialists for different treatments?", a: "Yes. Our team includes an endodontist, implantologist and oral surgeon, orthodontists, a periodontist and dental surgeons, plus Invisalign providers, so most treatments are planned by the relevant specialist." },
  { q: "I am very nervous about dental treatment. Can you help?", a: "Yes. We offer oral conscious sedation for anxious patients and those with a strong gag reflex, and a comfort menu with options such as blankets, neck pillows, music or shows, and refreshments." },
  { q: "Will I know the cost before treatment starts?", a: "Yes. After your examination, we explain your options and the cost of each before we begin. Nothing proceeds without your agreement." },
  { q: "Do you treat children and patients with special needs?", a: "Yes. We see children, and we offer special needs dentistry with custom hygiene and treatment plans and clear communication with patients and their families." },
];
