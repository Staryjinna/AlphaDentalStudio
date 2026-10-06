import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

// Placeholder wordmark until the clinic's real logo replaces /public/brand/logo.svg.
export function Logo({ white = false }: { white?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name}, home`} className="inline-flex items-center">
      <Image
        src={white ? "/brand/logo-white.svg" : "/brand/logo.svg"}
        alt={site.name}
        width={216}
        height={38}
        unoptimized
        priority
        className="h-9 w-auto md:h-10"
      />
    </Link>
  );
}
