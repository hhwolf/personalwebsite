import type { TimelineEntry } from "@/data/journey";

export function TimelineItem({ entry, side }: { entry: TimelineEntry; side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <li
      className="relative grid items-start gap-4 pl-10 md:grid-cols-2 md:gap-16 md:pl-0"
      data-reveal
    >
      <span
        aria-hidden
        className="absolute top-2 left-[11px] size-2.5 rounded-full border border-ember bg-ink md:left-1/2 md:-translate-x-1/2"
      />
      <div className={isLeft ? "md:text-right" : "md:col-start-2"}>
        <p className="label flex items-center gap-3 text-ash-400 md:inline-flex">
          <span className="text-ember">{entry.type === "education" ? "EDU" : "WORK"}</span>
          <span aria-hidden>{"//"}</span>
          <span>
            {entry.start} — {entry.end}
          </span>
        </p>
        <h3 className="display text-display-md mt-3">{entry.role}</h3>
        <p className="mt-1 font-mono text-sm text-ash-200">{entry.org}</p>
        <p className={`mt-4 max-w-md text-ash-200 ${isLeft ? "md:ml-auto" : ""}`}>{entry.summary}</p>
      </div>
    </li>
  );
}
