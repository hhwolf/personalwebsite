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
  tagline: "Builder, writer, and student of systems.",
  /** One-paragraph summary used in metadata and the About section lead. */
  description:
    "Personal site of Henry He: a living archive of projects, essays, and work, built to keep track of everything in one place.",
  location: "Louisville, KY",
  email: "hello@example.com",
  /** Production URL. Update when the custom domain is live. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://personalwebsite.vercel.app",
  resumePath: "/resume.pdf",
  availability: "Open to opportunities",
  socials: [
    { label: "GitHub", href: "https://github.com/hhwolf" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
  ] satisfies Social[],
  nav: [
    { id: "about", number: "01", label: "About" },
    { id: "journey", number: "02", label: "Journey" },
    { id: "projects", number: "03", label: "Projects" },
    { id: "essays", number: "04", label: "Essays" },
    { id: "skills", number: "05", label: "Skills" },
    { id: "contact", number: "06", label: "Contact" },
  ] satisfies NavSection[],
} as const;
