import { isDev, isPlaceholder } from "@/lib/placeholder";

/** Dev-only badge flagging a value the clinic still has to supply. Renders nothing in production. */
export function TodoBadge({ label = "TODO" }: { label?: string }) {
  if (!isDev) return null;
  return (
    <span className="ml-1 inline-block rounded bg-amber-300 px-1.5 py-0.5 align-middle text-[0.65rem] font-bold uppercase tracking-wide text-amber-950">
      {label}
    </span>
  );
}

/** Shows `value` if real; in dev shows a TODO badge for placeholders; hides in production. */
export function Field({ value, label }: { value?: string | null; label?: string }) {
  if (!isPlaceholder(value)) return <>{value}</>;
  return <TodoBadge label={label ? `TODO: ${label}` : "TODO"} />;
}
