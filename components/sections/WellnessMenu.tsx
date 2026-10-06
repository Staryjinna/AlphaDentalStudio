import { Clock, Headphones, ShieldPlus, Sparkles, Wallet, Gift } from "lucide-react";
import { Reveal } from "../Reveal";
import { TodoBadge } from "../Todo";
import { site } from "@/content/site";

// The "ADS Wellness Menu" as the clinic presents it on its current site.
const items = [
  { icon: Headphones, t: "TVs + headphones", d: "Watch a show or listen to music while you are treated." },
  { icon: Sparkles, t: "Curated experience", d: "A personal comfort menu: blankets, neck pillows, aromatherapy and refreshments." },
  { icon: Gift, t: "New patient specials", d: "Ask us about current offers for new patients.", todo: "TODO: confirm offers" },
  { icon: Wallet, t: "Flexible payment plans", d: "Ask us about ways to spread the cost of treatment.", todo: "TODO: confirm plans" },
  { icon: ShieldPlus, t: "Same-day emergencies", d: "Tooth pain or a broken tooth? Call us and we will do our best to see you the same day." },
  { icon: Clock, t: "Extended hours", d: `Open ${site.hoursLabel}, so care fits around work and school.` },
];

export function WellnessMenu() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((x, i) => (
        <li key={x.t}>
          <Reveal delay={(i % 3) * 0.08} className="h-full">
            <div className="card card-hover group h-full p-7 transition-colors duration-500 hover:bg-cocoa hover:text-white">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand text-cocoa transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-peach"><x.icon size={26} aria-hidden /></span>
              <h3 className="mt-5 transition-colors group-hover:!text-white">{x.t}</h3>
              <p className="mt-2 text-base text-muted transition-colors group-hover:text-white/80">{x.d} {x.todo && <TodoBadge label={x.todo} />}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
