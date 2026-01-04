"use client";

import { motion } from "framer-motion";
import ASMRStaticBackground from "@/components/ui/demo";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useEffect, useState } from "react";

export function HeroSection() {
  const shouldReduceMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full max-w-full scroll-mt-16 overflow-hidden bg-background pb-24 pt-20 sm:min-h-[100vh] sm:pt-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0"
      >
        <ASMRStaticBackground
          className="h-full w-full"
          showOverlay={false}
          showCursor={false}
          interactive={!isMobile && !shouldReduceMotion}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,_rgba(94,234,212,0.12),_transparent_45%),radial-gradient(circle_at_30%_30%,_rgba(251,191,36,0.08),_transparent_40%)]"
      />
      <motion.div
        aria-hidden
        className="absolute -right-24 top-24 z-20 h-64 w-64 rounded-full bg-accent/20 blur-[120px]"
        animate={
          shouldReduceMotion ? { x: 0, y: 0 } : { x: [0, -30, 0], y: [0, 20, 0] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 18, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <div className="relative z-30 mx-auto flex min-h-[70svh] w-full max-w-6xl items-center justify-center px-6 text-center sm:min-h-[70vh]">
        <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold text-foreground">
          Powered By WebBuilders.
        </h1>
      </div>
    </section>
  );
}
