const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** Formats an ISO date (YYYY-MM-DD) deterministically, independent of server locale. */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** Rough reading time in whole minutes at ~220 wpm. */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
