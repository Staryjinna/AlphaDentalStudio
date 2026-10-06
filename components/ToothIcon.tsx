/** Simple tooth glyph, drawn in-house (no third-party artwork). Inherits currentColor. */
export function ToothIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M7.2 3.2c-2.2 0-4 1.8-4 4.4 0 2.3.9 3.6 1.6 5.4.7 1.8.8 4.3 1.2 6.1.3 1.3 1.1 1.8 1.7 1.8.9 0 1.3-.9 1.7-2.7.3-1.3.7-2 1.6-2s1.3.7 1.6 2c.4 1.8.8 2.7 1.7 2.7.6 0 1.4-.5 1.7-1.8.4-1.8.5-4.3 1.2-6.1.7-1.8 1.6-3.1 1.6-5.4 0-2.6-1.8-4.4-4-4.4-1.9 0-2.8.9-4.8.9S9.1 3.2 7.2 3.2Z" />
    </svg>
  );
}
