export type Publication = {
  title: string;
  /** Author list as it should appear. */
  authors: string;
  venue: string;
  year: number;
  /** "paper" | "poster" | "talk" | "preprint" | "pending" */
  kind: "paper" | "poster" | "talk" | "preprint" | "pending";
  href?: string;
};

/** Newest first. */
export const publications: Publication[] = [
  {
    title: "Pathways to Decarbonization of the United States Light-Duty Vehicle Fleet",
    authors: "Field, R., Mai, C.-L., Kuhlken, Z., & He, H.",
    venue: "MIT Energy Initiative",
    year: 2026,
    kind: "pending",
  },
  {
    title:
      "Participatory Modeling for Green Infrastructure Planning: Reconciling the Tradeoffs Between Flooding and Heat Mitigation",
    authors: "Zellner, M., Massey, D., Adderley, T., & He, H.",
    venue: "BARI Conference 2026, Boston, MA",
    year: 2026,
    kind: "talk",
  },
  {
    title: "An AI Monkey Gets Grapes for Sure: Sphere Neural Networks for Reliable Decision-Making",
    authors: "Dong, T., He, H., Liò, P., & Jamnik, M.",
    venue: "arXiv:2601.00142",
    year: 2026,
    kind: "preprint",
    href: "https://arxiv.org/abs/2601.00142",
  },
  {
    title:
      "The Tale of Two Sister Species: The Complexity of Intraspecific Variation and Hybridization of Asterias Species in New England",
    authors: "Jones, A.J., He, H., Weld, M., Bucking, H., Wagner, J., Maughan, W., Potter, M., Clark, A., & Malcolm, T.",
    venue: "New England Ocean Science Education Collaborative",
    year: 2025,
    kind: "poster",
  },
];
