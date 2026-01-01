export type Project = {
  title: string;
  description: string;
  stack: string[];
  focus: string;
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Atlas Commerce",
    description:
      "Global storefront redesign with cinematic product storytelling and realtime inventory visibility.",
    stack: ["Next.js", "TypeScript", "Stripe", "GraphQL"],
    focus: "Conversion +38%",
    link: "",
  },
  {
    title: "SignalOS",
    description:
      "Operational intelligence dashboard that unifies alerts, incidents, and analytics in one timeline.",
    stack: ["React", "Framer Motion", "Node.js", "PostgreSQL"],
    focus: "Response time -42%",
    link: "",
  },
  {
    title: "Aurora Health",
    description:
      "Care coordination platform with accessibility-first UX and personalized patient journeys.",
    stack: ["Next.js", "Tailwind", "FHIR", "Vercel"],
    focus: "NPS +18",
    link: "",
  },
  {
    title: "Northwind Labs",
    description:
      "R&D microsite showcasing product pipelines with immersive visuals and crisp storytelling.",
    stack: ["Three.js", "Framer Motion", "Contentful", "Vercel"],
    focus: "Award finalist",
    link: "",
  },
];
