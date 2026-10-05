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
    title: "FitCheck",
    slug: "fitcheck",
    category: "Hackathon winner · Full-stack",
    description:
      "Winner of Columbia DivHacks 2026 (Live Better track). Scan a small NYC room once, text furniture ideas over iMessage, and rearrange your real room like a top-down game before you buy or haul anything up three flights of stairs.",
    challenge:
      "Making the whole stack demoable offline: the FastAPI backend and Vite editor run in a mock mode with zero env vars, then switch to Supabase and the iMessage relay when real keys are present.",
    tags: ["Python", "FastAPI", "TypeScript", "Vite", "Supabase", "Swift"],
    year: 2026,
    githubUrl: "https://github.com/hhwolf/divhacks",
    liveUrl: "https://adaptive-room-planner.vercel.app",
    featured: true,
  },
  {
    title: "Threadline",
    slug: "threadline",
    category: "Developer tools · AI agents",
    description:
      "A chat-first workspace for building software with coding agents. An orchestrator model deploys isolated agent runs, verifies their output, and integrates accepted code, while the conversation itself is a tree: open decisions fork into labeled directions you can revisit.",
    challenge:
      "Two compatible runtimes from one codebase: hosted on Vercel with Postgres and persistent sandboxes, or fully local with SQLite and detached Git worktrees.",
    tags: ["JavaScript", "Postgres", "SQLite", "Vercel Sandbox", "GitHub API"],
    year: 2026,
    githubUrl: "https://github.com/hhwolf/treenodechat",
    liveUrl: "https://treenodechat.vercel.app",
    featured: true,
  },
  {
    title: "Mini Desktop",
    slug: "mini-desktop",
    category: "Systems in the browser",
    description:
      "A local-first desktop that lives entirely in your browser: draggable windows, a virtual filesystem, and eleven working apps that share live file state, with no backend or accounts. Reload or open a second tab and everything is still there.",
    challenge:
      "Durability without a server: files, notes, and events live in IndexedDB behind a serialized write queue, with a pagehide journal so writes survive instant navigation.",
    tags: ["TypeScript", "IndexedDB", "Vite", "Window manager"],
    year: 2026,
    githubUrl: "https://github.com/hhwolf/macosdesktop",
    liveUrl: "https://macosdesktop-delta.vercel.app",
    featured: true,
  },
  {
    title: "FF Dash",
    slug: "ff-dash",
    category: "Data product · Sports",
    description:
      "A personal ESPN fantasy football dashboard and predictor. Blends projections from ESPN, Sleeper, and a rules-based model into a consensus that powers a lineup optimizer, matchup preview, waiver finder, and trade analyzer.",
    challenge:
      "A season-long accuracy tracker re-tunes the consensus weights from what actually happened each week, driven by a daily Vercel cron.",
    tags: ["TypeScript", "Postgres", "Vercel Cron", "ESPN API"],
    year: 2026,
    githubUrl: "https://github.com/hhwolf/fantasyfootball",
    featured: true,
  },
  {
    title: "fpl-predict",
    slug: "fpl-predict",
    category: "Machine learning · Python",
    description:
      "Predicts a Fantasy Premier League player's points for the next gameweek. Live scrape of the FPL API, Understat, and historical archives, joined into leak-safe features for a gradient-boosted model with time-based validation against baselines.",
    challenge:
      "Honest evaluation: expanding-origin folds that hold out the final stretch of each of the past three seasons, reported as WAPE accuracy over single and three-gameweek windows.",
    tags: ["Python", "LightGBM", "pandas", "scikit-learn"],
    year: 2026,
    githubUrl: "https://github.com/hhwolf/eplananalysis",
    featured: false,
  },
  {
    title: "The Snap League",
    slug: "snap-league",
    category: "Game · Three.js",
    description:
      "A compact browser arena shooter with articulated toy-like rivals, six multi-floor campaign arenas, generated audio, radar, and a complete three-minute match loop, ending in a multi-phase boss fight.",
    challenge:
      "A per-arena adaptive director that targets a 20% win rate by tuning bot reaction, movement, and accuracy from recent local results.",
    tags: ["Three.js", "JavaScript", "Web Audio"],
    year: 2026,
    githubUrl: "https://github.com/hhwolf/webshotgame",
    liveUrl: "https://webshotgame.vercel.app",
    featured: false,
  },
  {
    title: "Kindred",
    slug: "kindred",
    category: "Social · Recommendation",
    description:
      "A swipe app for genuine platonic connection: one deck of people worth saying hi to, one deck of activities worth inviting them to. Every match ships with an icebreaker built from real shared ground and a 'plan something' button.",
    challenge:
      "One profile, two decks: people and activities share a single vocabulary of interests, connection factors, and vibe axes, so swiping on either sharpens the other.",
    tags: ["JavaScript", "Vite", "Taste engine"],
    year: 2026,
    githubUrl: "https://github.com/hhwolf/connection-swipe",
    liveUrl: "https://connection-swipe.vercel.app",
    featured: false,
  },
  {
    title: "Decluttered",
    slug: "decluttered",
    category: "Recommendation engine",
    description:
      "One taste engine, five cravings: books, movies, TV, music, and restaurants. Swipe a ranked deck, rate what you consume down to individual craft elements, and browse a For You page built by seven labeled suggestion mechanisms.",
    tags: ["JavaScript", "Vite", "Cross-domain taste graph"],
    year: 2026,
    githubUrl: "https://github.com/hhwolf/decluttered",
    featured: false,
  },
  {
    title: "GreenSite",
    slug: "greensite",
    category: "Climate · PWA",
    description:
      "A sustainability hub for real-estate developers: a portfolio dashboard, a US requirements tracker that matches federal, state, and local rules to each project's location, a LEED v4 scorecard, and an interactive embodied-carbon visualizer.",
    tags: ["TypeScript", "PWA", "LEED v4"],
    year: 2026,
    githubUrl: "https://github.com/hhwolf/constructioncarbontracker",
    featured: false,
  },
  {
    title: "Kalshi vs. Sportsbook NBA Pricing",
    slug: "kalshi-nba-pricing",
    category: "Research · Statistics",
    description:
      "A Python data pipeline and statistical analysis comparing NBA game pricing on Kalshi, a regulated prediction market, with aggregated sportsbook odds. Final artifact for CSC600 at Phillips Academy Andover, with Justin Puno.",
    challenge:
      "Working around a data gap honestly: Kalshi's API does not expose pre-game closing prices, which shaped both the method and the paper's stated limitations.",
    tags: ["Python", "Jupyter", "Statistics"],
    year: 2026,
    githubUrl: "https://github.com/hhwolf/CSC600-KalshiOdds",
    featured: false,
  },
];
