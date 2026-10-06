export type TrackEvent = "click_call" | "click_whatsapp" | "booking_submit" | "click_directions";

/** Sends a GA4 event if analytics has been loaded (after consent). No-op otherwise. */
export function track(event: TrackEvent, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, params);
}
