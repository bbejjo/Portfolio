"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AboutSection } from "./AboutSection";
import { HeroSection } from "./HeroSection";

type StackSizes = {
  hero: number;
};

const REVEAL_DELAY_VH = 10;
const REVEAL_HOLD_VH = 0;
const REVEAL_DURATION_VH = 70;

export function HeroAboutStack() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [sizes, setSizes] = useState<StackSizes>({ hero: 0 });
  const [viewportHeight, setViewportHeight] = useState(0);
  const [revealProgressValue, setRevealProgressValue] = useState(0);
  const revealMetricsRef = useRef({
    containerHeight: 1,
    revealStartDistance: 0,
    revealEndDistance: 0,
    aboutMinHeight: 0,
    viewportHeight: 0,
  });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const revealDelayPx = (REVEAL_DELAY_VH / 100) * viewportHeight;
  const revealHoldPx = (REVEAL_HOLD_VH / 100) * viewportHeight;
  const revealDurationPx = (REVEAL_DURATION_VH / 100) * viewportHeight;
  const requiredAboutHeight =
    viewportHeight > 0
      ? viewportHeight +
        sizes.hero +
        revealDelayPx +
        revealDurationPx +
        revealHoldPx
      : 0;
  const aboutMinHeight = requiredAboutHeight > 0 ? requiredAboutHeight : 0;
  const containerHeight = aboutMinHeight > 0 ? aboutMinHeight : 1;
  const wipeEnd = Math.min(1, sizes.hero / containerHeight);
  const revealStartDistance = sizes.hero + revealDelayPx;
  const stickyEndDistance = Math.max(0, aboutMinHeight - viewportHeight);
  const revealEndDistance = Math.max(
    revealStartDistance,
    stickyEndDistance - revealHoldPx
  );
  const clipPath = useTransform(
    scrollYProgress,
    [0, wipeEnd],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
    { clamp: true }
  );
  const containerStyle = {
    "--hero-height": `${sizes.hero}px`,
  } as CSSProperties;

  const calculateRevealProgress = (value: number) => {
    const metrics = revealMetricsRef.current;
    if (metrics.aboutMinHeight === 0 || metrics.viewportHeight === 0) {
      return 0;
    }
    const scrollDistance = value * metrics.containerHeight;
    if (metrics.revealEndDistance <= metrics.revealStartDistance) {
      return scrollDistance >= metrics.revealStartDistance ? 1 : 0;
    }
    const adjusted =
      (scrollDistance - metrics.revealStartDistance) /
      (metrics.revealEndDistance - metrics.revealStartDistance);
    return Math.min(1, Math.max(0, adjusted));
  };

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const updateSizes = () => {
      const nextHero = hero.getBoundingClientRect().height;
      setSizes((prev) => (prev.hero === nextHero ? prev : { hero: nextHero }));
    };

    updateSizes();
    const observer = new ResizeObserver(updateSizes);
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nextMetrics = {
      containerHeight,
      revealStartDistance,
      revealEndDistance,
      aboutMinHeight,
      viewportHeight,
    };
    revealMetricsRef.current = nextMetrics;
    const next = calculateRevealProgress(scrollYProgress.get());
    setRevealProgressValue((prev) => (prev === next ? prev : next));
  }, [
    scrollYProgress,
    containerHeight,
    revealStartDistance,
    revealEndDistance,
    aboutMinHeight,
    viewportHeight,
  ]);

  useEffect(() => {
    const updateReveal = (value: number) => {
      const next = calculateRevealProgress(value);
      setRevealProgressValue((prev) => (prev === next ? prev : next));
    };

    updateReveal(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on("change", updateReveal);
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const updateViewport = () => {
      setViewportHeight(window.innerHeight);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={containerStyle}>
      <div ref={heroRef} className="sticky top-0 z-20">
        <motion.div style={{ clipPath }} className="will-change-[clip-path]">
          <HeroSection />
        </motion.div>
      </div>
      <div className="-mt-[var(--hero-height)]">
        <AboutSection
          revealProgress={revealProgressValue}
          minHeight={aboutMinHeight || undefined}
        />
      </div>
    </div>
  );
}
