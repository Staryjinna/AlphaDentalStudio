import { Smile } from "lucide-react";

/** Circular rotating text badge with the brand line. */
export function RotatingBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center rounded-full bg-peach text-cocoa shadow-xl`} aria-hidden>
      <svg viewBox="0 0 120 120" className="absolute inset-0 animate-[spin-slow_18s_linear_infinite]">
        <defs><path id="ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
        <text fontSize="9.6" fontWeight="600" letterSpacing="2.4" fill="currentColor"><textPath href="#ring">INNOVATING SMILES • INSPIRING LIVES •</textPath></text>
      </svg>
      <Smile size={30} />
    </div>
  );
}
