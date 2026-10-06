"use client";
import { useState } from "react";
import { MapPin, Navigation, Phone } from "lucide-react";
import { TabsBar } from "../TabsBar";
import { ActionLink } from "../ActionLink";
import { branches, formatAddress, site, telHref } from "@/content/site";
import { track } from "@/lib/analytics";

/** Branch tabs + click-to-load map (keeps the Google iframe off the critical path). */
export function VisitUs() {
  const [id, setId] = useState(branches[0].id);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const b = branches.find((x) => x.id === id)!;
  const query = encodeURIComponent(`${site.name}, ${formatAddress(b).join(", ")}`);
  return (
    <div>
      <TabsBar label="Branches" value={id} onChange={setId} tabs={branches.map((x) => ({ id: x.id, label: x.name, icon: <MapPin size={16} aria-hidden /> }))} />
      <div className="mt-6 grid gap-5 lg:grid-cols-5">
        <div className="card flex flex-col justify-between p-7 lg:col-span-2">
          <div>
            <h3>{site.name}, {b.name}</h3>
            <address className="mt-3 text-base not-italic text-muted">
              {formatAddress(b).map((l) => <p key={l}>{l}</p>)}
              {b.landmark && <p className="mt-1 font-medium text-ink">{b.landmark}</p>}
            </address>
            <p className="mt-4 text-base"><strong>{site.hoursLabel}</strong><br />{site.sundayLabel}</p>
            <p className="mt-2 text-sm text-muted">Parking: please ask when you book.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionLink href={b.mapsUrl} event="click_directions" arrow>Get directions</ActionLink>
            <ActionLink href={telHref(b.phone)} event="click_call" variant="secondary"><Phone size={18} aria-hidden /> {b.phone}</ActionLink>
          </div>
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-[var(--radius)] border border-cocoa/10 bg-sand lg:col-span-3">
          {loaded[id] ? (
            <iframe title={`Map of ${site.name}, ${b.name}`} src={`https://www.google.com/maps?q=${query}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
          ) : (
            <button type="button" onClick={() => { setLoaded((s) => ({ ...s, [id]: true })); track("click_directions"); }} className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-cocoa transition-colors hover:bg-peach/30">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cocoa text-peach shadow-xl"><Navigation size={26} aria-hidden /></span>
              <span className="text-lg font-semibold">Load interactive map</span>
              <span className="px-6 text-center text-sm text-muted">Loads Google Maps. Your browser will connect to Google.</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
