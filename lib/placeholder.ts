/** A value is a placeholder if it is empty or wrapped in [brackets], e.g. "[ ]" or "[paste share link]". */
export function isPlaceholder(value?: string | null): boolean {
  if (value == null) return true;
  const v = value.trim();
  return v === "" || (v.startsWith("[") && v.endsWith("]"));
}

export const isDev = process.env.NODE_ENV !== "production";
