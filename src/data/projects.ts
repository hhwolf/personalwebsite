import type { StaticImageData } from "next/image";

export type Project = {
  title: string;
  slug: string;
  /** Short category shown in the pill above the title, e.g. "Web app · Rust". */
  category: string;
  description: string;
  /** Optional one-line "the hard part" callout. */
  challenge?: string;
  tags: string[];
  year: number;
  githubUrl?: string;
  liveUrl?: string;
  /** Static import from src/assets/projects/... for blur placeholder + sizing. */
  image?: StaticImageData;
  featured: boolean;
};

/**
 * Add a project by appending an object. Order here is display order.
 * Drop screenshots in src/assets/projects/ and `import shot from "@/assets/projects/foo.png"`.
 */
export const projects: Project[] = [
  {
    title: "Ledger",
    slug: "ledger",
    category: "Web app · TypeScript",
    description:
      "A personal finance tracker that imports bank exports, categorizes transactions with a small rules engine, and renders monthly trends.",
    challenge:
      "Making categorization explainable: every auto-assigned category shows the rule that fired and lets you override it in one click.",
    tags: ["Next.js", "Postgres", "Drizzle", "Recharts"],
    year: 2026,
    githubUrl: "https://github.com/hhwolf",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    title: "Fieldnotes",
    slug: "fieldnotes",
    category: "iOS · Swift",
    description:
      "An offline-first notes app for hiking trips. Captures GPS, photos, and voice memos, then syncs when back in range.",
    challenge:
      "Conflict-free sync across devices without a backend engineer: CRDTs over CloudKit with a tiny merge layer.",
    tags: ["SwiftUI", "CloudKit", "CRDT", "MapKit"],
    year: 2025,
    githubUrl: "https://github.com/hhwolf",
    featured: true,
  },
  {
    title: "Pulse",
    slug: "pulse",
    category: "CLI · Go",
    description:
      "A terminal dashboard that tails logs from several services and highlights anomalies using a rolling z-score.",
    challenge:
      "Keeping a 60 fps TUI responsive while ingesting 50k lines per second from multiple sources.",
    tags: ["Go", "Bubble Tea", "gRPC"],
    year: 2025,
    githubUrl: "https://github.com/hhwolf",
    featured: true,
  },
  {
    title: "Course Atlas",
    slug: "course-atlas",
    category: "Data viz · Python",
    description:
      "Maps every course at my university as a prerequisite graph so you can plan a degree path visually.",
    challenge:
      "Scraping a decade of catalog PDFs into a clean graph, then laying it out so 1,200 nodes stay readable.",
    tags: ["Python", "NetworkX", "D3", "Playwright"],
    year: 2024,
    githubUrl: "https://github.com/hhwolf",
    liveUrl: "https://example.com",
    featured: false,
  },
];
