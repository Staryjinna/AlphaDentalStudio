import { PageHeader } from "@/components/PageHeader";
import { TodoBadge } from "@/components/Todo";
import { site } from "@/content/site";
import { seo } from "@/lib/seo";

export const metadata = seo({ title: "Terms of use | Alpha Dental Studio", description: "Terms of use for Alpha Dental Studio, Chennai.", path: "/terms", noindex: true });

export default function Terms() {
  return (
    <>
      <PageHeader trail={[{ name: "Terms of use", href: "/terms" }]} title="Terms of use" lead="Draft pending legal review." />
      <section className="container-page max-w-3xl py-16 text-base">
        <p className="rounded-2xl border-2 border-dashed border-amber-400 p-4">Placeholder text <TodoBadge label="TODO: legal text" /> Replace with text reviewed by a lawyer.</p>
        <h2 className="mt-10">General information</h2>
        <p className="mt-3">Information on this website is general and is not a substitute for an in-person examination. Contact <a href={`mailto:${site.email}`}>{site.email}</a> with questions.</p>
      </section>
    </>
  );
}
