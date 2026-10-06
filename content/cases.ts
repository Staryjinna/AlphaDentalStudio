// Before/after cases. Starts EMPTY on purpose: the gallery stays hidden until real,
// consented cases are added. Every case must have `consent: true`.
export type SmileCase = {
  id: string;
  treatment: string; // treatment slug
  doctor: string; // doctor slug
  before: string; // /public path
  after: string;
  caption: string;
  consent: true;
};

export const cases: SmileCase[] = [];
export const hasCases = cases.length > 0;
