import { PageHeader } from "@/components/PageHeader";
import { TodoBadge } from "@/components/Todo";
import { site } from "@/content/site";
import { seo } from "@/lib/seo";

export const metadata = seo({ title: "Privacy notice | Alpha Dental Studio", description: "Privacy notice for Alpha Dental Studio, Chennai.", path: "/privacy", noindex: true });

export default function Privacy() {
  return (
    <>
      <PageHeader trail={[{ name: "Privacy notice", href: "/privacy" }]} title="Privacy notice" lead="Draft pending legal review." />
      <section className="container-page max-w-3xl py-16 text-base">
        <p className="rounded-2xl border-2 border-dashed border-amber-400 p-4">
          Placeholder text <TodoBadge label="TODO: legal text" /> Replace with text reviewed by a lawyer and written to meet India&apos;s Digital Personal Data Protection Act, 2023.
        </p>
        <h2 className="mt-10">What we collect</h2>
        <p className="mt-3">When you request an appointment we collect your name, phone number, preferred branch, treatment, doctor, date and time, and any note you add.</p>
        <h2 className="mt-8">Why we collect it</h2>
        <p className="mt-3">To contact you about your booking. We ask for your consent before collecting these details.</p>
        <h2 className="mt-8">Analytics</h2>
        <p className="mt-3">Analytics scripts load only after you accept cookies.</p>
        <h2 className="mt-8">Contact</h2>
        <p className="mt-3">Questions about your data: <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </section>
    </>
  );
}
