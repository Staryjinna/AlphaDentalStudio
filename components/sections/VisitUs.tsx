"use client";
import { useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { TabsBar } from "../TabsBar";
import { ActionLink } from "../ActionLink";
import { branches, formatAddress, mapEmbedSrc, site, telHref } from "@/content/site";

/** Branch tabs + click-to-load map (keeps the Google iframe off the critical path). */
export function VisitUs() {
  const [id, setId] = useState(branches[0].id);
  const b = branches.find((x) => x.id === id)!;
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
        <div className="relative min-h-72 overflow-hidden rounded-[var(--radius)] border border-cocoa/10 bg-sand md:min-h-80 lg:col-span-3">
          {/* Real Google map, loaded lazily as it nears the viewport */}
          <iframe key={id} title={`Map of ${site.name}, ${b.name}`} src={mapEmbedSrc(b)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
        </div>
      </div>
    </div>
  );
}
