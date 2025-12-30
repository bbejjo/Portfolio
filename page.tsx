import { AboutSection } from "@/features/landing/components/AboutSection";
import { ContactSection } from "@/features/landing/components/ContactSection";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { MotionSection } from "@/features/landing/components/MotionSection";
import { ProjectsSection } from "@/features/landing/components/ProjectsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <MotionSection />
        <ContactSection />
      </main>
      <footer className="border-t border-white/10 bg-background py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2025 Lumen Trio. Crafted with intention.</p>
          <p>Based in NYC - Working globally</p>
        </div>
      </footer>
    </div>
  );
}
