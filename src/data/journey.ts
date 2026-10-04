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
    type: "experience",
    org: "Acme Labs",
    role: "Software Engineering Intern",
    start: "May 2026",
    end: "Aug 2026",
    summary:
      "Built internal tooling for the data platform team. Shipped a migration dashboard used by 40 engineers.",
  },
  {
    type: "education",
    org: "University of Somewhere",
    role: "B.S. Computer Science",
    start: "2023",
    end: "2027",
    summary:
      "Coursework in systems, distributed computing, and HCI. Teaching assistant for intro programming.",
  },
  {
    type: "experience",
    org: "Campus Maker Space",
    role: "Lead, Software Track",
    start: "2024",
    end: "Present",
    summary:
      "Run weekly build nights and mentor first-year students through their first deployed project.",
  },
  {
    type: "education",
    org: "Louisville High School",
    role: "Diploma",
    start: "2019",
    end: "2023",
    summary: "Robotics team captain. First exposure to programming through FRC.",
  },
];
