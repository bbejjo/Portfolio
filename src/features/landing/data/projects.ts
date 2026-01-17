import { type Locale } from "@/i18n/translations";

export type ProjectId = "memorify" | "maeli" | "kutaisi" | "steel";

export type Project = {
  id: ProjectId;
  title: string;
  description: string;
  stack: ReadonlyArray<string>;
  focus: string;
  link?: string;
};

const projectBase = {
  memorify: {
    stack: ["React", "Tailwind", "Django", "Figma", "Spine"],
    link: "https://memorify.ge/",
  },
  maeli: {
    stack: ["React", "Tailwind", "Django", "Figma"],
    link: "https://maelillc.com/",
  },
  kutaisi: {
    stack: ["Next.js", "Tailwind", "Vercel"],
    link: "https://guide-in-kutaisi.netlify.app/",
  },
  steel: {
    stack: ["Three.js", "Framer Motion", "Contentful", "Vercel"],
    link: "https://steelcompany.netlify.app/",
  },
} as const;

const projectsByLocale: Record<Locale, Project[]> = {
  en: [
    {
      id: "memorify",
      title: "Memorify",
      description:
        "Event-based photo platform enabling seamless uploads, AI filtering, and shared digital galleries.",
      focus: "Product launch",
      ...projectBase.memorify,
    },
    {
      id: "maeli",
      title: "Maeli LLc",
      description:
        "Nationwide auto transport website enabling fast quotes, driver applications, and clear customer communication.",
      focus: "Customer inquiries",
      ...projectBase.maeli,
    },
    {
      id: "kutaisi",
      title: "Guide in Kutaisi",
      description:
        "Local travel guide platform showcasing Kutaisi's landmarks, culture, and attractions with clear navigation and visitor-focused content.",
      focus: "city exploration",
      ...projectBase.kutaisi,
    },
    {
      id: "steel",
      title: "Steel Company",
      description:
        "Interactive corporate microsite highlighting advanced steel products, technology showcases, and immersive visual storytelling.",
      focus: "Visual R&D showcase",
      ...projectBase.steel,
    },
  ],
  ka: [
    {
      id: "memorify",
      title: "Memorify",
      description:
        "ღონისძიებაზე დაფუძნებული ფოტო პლატფორმა, რომელიც უზრუნველყოფს მარტივ ატვირთვას, AI ფილტრაციას და გაზიარებულ ციფრულ გალერეებს.",
      focus: "პროდუქტის გაშვება",
      ...projectBase.memorify,
    },
    {
      id: "maeli",
      title: "Maeli LLc",
      description:
        "ქვეყნის მასშტაბით ავტოტრანსპორტირების ვებგვერდი, რომელიც უზრუნველყოფს სწრაფ შეთავაზებებს, მძღოლების განაცხადებს და გამჭვირვალე კომუნიკაციას.",
      focus: "კლიენტების მოთხოვნები",
      ...projectBase.maeli,
    },
    {
      id: "kutaisi",
      title: "Guide in Kutaisi",
      description:
        "ადგილობრივი სამოგზაურო გიდის პლატფორმა, რომელიც აჩვენებს ქუთაისის ღირსშესანიშნაობებს, კულტურასა და ატრაქციონებს მკაფიო ნავიგაციითა და ვიზიტორზე ორიენტირებული კონტენტით.",
      focus: "ქალაქის აღმოჩენა",
      ...projectBase.kutaisi,
    },
    {
      id: "steel",
      title: "Steel Company",
      description:
        "ინტერაქტიული კორპორატიული მიკროსაიტი, რომელიც უსვამს ხაზს მოწინავე ფოლადის პროდუქტებს, ტექნოლოგიურ შოუებს და იმერსიულ ვიზუალურ თხრობას.",
      focus: "ვიზუალური R&D შოუ",
      ...projectBase.steel,
    },
  ],
};

export const getProjects = (locale: Locale) =>
  projectsByLocale[locale] ?? projectsByLocale.en;



