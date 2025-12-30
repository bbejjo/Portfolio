export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
};

export const team: TeamMember[] = [
  {
    name: "Avery Kim",
    role: "Frontend Architect",
    bio: "Designs expressive interfaces and builds resilient component systems with a focus on motion.",
    specialties: ["UI systems", "Animation", "Design ops"],
  },
  {
    name: "Noah Patel",
    role: "Full-Stack Engineer",
    bio: "Bridges product strategy and engineering, shipping secure and scalable web platforms.",
    specialties: ["Platform", "APIs", "Performance"],
  },
  {
    name: "Riley Chen",
    role: "Creative Technologist",
    bio: "Crafts interactive experiences that blend storytelling, 3D, and brand-led visuals.",
    specialties: ["Three.js", "Prototyping", "UX"],
  },
];
