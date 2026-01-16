"use client";

import { motion } from "framer-motion";
import ASMRStaticBackground from "@/components/ui/demo";
import { VideoWithLoader } from "@/components/ui/media-with-loader";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const shouldReduceMotion = usePrefersReducedMotion();
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = mobileVideoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {});
      }
    };

    video.load();
    tryPlay();

    const handleUnlock = () => {
      tryPlay();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };

    window.addEventListener("touchstart", handleUnlock, {
      once: true,
      passive: true,
    });
    window.addEventListener("click", handleUnlock, { once: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("touchstart", handleUnlock);
      window.removeEventListener("click", handleUnlock);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-background pb-24 pt-20 sm:min-h-[100vh] sm:pt-28"
    >
      {/* ===== DESKTOP HERO (ALWAYS DESKTOP) ===== */}
      <div
        aria-hidden
        className="
          absolute inset-0 z-0
          opacity-100
          max-md:opacity-0 max-md:pointer-events-none
        "
      >
        <ASMRStaticBackground
          className="h-full w-full"
          showOverlay={false}
          showCursor={false}
          interactive={!shouldReduceMotion}
        />
      </div>

      {/* ===== MOBILE HERO (ALWAYS MOBILE) ===== */}
      <div
        aria-hidden
        className="
          absolute inset-0 z-0
          opacity-0 pointer-events-none
          max-md:opacity-100 max-md:pointer-events-auto
        "
      >
        <VideoWithLoader
          className="h-full w-full object-cover"
          wrapperClassName="h-full w-full"
          src="/videos/mob-hero.mp4"
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          ref={mobileVideoRef}
        />
      </div>

      {/* Desktop-only animated accent */}
      <motion.div
        aria-hidden
        className="
          absolute -right-24 top-24 z-20 h-64 w-64 rounded-full
          bg-accent/20 blur-[120px]
          opacity-100 max-md:opacity-0
          pointer-events-none
        "
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0 }
            : { x: [0, -30, 0], y: [0, 20, 0] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 18, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Content */}
      <div className="relative z-30 mx-auto flex min-h-[70svh] max-w-6xl items-center justify-center px-6 text-center sm:min-h-[70vh]">
        <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold text-foreground">
          Powered By WebBuilders.
        </h1>
      </div>
    </section>
  );
}
