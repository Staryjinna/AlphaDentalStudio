import Image from "next/image";
import type { Doctor } from "@/content/doctors";
import { initials } from "@/lib/initials";

/** Real photo if the clinic supplied one, otherwise an initials avatar. Never a stock or AI face. */
export function DoctorAvatar({ doctor, sizes = "(min-width:1024px) 280px, 70vw", className = "", priority = false }: { doctor: Doctor; sizes?: string; className?: string; priority?: boolean }) {
  if (doctor.photo) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={doctor.photo} alt={`${doctor.name}, ${doctor.role}`} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${doctor.name}, ${doctor.role} (photo coming soon)`}
      className={`flex items-center justify-center bg-gradient-to-br from-brand-100 via-sand/60 to-brand-100 ${className}`}
    >
      <span className="flex aspect-square w-1/2 max-w-40 items-center justify-center rounded-full bg-white/70 font-heading text-5xl font-semibold text-brand-900 shadow-inner backdrop-blur">
        {initials(doctor.name)}
      </span>
    </div>
  );
}
