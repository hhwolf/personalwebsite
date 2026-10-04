export type SkillCategory = "Languages" | "Frontend" | "Backend" | "Tools";

export type Skill = {
  name: string;
  category: SkillCategory;
};

export const skillCategories: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Tools",
];

export const skills: Skill[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "Go", category: "Languages" },
  { name: "Swift", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "Rust", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind", category: "Frontend" },
  { name: "GSAP", category: "Frontend" },
  { name: "SwiftUI", category: "Frontend" },
  { name: "D3", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Postgres", category: "Backend" },
  { name: "Redis", category: "Backend" },
  { name: "gRPC", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Prisma", category: "Backend" },
  { name: "Git", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "AWS", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "Linux", category: "Tools" },
];
