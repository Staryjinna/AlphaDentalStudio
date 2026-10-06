"use client";
import { useActionState, useEffect } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { submitBooking, type BookingState } from "@/app/actions/booking";
import { branches, site } from "@/content/site";
import { treatmentGroups } from "@/content/treatment-groups";
import { doctors } from "@/content/doctors";
import { track } from "@/lib/analytics";

const field = "mt-1.5 block min-h-12 w-full rounded-2xl border border-ink/15 bg-white px-4 text-base text-ink shadow-sm transition-shadow placeholder:text-muted/70 focus:border-brand-600 focus:shadow-[0_0_0_4px_rgb(31_111_120/.15)] focus:outline-none";
const label = "block text-sm font-semibold text-brand-900";
const initial: BookingState = { status: "idle" };

export function BookingForm({ treatment, doctor, dark = false }: { treatment?: string; doctor?: string; dark?: boolean }) {
  const [state, action, pending] = useActionState(submitBooking, initial);
  const provider = process.env.NEXT_PUBLIC_BOOKING_PROVIDER ?? "form";
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

  useEffect(() => { if (state.status === "ok") track("booking_submit"); }, [state.status]);

  // BOOKING_PROVIDER switch: a Cal.com embed replaces the request form when configured.
  if (provider === "cal" && calLink) {
    return <iframe title="Book an appointment" src={`https://cal.com/${calLink}?embed=true`} loading="lazy" className="h-[640px] w-full rounded-3xl border border-ink/10 bg-white" />;
  }

  if (state.status === "ok") {
    return (
      <div role="status" className="card p-8 text-center">
        <CheckCircle2 className="mx-auto text-success" size={44} aria-hidden />
        <h3 className="mt-4">Request received</h3>
        <p className="mx-auto mt-2 max-w-md text-base text-muted">{state.message}</p>
        {state.whatsapp && (
          <a href={state.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => track("click_whatsapp")}
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-success px-6 font-semibold text-white hover:opacity-90">
            <MessageCircle size={18} aria-hidden /> Confirm on WhatsApp
          </a>
        )}
      </div>
    );
  }

  const err = state.errors ?? {};
  return (
    <form action={action} className={`card p-6 md:p-8 ${dark ? "" : ""}`} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="b-name" className={label}>Your name</label>
          <input id="b-name" name="name" autoComplete="name" required className={field} aria-invalid={!!err.name} aria-describedby={err.name ? "b-name-e" : undefined} />
          {err.name && <p id="b-name-e" className="mt-1 text-sm text-red-700">{err.name}</p>}
        </div>
        <div>
          <label htmlFor="b-phone" className={label}>Phone / WhatsApp</label>
          <input id="b-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+91" className={field} aria-invalid={!!err.phone} aria-describedby={err.phone ? "b-phone-e" : undefined} />
          {err.phone && <p id="b-phone-e" className="mt-1 text-sm text-red-700">{err.phone}</p>}
        </div>
        <div>
          <label htmlFor="b-branch" className={label}>Branch</label>
          <select id="b-branch" name="branch" className={field} defaultValue="">
            <option value="">Either branch</option>
            {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="b-treatment" className={label}>Treatment</label>
          <select id="b-treatment" name="treatment" className={field} defaultValue={treatment ?? ""}>
            <option value="">Not sure yet</option>
            {treatmentGroups.map((g) => (
              <optgroup key={g.id} label={g.title}>{g.items.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}</optgroup>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="b-doctor" className={label}>Preferred doctor</label>
          <select id="b-doctor" name="doctor" className={field} defaultValue={doctor ?? ""}>
            <option value="">No preference</option>
            {doctors.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="b-date" className={label}>Preferred date</label>
          <input id="b-date" name="date" type="date" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="b-slot" className={label}>Preferred time</label>
          <select id="b-slot" name="slot" className={field} defaultValue="">
            <option value="">Flexible</option>
            <option>Morning (10 AM–1 PM)</option>
            <option>Afternoon (1–4 PM)</option>
            <option>Evening (4–8 PM)</option>
          </select>
          <p className="mt-1 text-sm text-muted">We are open {site.hoursLabel}. Closed Sundays.</p>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="b-note" className={label}>Anything we should know? (optional)</label>
          <textarea id="b-note" name="note" rows={3} className={`${field} py-3`} />
        </div>
        {/* honeypot */}
        <div className="hidden" aria-hidden><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-muted">
            <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-[var(--brand-600)]" aria-invalid={!!err.consent} />
            <span>I agree to {site.name} contacting me about this request and storing these details for that purpose. See the <a href="/privacy" className="underline">privacy notice</a>.</span>
          </label>
          {err.consent && <p className="mt-1 text-sm text-red-700">{err.consent}</p>}
        </div>
      </div>
      {state.status === "error" && state.message && <p role="alert" className="mt-4 text-base font-medium text-red-700">{state.message}</p>}
      <button type="submit" disabled={pending}
        className="sheen mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent-btn px-6 text-base font-semibold text-white shadow-[0_10px_28px_-8px_rgb(168_90_40/.7)] transition-colors hover:bg-accent-btn-hover disabled:opacity-60 sm:w-auto">
        <Send size={18} aria-hidden /> {pending ? "Sending…" : "Request appointment"}
      </button>
      <p className="mt-3 text-sm text-muted">We&apos;ll call or WhatsApp you within 2 working hours (Mon–Sat).</p>
    </form>
  );
}
