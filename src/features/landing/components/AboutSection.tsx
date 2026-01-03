"use client";

import { useMemo } from "react";

const aboutLines = [
  "We build high-quality business",
  "websites that combine strategy,",
  "performance, and design 👌 helping",
  "companies grow credibility, attract",
  "customers, and stand",
  "out with reliable,",
  "professional digital experiences. 🤩",
];

type AboutSectionProps = {
  revealProgress: number;
  minHeight?: number;
};

export function AboutSection({
  revealProgress,
  minHeight,
}: AboutSectionProps) {
  const { lines, revealableCount } = useMemo(() => {
    const revealRegex = /\S/;
    let count = 0;
    const linesWithChars = aboutLines.map((line) =>
      Array.from(line).map((char) => {
        if (revealRegex.test(char)) {
          const index = count;
          count += 1;
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
          Math.max(0, Math.floor(revealProgress * revealableCount))
        );

  return (
    <section
      id="about"
      className="relative scroll-mt-16 bg-background"
      style={{ minHeight: minHeight ? `${minHeight}px` : "200vh" }}
    >
      <div className="sticky top-0 flex min-h-[100vh] items-center justify-center px-6 py-20">
        <div className="flex max-w-5xl flex-col items-center gap-2 text-center">
          {lines.map((line, lineIndex) => (
            <div
              key={`line-${lineIndex}`}
              className="block font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl"
            >
              {line.map((item, charIndex) => {
                const isRevealed =
                  item.revealIndex !== null &&
                  item.revealIndex < revealedCount;
                const colorClass =
                  item.revealIndex === null
                    ? "text-foreground"
                    : isRevealed
                      ? "text-foreground"
                      : "text-muted/40";

                return (
                  <span
                    key={`char-${lineIndex}-${charIndex}`}
                    className={colorClass}
                  >
                    {item.char}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
