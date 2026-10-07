"use client";
import { useEffect, useState } from "react";

// Hours from content/site.ts: Mon–Sat 10:00–20:00 (India time). Computed in the browser so it is always current.
function status(now = new Date()) {
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = ist.getDay(); // 0 = Sunday
  const mins = ist.getHours() * 60 + ist.getMinutes();
  const open = 10 * 60, close = 20 * 60;
  if (day !== 0 && mins >= open && mins < close) return { open: true, text: close - mins <= 60 ? "Open now · closing soon (8 PM)" : "Open now · until 8 PM" };
  if (day !== 0 && mins < open) return { open: false, text: "Closed · opens today at 10 AM" };
  if (day === 6 || day === 0) return { open: false, text: day === 0 ? "Closed today · opens Monday 10 AM" : "Closed · opens Monday 10 AM" };
  return { open: false, text: "Closed · opens tomorrow at 10 AM" };
}

export function OpenNow({ className = "" }: { className?: string }) {
  const [s, setS] = useState<ReturnType<typeof status> | null>(null);
  useEffect(() => { setS(status()); const t = setInterval(() => setS(status()), 60000); return () => clearInterval(t); }, []);
  if (!s) return <span className={`inline-block h-7 ${className}`} aria-hidden />;
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        {s.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${s.open ? "bg-success" : "bg-tan"}`} />
      </span>
      {s.text}
    </span>
  );
}
