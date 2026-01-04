export type Project = {
  title: string;
  description: string;
  stack: string[];
  focus: string;
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Memorify",
    description:
      "Event-based photo platform enabling seamless uploads, AI filtering, and shared digital galleries.",
    stack: ["React", "Tailwind", "Django"],
    focus: "Product launch",
    link: "https://memorify.ge/",
  },
  {
    title: "Maeli LLc",
    description:
      "Nationwide auto transport website enabling fast quotes, driver applications, and clear customer communication.",
    stack: ["React", "Tailwind", "Django"],
    focus: "Customer inquiries",
    link: "https://maelillc.com/",
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
