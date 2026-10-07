import { Clock, Headphones, ShieldPlus, Sparkles, Wallet, Gift } from "lucide-react";
import { Reveal } from "../Reveal";
import { TodoBadge } from "../Todo";
import { site } from "@/content/site";

// The "ADS Wellness Menu" as the clinic presents it on its current site.
const items = [
  { icon: Headphones, t: "TVs + headphones", d: "Watch a show or listen to music while you are treated." },
  { icon: Sparkles, t: "Curated experience", d: "Blankets, neck pillows, aromatherapy and refreshments." },
  { icon: Gift, t: "New patient specials", d: "Ask us about current offers for new patients.", todo: "TODO: confirm offers" },
  { icon: Wallet, t: "Flexible payment plans", d: "Ask us about ways to spread the cost.", todo: "TODO: confirm plans" },
  { icon: ShieldPlus, t: "Same-day emergencies", d: "Tooth pain? Call us and we will do our best to see you the same day." },
  { icon: Clock, t: "Extended hours", d: `Open ${site.hoursLabel}.` },
];

export function WellnessMenu() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((x, i) => (
        <li key={x.t}>
          <Reveal delay={(i % 3) * 0.06} className="h-full">
            <div className="card group flex h-full items-start gap-4 p-4 transition-colors duration-300 hover:bg-cocoa hover:text-white md:p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand text-cocoa transition-colors duration-300 group-hover:bg-peach"><x.icon size={22} aria-hidden /></span>
              <div>
                <h3 className="!text-base transition-colors group-hover:!text-white">{x.t}</h3>
                <p className="mt-0.5 text-[0.92rem] leading-snug text-muted transition-colors group-hover:text-white/80">{x.d} {x.todo && <TodoBadge label={x.todo} />}</p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
