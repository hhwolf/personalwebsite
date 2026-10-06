export type TimelineEntry = {
  type: "education" | "experience";
  org: string;
  role: string;
  /** Display strings, e.g. "2024" or "Jun 2025". */
  start: string;
  end: string;
  summary: string;
};

/** Newest first. */
export const journey: TimelineEntry[] = [
  {
    type: "education",
    org: "Brown University · Providence, RI",
    role: "B.A. Computer Science & Philosophy",
    start: "Sep 2026",
    end: "Present",
    summary:
      "Concentrating in Computer Science and Philosophy. Analyst on the Socially Responsible Investment Fund. Won Columbia's DivHacks 2026 hackathon.",
  },
  {
    type: "experience",
    org: "Asteria Labs · San Francisco, CA",
    role: "Founding Engineer",
    start: "Jul 2026",
    end: "Present",
    summary:
      "Built video avatars trained as AI staffers for the product site, led go-to-market and direct customer outreach, and shaped the roadmap with cartoon avatars, cross-site product comparison, and computer use for agents.",
  },
  {
    type: "experience",
    org: "Northeastern University · Helmuth & Zellner Lab",
    role: "Research Assistant",
    start: "May 2025",
    end: "Jul 2026",
    summary:
      "Designed a participatory heat model to track how green infrastructure performs for communities and city planners; led literature synthesis and calibration. Separately studied sea star anatomy and resilience, presented at NEOSEC 2025.",
  },
  {
    type: "experience",
    org: "MIT Energy Initiative · Cambridge, MA",
    role: "Research Assistant",
    start: "Jul 2025",
    end: "May 2026",
    summary:
      "Modeled US light-duty vehicle market and emissions pathways to net zero under Director Randall Field. Ran a scientometric analysis of AHA medical papers with Professor Leo Celi.",
  },
  {
    type: "experience",
    org: "University of Cambridge · Cambridge, UK",
    role: "Research Assistant",
    start: "Aug 2025",
    end: "Jan 2026",
    summary:
      "Developed Sphere Neural Networks for interpretable syllogistic reasoning with Dr. Tiansi Dong; built the evaluation datasets, led training and testing, and co-authored the paper now on arXiv.",
  },
  {
    type: "experience",
    org: "Tencent Spark Camp · Shenzhen, China",
    role: "Cybersecurity Student",
    start: "Jul 2024",
    end: "Jul 2024",
    summary:
      "Selected for an intensive program with under 5% acceptance. Coordinated the student red team identifying CVEs in simulated sites, then ran blue-team defense analyzing logs with Elastic and Katana.",
  },
  {
    type: "experience",
    org: "Canadian Solar · Suzhou, China",
    role: "Marketing Intern",
    start: "Jun 2023",
    end: "Jul 2023",
    summary:
      "Benchmarked peers' ESG reports and recommended governance and social-impact improvements that made it into the 2023 Annual Report. Produced product and factory marketing videos.",
  },
  {
    type: "education",
    org: "Phillips Academy Andover · Andover, MA",
    role: "High School Diploma",
    start: "Sep 2022",
    end: "May 2026",
    summary:
      "Caroline D. Bradley Scholar (full merit scholarship). Co-head of Andover Climate Lobby and EcoAction, lead peer tutor for AP Math and Physics, head tour guide. Varsity sprints and long jump.",
  },
  {
    type: "experience",
    org: "OpenAir · Andover, MA",
    role: "Youth Lobbyist",
    start: "Jun 2022",
    end: "Present",
    summary:
      "Coordinated a dozen meetings with officials and carbon-removal organizations, recruited 50+ youth activists, and helped launch monthly climate education for 1,200 students.",
  },
];
