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
    stack: ["React", "Tailwind", "Django", "Figma", "Spine"],
    focus: "Product launch",
    link: "https://memorify.ge/",
  },
  {
    title: "Maeli LLc",
    description:
      "Nationwide auto transport website enabling fast quotes, driver applications, and clear customer communication.",
    stack: ["React", "Tailwind", "Django", "Figma"],
    focus: "Customer inquiries",
    link: "https://maelillc.com/",
  },
  {
  title: "Guide in Kutaisi",
  description:
    "Local travel guide platform showcasing Kutaisi’s landmarks, culture, and attractions with clear navigation and visitor-focused content.",
  stack: ["Next.js", "Tailwind", "Vercel"],
  focus: "city exploration",
  link: "https://guide-in-kutaisi.netlify.app/",
}
,
  {
    title: "Steel Company",
    description:
      "Interactive corporate microsite highlighting advanced steel products, technology showcases, and immersive visual storytelling.",
    stack: ["Three.js", "Framer Motion", "Contentful", "Vercel"],
    focus: "Visual R&D showcase",
    link: "https://steelcompany.netlify.app/",
  },
];
