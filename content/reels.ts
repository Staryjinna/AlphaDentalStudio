// The clinic's own Instagram reels (@alphadentalstudios). Titles come from the posts' captions.
// Covers are saved locally in /public/images/reels (Instagram's image links expire). Players load only on tap.
export type Reel = {
  id: string; // Instagram shortcode
  kind: "story" | "tip";
  title: string;
  blurb: string;
  treatment?: string; // related treatment slug
};

export const reels: Reel[] = [
  { id: "DPG7Eh4CTuv", kind: "story", title: "At 77, I walked in with fear…", blurb: "A patient's honest review: fear to confidence.", treatment: "dental-check-up-cleaning" },
  { id: "DQb4xc-ifx-", kind: "story", title: "From pain to a perfect smile", blurb: "A patient shares his journey with the team.", treatment: "root-canal-treatment" },
  { id: "DRcO2gOCO7B", kind: "story", title: "Care that heals beyond teeth", blurb: "Treated by Dr. Zeenath: a bridge and a fresh start.", treatment: "dental-crowns-bridges" },
  { id: "DRFBw7nCO25", kind: "story", title: "Tiny teeth, big feedback", blurb: "When the little ones speak, it's pure truth.", treatment: "kids-dentistry" },
  { id: "DVle1kbCUsh", kind: "story", title: "A little one's smile says it all", blurb: "She asked if she could come back tomorrow.", treatment: "kids-dentistry" },
  { id: "DctHAb1Ji5f", kind: "tip", title: "Root canal: myth vs reality", blurb: "What a root canal really involves.", treatment: "root-canal-treatment" },
  { id: "DdWULKWJ4QR", kind: "tip", title: "Why choose dental implants?", blurb: "Chewing, digestion and smile restoration.", treatment: "dental-implants" },
  { id: "Dc3WlwvJKMm", kind: "tip", title: "Teeth grinding: the hidden damage", blurb: "How grinding can change your jaw and face.", treatment: "tmj-jaw-pain" },
  { id: "Db-1LIzJslw", kind: "tip", title: "Mouth ulcer gel recommendations", blurb: "Relief for ulcers, braces sores and cheek bites." },
];

export const reelUrl = (id: string) => `https://www.instagram.com/reel/${id}/`;
export const reelsByTreatment = (slug: string) => reels.find((r) => r.treatment === slug && r.kind === "tip") ?? reels.find((r) => r.treatment === slug);
