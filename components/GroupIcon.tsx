import { Anchor, Crown, Droplets, ScanFace, Smile, Sparkles, Stethoscope, type LucideIcon } from "lucide-react";
import { ToothIcon } from "./ToothIcon";

const map: Record<string, LucideIcon | typeof ToothIcon> = {
  general: ToothIcon,
  restorative: Crown,
  "implants-surgery": Anchor,
  orthodontics: Smile,
  gums: Droplets,
  cosmetic: Sparkles,
  specialist: Stethoscope,
};

export function GroupIcon({ id, size = 22, className }: { id: string; size?: number; className?: string }) {
  const Icon = (map[id] ?? ScanFace) as LucideIcon;
  return <Icon size={size} className={className} aria-hidden />;
}
