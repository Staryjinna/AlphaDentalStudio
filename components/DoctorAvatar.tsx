import Image from "next/image";
import type { Doctor } from "@/content/doctors";
import { initials } from "@/lib/initials";

/** Real photo if the clinic supplied one, otherwise an initials avatar. Never a stock or AI face. */
export function DoctorAvatar({ doctor, sizes = "(min-width:1024px) 300px, 70vw", className = "", priority = false }: { doctor: Doctor; sizes?: string; className?: string; priority?: boolean }) {
  if (doctor.photo) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={doctor.photo} alt={`${doctor.name}, ${doctor.role}`} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    );
  }
  return (
    <div role="img" aria-label={`${doctor.name}, ${doctor.role} (photo coming soon)`} className={`flex items-center justify-center bg-gradient-to-br from-sand via-peach/40 to-sand ${className}`}>
      <span className="flex aspect-square w-1/2 max-w-40 items-center justify-center rounded-full bg-white/70 text-5xl font-semibold text-cocoa shadow-inner">{initials(doctor.name)}</span>
    </div>
  );
}
