"use server";
import { branches, site, whatsappHref } from "@/content/site";
import { treatments } from "@/content/treatments";
import { doctors } from "@/content/doctors";

export type BookingState = { status: "idle" | "ok" | "error"; message?: string; whatsapp?: string; errors?: Record<string, string> };

const clean = (v: FormDataEntryValue | null, max = 200) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

/** Validates a booking request, emails it via Resend if configured, and returns a prefilled WhatsApp link. */
export async function submitBooking(_prev: BookingState, form: FormData): Promise<BookingState> {
  if (clean(form.get("company"))) return { status: "ok" }; // honeypot: silently drop bots

  const name = clean(form.get("name"), 80);
  const phone = clean(form.get("phone"), 20);
  const branchId = clean(form.get("branch"));
  const treatment = clean(form.get("treatment"));
  const doctor = clean(form.get("doctor"));
  const date = clean(form.get("date"), 20);
  const slot = clean(form.get("slot"), 40);
  const note = clean(form.get("note"), 400);
  const consent = form.get("consent") === "on";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!/^\+?[0-9\s-]{10,15}$/.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (!consent) errors.consent = "Please agree so we can contact you about your booking.";
  if (Object.keys(errors).length) return { status: "error", errors, message: "Please check the highlighted fields." };

  const branch = branches.find((b) => b.id === branchId)?.name ?? "Either branch";
  const tName = treatments.find((t) => t.slug === treatment)?.title ?? "Not sure yet";
  const dName = doctors.find((d) => d.slug === doctor)?.name ?? "No preference";

  const lines = [
    `Name: ${name}`, `Phone: ${phone}`, `Branch: ${branch}`, `Treatment: ${tName}`, `Doctor: ${dName}`,
    `Preferred date: ${date || "Flexible"}`, `Preferred time: ${slot || "Flexible"}`, ...(note ? [`Note: ${note}`] : []),
  ];
  const whatsapp = whatsappHref(`Hello Alpha Dental Studio, I'd like to book an appointment.\n\n${lines.join("\n")}`);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No email provider configured: the WhatsApp message is the booking channel.
    return { status: "ok", whatsapp, message: "Send your request on WhatsApp to confirm." };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM ?? `${site.name} <onboarding@resend.dev>`,
        to: [process.env.BOOKING_TO ?? site.email],
        reply_to: undefined,
        subject: `New booking request: ${name} (${tName})`,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return { status: "ok", whatsapp, message: "Thank you. We'll call or WhatsApp you within 2 working hours (Mon–Sat)." };
  } catch {
    return { status: "ok", whatsapp, message: "We couldn't email your request, so please send it on WhatsApp to confirm." };
  }
}
