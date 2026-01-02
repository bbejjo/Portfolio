"use client";

import { useEffect, useRef, useState } from "react";
import { TextAnimation } from "./TextAnimation";

const textViewport = { amount: 0.5, once: true };

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visitKey, setVisitKey] = useState(0);
  const wasVisible = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.intersectionRatio >= 0.1;
        if (!isVisible && wasVisible.current) {
          setVisitKey((value) => value + 1);
        }
        wasVisible.current = isVisible;
      },
      { threshold: [0, 0.1] }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-[150vh] scroll-mt-16 bg-background py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div key={visitKey} className="mt-12">
          <TextAnimation
            text="Creative ideas start here."
            variants={{
              hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
              visible: {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                transition: { ease: "linear" },
              },
            }}
            className="mx-auto max-w-3xl text-center text-3xl font-medium text-foreground sm:text-4xl lg:text-5xl"
            viewport={textViewport}
          />
          <div className="mt-12 flex flex-col gap-10 sm:mt-16 sm:min-h-[90svh] sm:grid sm:grid-rows-3 sm:gap-0">
            <div className="flex items-center">
              <TextAnimation
                as="p"
                letterAnimation
                text="From concept to launch — we turn ideas into digital reality ✨"
                variants={{
                  hidden: { filter: "blur(4px)", opacity: 0, y: 20 },
                  visible: {
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.2,
                    },
                  },
                }}
                className="max-w-3xl text-3xl font-medium text-foreground sm:text-4xl lg:text-5xl"
                viewport={textViewport}
              />
            </div>
            <div className="flex items-center md:justify-end">
              <TextAnimation
                text="Built with purpose. Designed for impact🔮"
                direction="right"
                className="max-w-3xl text-2xl font-medium text-foreground sm:text-3xl lg:text-4xl md:ml-auto md:text-right"
                viewport={textViewport}
              />
            </div>
            <div className="flex items-center">
              <TextAnimation
                text="Let’s create something meaningful together 🤝"
                direction="down"
                lineAnimation
                className="max-w-3xl text-2xl font-medium text-foreground sm:text-3xl lg:text-4xl"
                viewport={textViewport}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
