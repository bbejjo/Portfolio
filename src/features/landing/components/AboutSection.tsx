"use client";

import { useMemo } from "react";
import { easeInOut } from "framer-motion";
import { ImageWithLoader } from "@/components/ui/media-with-loader";
import { InfiniteSlider } from "../components/InfiniteSlider";

const aboutLines = [
  "We build high-quality business",
  "websites that combine strategy,",
  "performance, and design 👌 helping",
  "companies grow credibility, attract",
  "customers.",
];

type AboutSectionProps = {
  revealProgress: number;
  minHeight?: number;
};

export function AboutSection({
  revealProgress,
  minHeight,
}: AboutSectionProps) {
  const easedProgress = easeInOut(revealProgress);

  const { lines, revealableCount } = useMemo(() => {
    const revealRegex = /\S/;
    let count = 0;

    const linesWithChars = aboutLines.map((line) =>
      Array.from(line).map((char) => {
        if (revealRegex.test(char)) {
          const index = count++;
          return { char, revealIndex: index };
        }
        return { char, revealIndex: null };
      })
    );

    return { lines: linesWithChars, revealableCount: count };
  }, []);

  const revealedCount =
    revealableCount === 0
      ? 0
      : Math.min(
          revealableCount,
          Math.max(0, Math.floor(easedProgress * revealableCount))
        );

  return (
    <section
      id="about"
      className="relative scroll-mt-16 bg-background"
      style={{ minHeight: minHeight ? `${minHeight}px` : "200vh" }}
    >
      <div
        className="
          sticky top-0
          flex flex-col lg:flex-row
          min-h-[100vh]
          items-center
          justify-center
          px-6 py-20
          gap-6 lg:gap-20
        "
      >
        {/* LEFT — Scroll-revealed text */}
        <div className="flex flex-col gap-2 text-left lg:max-w-2xl">
          {lines.map((line, lineIndex) => (
            <div
              key={lineIndex}
              className="font-display text-xl sm:text-2xl lg:text-3xl font-medium leading-snug"
            >
              {line.map((item, charIndex) => {
                const isRevealed =
                  item.revealIndex !== null &&
                  item.revealIndex < revealedCount;

                return (
                  <span
                    key={charIndex}
                    className={
                      item.revealIndex === null || isRevealed
                        ? "text-foreground"
                        : "text-muted/40"
                    }
                  >
                    {item.char}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* RIGHT — stacked infinite sliders */}
        <div className="lg:w-1/3 w-full flex flex-col gap-4">
          {/* Slider 1 — normal */}
          <InfiniteSlider duration={18}>
            <ImageWithLoader
              src="/images/slider-dsg.png"
              alt="Slider 1"
              width={1000}
              height={160}
              className="h-32 w-auto object-contain px-10"
              wrapperClassName="inline-flex overflow-hidden"
              priority
            />
          </InfiniteSlider>

          {/* Slider 2 — opposite direction */}
          <InfiniteSlider
  duration={18}
  reverse
className="
  bg-white/10
  backdrop-blur-2xl
  rounded-2xl
  shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
"
>
  <ImageWithLoader
    src="/images/slider-bck.png"
    alt="Slider 2"
    width={1000}
    height={160}
    className="h-32 w-auto object-contain px-10"
    wrapperClassName="inline-flex overflow-hidden"
    priority
  />
</InfiniteSlider>


          {/* Slider 3 — normal */}
          <InfiniteSlider duration={18}>
            <ImageWithLoader
              src="/images/slider-frt.png"
              alt="Slider 3"
              width={1000}
              height={160}
              className="h-32 w-auto object-contain px-10"
              wrapperClassName="inline-flex overflow-hidden"
              priority
            />
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
