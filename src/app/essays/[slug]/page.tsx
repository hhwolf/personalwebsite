import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui/Tag";
import { site } from "@/data/site";
import { getAllEssays, getEssay } from "@/lib/essays";
import { formatDate } from "@/lib/format";

type Params = { slug: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const essays = await getAllEssays();
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) return {};
  return {
    title: essay.title,
    description: essay.summary,
    alternates: { canonical: `/essays/${slug}` },
    openGraph: {
      type: "article",
      title: essay.title,
      description: essay.summary,
      publishedTime: essay.date,
      authors: [site.name],
      url: `/essays/${slug}`,
    },
  };
}

export default async function EssayPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay || essay.draft) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.summary,
    datePublished: essay.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/essays/${slug}`,
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-28 pb-24 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/essays"
        className="label inline-flex items-center gap-2 transition-colors hover:text-ember"
      >
        <span aria-hidden>←</span> All essays
      </Link>
      <header className="mt-8">
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-ash-400">
          <time dateTime={essay.date}>{formatDate(essay.date)}</time>
          <span aria-hidden>·</span>
          <span>{essay.readingMinutes} min read</span>
        </p>
        <h1 className="display text-display-lg mt-5">{essay.title}</h1>
        <p className="mt-6 text-lg text-ash-200">{essay.summary}</p>
        {essay.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
            {essay.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        )}
      </header>
      <hr className="my-12 border-line" />
      <div className="prose prose-invert prose-lg max-w-none">{essay.content}</div>
    </article>
  );
}
