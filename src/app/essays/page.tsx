import type { Metadata } from "next";
import Link from "next/link";
import { EssayCard } from "@/components/ui/EssayCard";
import { getAllEssays } from "@/lib/essays";

export const metadata: Metadata = {
  title: "Essays",
  description: "Essays and written work.",
  alternates: { canonical: "/essays" },
};

export default async function EssaysPage() {
  const essays = await getAllEssays();
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-28 pb-24 md:pt-40">
      <Link href="/" className="label inline-flex items-center gap-2 transition-colors hover:text-ember">
        <span aria-hidden>←</span> Home
      </Link>
      <h1 className="display text-display-lg mt-8">
        Essays <em>&amp; notes</em>
      </h1>
      <p className="mt-6 max-w-xl text-ash-200">
        Longer-form thinking: things I built, things I read, and what I changed my mind about.
      </p>
      <p className="label mt-16">
        {essays.length} {essays.length === 1 ? "essay" : "essays"}
      </p>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {essays.map((essay, i) => (
          <li key={essay.slug}>
            <EssayCard essay={essay} index={i} />
          </li>
        ))}
      </ul>
    </section>
  );
}
