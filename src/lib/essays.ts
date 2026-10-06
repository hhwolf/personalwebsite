import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import { readingTime } from "@/lib/format";

export type EssayFrontmatter = {
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  summary: string;
  tags: string[];
  /** Hide from index and sitemap while drafting. */
  draft?: boolean;
};

export type EssayMeta = EssayFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export type Essay = EssayMeta & {
  content: ReactElement;
};

const ESSAYS_DIR = path.join(process.cwd(), "content", "essays");

function assertFrontmatter(
  slug: string,
  fm: Record<string, unknown>,
): asserts fm is EssayFrontmatter {
  const problems: string[] = [];
  if (typeof fm.title !== "string" || !fm.title) problems.push("title (string)");
  if (typeof fm.date !== "string" || Number.isNaN(Date.parse(fm.date))) {
    problems.push("date (YYYY-MM-DD)");
  }
  if (typeof fm.summary !== "string" || !fm.summary) problems.push("summary (string)");
  if (!Array.isArray(fm.tags) || fm.tags.some((t) => typeof t !== "string")) {
    problems.push("tags (string[])");
  }
  if (problems.length) {
    throw new Error(
      `content/essays/${slug}.mdx has invalid frontmatter. Missing or wrong: ${problems.join(", ")}`,
    );
  }
}

async function compile(slug: string, source: string) {
  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, { theme: "vesper", keepBackground: false }],
        ],
      },
    },
  });
  assertFrontmatter(slug, frontmatter);
  // Strip frontmatter before counting words.
  const body = source.replace(/^---[\s\S]*?---/, "");
  return { content, frontmatter, readingMinutes: readingTime(body) };
}

export async function getEssaySlugs(): Promise<string[]> {
  const entries = await readdir(ESSAYS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name.replace(/\.mdx$/, ""))
    .sort();
}

export async function getEssay(slug: string): Promise<Essay | null> {
  const file = path.join(ESSAYS_DIR, `${slug}.mdx`);
  let source: string;
  try {
    source = await readFile(file, "utf8");
  } catch {
    return null;
  }
  const { content, frontmatter, readingMinutes } = await compile(slug, source);
  return { slug, ...frontmatter, readingMinutes, content };
}

/** All published essays, newest first. Frontmatter only. */
export async function getAllEssays(): Promise<EssayMeta[]> {
  const slugs = await getEssaySlugs();
  const essays = await Promise.all(
    slugs.map(async (slug) => {
      const essay = await getEssay(slug);
      if (!essay) return null;
      // Drop the compiled React tree so callers get plain serializable metadata.
      const { content: _content, ...meta } = essay;
      void _content;
      return meta;
    }),
  );
  return essays
    .filter((e): e is EssayMeta => e !== null && !e.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}
