import { notFound } from "next/navigation";
import { ContactSection } from "@/features/landing/components/ContactSection";
import { HeroAboutStack } from "@/features/landing/components/HeroAboutStack";
import { MotionSection } from "@/features/landing/components/MotionSection";
import { ProjectsSection } from "@/features/landing/components/ProjectsSection";
import { getProjects } from "@/features/landing/data/projects";
import {
  getTranslations,
  isLocale,
  type Locale,
} from "@/i18n/translations";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ka" }];
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const copy = getTranslations(typedLocale);
  const projects = getProjects(typedLocale);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      lang={typedLocale}
    >
      <main className="relative">
        <HeroAboutStack copy={copy} />
        <ProjectsSection copy={copy.projects} projects={projects} />
        <MotionSection copy={copy.motion} />
        <ContactSection copy={copy.contact} />
      </main>
      <footer className="border-t border-white/10 bg-background py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Lumen Trio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="text-muted transition hover:text-foreground"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.6 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM6.75 20.452H3.923V9H6.75v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="text-muted transition hover:text-foreground"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M23.954 12.273c0-6.627-5.373-12-12-12S-.046 5.646-.046 12.273c0 5.99 4.388 10.95 10.125 11.854v-8.385H7.078v-3.47h3.001V9.43c0-2.964 1.767-4.6 4.466-4.6 1.293 0 2.644.232 2.644.232v2.91h-1.49c-1.469 0-1.928.914-1.928 1.852v2.222h3.282l-.524 3.47h-2.758v8.385c5.737-.904 10.125-5.864 10.125-11.854z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="text-muted transition hover:text-foreground"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.315.975.975 1.253 2.242 1.315 3.608.058 1.266.069 1.646.069 4.843 0 3.197-.012 3.576-.069 4.843-.062 1.366-.34 2.633-1.315 3.608-.975.975-2.242 1.253-3.608 1.315-1.266.058-1.646.069-4.85.069-3.204 0-3.584-.012-4.85-.069-1.366-.062-2.633-.34-3.608-1.315-.975-.975-1.253-2.242-1.315-3.608C2.175 15.56 2.163 15.18 2.163 12c0-3.197.012-3.576.069-4.843.062-1.366.34-2.633 1.315-3.608.975-.975 2.242-1.253 3.608-1.315 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.014 7.052.072 5.773.13 4.602.414 3.635 1.382 2.668 2.349 2.384 3.52 2.326 4.799 2.268 6.079 2.254 6.488 2.254 9.747v4.506c0 3.259.014 3.668.072 4.948.058 1.279.342 2.45 1.309 3.417.967.967 2.138 1.251 3.417 1.309 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 1.279-.058 2.45-.342 3.417-1.309.967-.967 1.251-2.138 1.309-3.417.058-1.28.072-1.689.072-4.948V9.747c0-3.259-.014-3.668-.072-4.948-.058-1.279-.342-2.45-1.309-3.417C19.398.414 18.227.13 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4.000 0 110-8 4 4.000 0 010 8zm6.406-11.845a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
