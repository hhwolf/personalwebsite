import type { Metadata } from "next";
import Link from "next/link";
import { EssayCard } from "@/components/ui/EssayCard";
import { PublicationList } from "@/components/ui/PublicationList";
import { getAllEssays } from "@/lib/essays";

export const metadata: Metadata = {
  title: "Papers & essays",
  description: "Publications, presentations, and essays by Henry He.",
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
        Papers <em>&amp; essays</em>
      </h1>
      <p className="mt-6 max-w-xl text-ash-200">
        Research I have co-authored, and longer-form thinking about what I build and read.
      </p>
      <p className="label mt-16">Publications &amp; presentations</p>
      <div className="mt-4">
        <PublicationList />
      </div>
      <p className="label mt-20">
        {essays.length} {essays.length === 1 ? "essay" : "essays"}
      </p>
      {essays.length > 0 ? (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {essays.map((essay, i) => (
            <li key={essay.slug}>
              <EssayCard essay={essay} index={i} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 max-w-md text-ash-200">Longer-form writing is on its way.</p>
      )}
    </section>
  );
}
