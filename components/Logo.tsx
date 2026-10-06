import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

/** The clinic's real logo: peach "A" mark + wordmark. `onDark` uses the light variants. */
export function Logo({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name}, home`} className={`inline-flex items-center gap-3 ${className}`}>
      <Image src={onDark ? "/brand/mark-peach.png" : "/brand/mark-rose.png"} alt="" width={44} height={44} priority className="h-10 w-auto md:h-11" />
      <Image src={onDark ? "/brand/wordmark-white.svg" : "/brand/wordmark-dark.svg"} alt={site.name} width={430} height={58} unoptimized priority className="hidden h-[1.15rem] w-auto min-[380px]:block md:h-5" />
    </Link>
  );
}
