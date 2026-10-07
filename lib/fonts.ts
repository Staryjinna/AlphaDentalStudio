import { Poppins } from "next/font/google";

// Poppins is the clinic's existing brand typeface (used on the current site).
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});
