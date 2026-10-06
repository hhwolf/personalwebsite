export type SkillCategory = "Languages" | "Web" | "Data & ML" | "Tools";

export type Skill = {
  name: string;
  category: SkillCategory;
};

export const skillCategories: SkillCategory[] = ["Languages", "Web", "Data & ML", "Tools"];

export const skills: Skill[] = [
  { name: "Python", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "Swift", category: "Languages" },
  { name: "HTML & CSS", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "React", category: "Web" },
  { name: "Next.js", category: "Web" },
  { name: "Vite", category: "Web" },
  { name: "Three.js", category: "Web" },
  { name: "FastAPI", category: "Web" },
  { name: "Postgres", category: "Web" },
  { name: "Supabase", category: "Web" },
  { name: "pandas", category: "Data & ML" },
  { name: "LightGBM", category: "Data & ML" },
  { name: "scikit-learn", category: "Data & ML" },
  { name: "Jupyter", category: "Data & ML" },
  { name: "Neural networks", category: "Data & ML" },
  { name: "LLM agents", category: "Data & ML" },
  { name: "Git", category: "Tools" },
  { name: "Linux", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "Elastic", category: "Tools" },
  { name: "Excel", category: "Tools" },
];
