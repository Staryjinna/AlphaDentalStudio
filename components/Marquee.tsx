/** Infinite ticker. `outline` renders the signature outlined type. Pauses on hover. */
export function Marquee({ items, outline = false, className = "" }: { items: string[]; outline?: boolean; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`group relative overflow-hidden ${className}`} aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <span className={outline ? "outline-text" : "font-semibold"}>{t}</span>
            <span className="h-2.5 w-2.5 rounded-full bg-peach" />
          </span>
        ))}
      </div>
    </div>
  );
}
