export type Social = {
  label: string;
  href: string;
};

export type NavSection = {
  id: string;
  number: string;
  label: string;
};

/**
 * Single source of truth for identity and site-wide copy.
 * Edit this file and everything (hero, footer, metadata, OG images) updates.
 */
export const site = {
  name: "Henry He",
  firstName: "Henry",
  /** Short line under the name in the hero. */
  tagline: "CS & Philosophy at Brown. Founding engineer, climate researcher, chess master.",
  /** One-paragraph summary used in metadata and social previews. */
  description:
    "Henry He studies Computer Science and Philosophy at Brown University. Founding engineer at Asteria Labs, research assistant across MIT, Cambridge, and Northeastern, and a USCF National Master. Projects, papers, and essays in one place.",
  location: "Providence, RI",
  email: "henry_he@brown.edu",
  /** Production URL. Update when the custom domain is live. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://henryrhe.com",
  resumePath: "/resume.pdf",
  availability: "Open to opportunities",
  socials: [
    { label: "GitHub", href: "https://github.com/hhwolf" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/henry-he-320738241/" },
  ] satisfies Social[],
  nav: [
    { id: "about", number: "01", label: "About" },
    { id: "journey", number: "02", label: "Journey" },
    { id: "projects", number: "03", label: "Projects" },
    { id: "essays", number: "04", label: "Writing" },
    { id: "skills", number: "05", label: "Skills" },
    { id: "contact", number: "06", label: "Contact" },
  ] satisfies NavSection[],
} as const;
