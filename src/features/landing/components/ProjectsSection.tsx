"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionFrame } from "./SectionFrame";
import { SectionHeader } from "./SectionHeader";
import { projects } from "../data/projects";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function ProjectsSection() {
  const ref = useRef<HTMLElement | null>(null);
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

  const shouldAnimate = !shouldReduceMotion && !isMobile;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["40% end", "40% start"],
  });
  const width = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    shouldReduceMotion ? ["100%", "100%", "100%"] : ["50%", "50%", "100%"],
  );
  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    [1, 1, 0],
  );
  const labelScale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.6],
    [1, 1, 0.98],
  );
  const labelY = useTransform(scrollYProgress, [0, 0.35], [-8, 140]);
  const frameOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.6],
    [0, 0.35, 1],
  );
  const frameY = useTransform(scrollYProgress, [0, 0.35, 0.6], [24, 14, 0]);

  return (
    <section
      id="projects"
      ref={ref}
      className="scroll-mt-16 bg-background py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          eyebrow="Our projects"
          title="Selected work across product, platform, and brand."
          description="A snapshot of the challenges we solve: conversion, performance, and visual storytelling."
        />
      </div>
      <div className="relative mt-8">
        <motion.div
          aria-hidden="true"
          style={{
            opacity: shouldAnimate ? labelOpacity : 0,
            scale: shouldAnimate ? labelScale : 1,
            y: shouldAnimate ? labelY : 0,
          }}
          className="pointer-events-none absolute inset-0 flex items-start justify-center pt-4"
        >
          <div className="relative text-center">
            <span
              aria-hidden="true"
              className="absolute -inset-x-10 -inset-y-6 rounded-full bg-accent/25 blur-3xl"
            />
            <span className="relative block font-display text-[clamp(2.75rem,6vw,5.5rem)] font-semibold text-foreground drop-shadow-[0_0_28px_rgba(94,234,212,0.6)]">
              Projects
            </span>
            <span className="relative mx-auto mt-4 block h-px w-24 bg-gradient-to-r from-accent/0 via-accent/90 to-accent/0" />
          </div>
        </motion.div>
        <motion.div
          style={{
            width: shouldAnimate ? width : "100%",
            opacity: shouldAnimate ? frameOpacity : 1,
            y: shouldAnimate ? frameY : 0,
          }}
          className="mx-auto"
        >
          <SectionFrame className="px-6 py-8 sm:px-8">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid justify-items-center gap-6 md:grid-cols-2 md:justify-items-stretch">
                {projects.map((project) => (
                  <article
                    key={project.title}
                    className="group mx-auto w-full max-w-xl rounded-3xl border border-white/10 bg-surface-2/70 p-6 transition hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2/90 md:mx-0 md:max-w-none"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-2xl font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        {project.focus}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-background/40 px-3 py-1 text-xs text-muted transition group-hover:text-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </SectionFrame>
        </motion.div>
      </div>
    </section>
  );
}
