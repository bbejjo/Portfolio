"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { SectionFrame } from "./SectionFrame";
import { SectionHeader } from "./SectionHeader";
import { projects } from "../data/projects";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function ProjectsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [activeProject, setActiveProject] = useState<
    (typeof projects)[number] | null
  >(null);

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

  useEffect(() => {
    if (!activeProject) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

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
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveProject(project)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveProject(project);
                      }
                    }}
                    className="group mx-auto w-full max-w-xl cursor-pointer rounded-3xl border border-white/10 bg-surface-2/70 p-6 text-left transition hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2/90 md:mx-0 md:max-w-none"
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
      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/90"
            onClick={() => setActiveProject(null)}
            role="dialog"
            aria-modal="true"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
          >
            <motion.div
              initial={
                shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "100%" }
              }
              animate={{ y: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { y: 0 } : { y: "100%" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 180, damping: 26 }
              }
              className="h-[90vh] w-full overflow-hidden rounded-t-3xl border border-white/10 bg-surface-2/90 shadow-2xl will-change-transform"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-end px-6 py-4">
                  <a
                    href={activeProject.link || "#"}
                    aria-disabled={!activeProject.link}
                    onClick={(event) => {
                      if (!activeProject.link) {
                        event.preventDefault();
                      }
                    }}
                    className={`rounded-full border border-accent/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent transition ${
                      activeProject.link
                        ? "hover:bg-accent/10"
                        : "cursor-not-allowed opacity-60"
                    }`}
                  >
                    Visit website
                  </a>
                </div>
                <div className="relative flex-1 bg-[radial-gradient(circle_at_top,_rgba(94,234,212,0.12),_transparent_45%),radial-gradient(circle_at_80%_80%,_rgba(251,191,36,0.08),_transparent_40%)]">
                  <span className="sr-only">
                    {activeProject.title} preview
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
