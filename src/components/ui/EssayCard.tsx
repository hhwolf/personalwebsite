import Link from "next/link";
import type { EssayMeta } from "@/lib/essays";
import { formatDate, pad2 } from "@/lib/format";

export function EssayCard({ essay, index }: { essay: EssayMeta; index: number }) {
  return (
    <Link
      href={`/essays/${essay.slug}`}
      className="group grid gap-4 py-8 transition-colors md:grid-cols-[4rem_1fr_auto] md:items-baseline md:gap-8"
      data-reveal
    >
      <span className="font-mono text-xs text-ash-400 tabular-nums">{pad2(index + 1)}</span>
      <span className="block">
        <span className="display block text-display-md text-bone transition-colors group-hover:text-ember">
          {essay.title}
        </span>
        <span className="mt-3 block max-w-2xl text-ash-200">{essay.summary}</span>
      </span>
      <span className="label flex items-center gap-3 md:flex-col md:items-end md:gap-1">
        <time dateTime={essay.date}>{formatDate(essay.date)}</time>
        <span className="text-ash-400">{essay.readingMinutes} min</span>
      </span>
    </Link>
  );
}
