"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { MediaLoader } from "@/components/ui/media-with-loader";
import type { Translations } from "@/i18n/translations";

type ThrowVector = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

type ThrowItem = {
  src: string;
  alt: string;
  size: string;
  aspect: string;
  layer: string;
  delay: number;
  start: ThrowVector;
  end: ThrowVector;
  arc: { x: number; y: number };
};

const throwItems: ThrowItem[] = [
  {
    src: "/images/p.jpg",
    alt: "Motion image 1",
    size: "w-44 sm:w-60 md:w-72",
    aspect: "aspect-[4/3]",
    layer: "z-30",
    delay: 0.0,
    start: { x: -50, y: 10, rotate: -6, scale: 0.9 },
    end: { x: -420, y: -220, rotate: -18, scale: 1.08 }, 
    arc: { x: -40, y: -80 },
  },
  {
    src: "/images/p2.png",
    alt: "Motion image 2",
    size: "w-36 sm:w-48 md:w-56",
    aspect: "aspect-[3/4]",
    layer: "z-20",
    delay: 0.06,
    start: { x: 120, y: 90, rotate: 8, scale: 0.86 },
    end: { x: 360, y: -320, rotate: 20, scale: 1.02 },
    arc: { x: 60, y: -120 },
  },
  {
    src: "/images/p3.png",
    alt: "Motion image 3",
    size: "w-36 sm:w-48 md:w-56",
    aspect: "aspect-[3/4]",
    layer: "z-20",
    delay: 0.12,
    start: { x: -10, y: -20, rotate: 4, scale: 0.9 },
    end: { x: 120, y: 320, rotate: -12, scale: 1.1 },
    arc: { x: 40, y: 120 },
  },
  {
    src: "/images/p4.png",
    alt: "Motion image 4",
    size: "w-32 sm:w-44 md:w-52",
    aspect: "aspect-[4/5]",
    layer: "z-10",
    delay: 0.18,
    start: { x: 40, y: 20, rotate: -10, scale: 0.84 },
    end: { x: -500, y: 260, rotate: 24, scale: 1.0 },
    arc: { x: -80, y: 80 },
  },
  {
    src: "/images/p5.png",
    alt: "Motion image 5",
    size: "w-36 sm:w-48 md:w-60",
    aspect: "aspect-[5/4]",
    layer: "z-20",
    delay: 0.24,
    start: { x: 200, y: 30, rotate: 6, scale: 0.88 },
    end: { x: 300, y: 220, rotate: -12, scale: 1.04 },
    arc: { x: 90, y: 60 },
  },
  {
    src: "/images/p6.png",
    alt: "Motion image 6",
    size: "w-44 sm:w-60 md:w-72",
    aspect: "aspect-[3/2]",
    layer: "z-30",
    delay: 0.3,
    start: { x: -30, y: 18, rotate: -2, scale: 0.9 },
    end: { x: -120, y: -360, rotate: 12, scale: 1.05 },
    arc: { x: -40, y: -160 },
  },
  {
    src: "/images/p7.png",
    alt: "Motion image 7",
    size: "w-36 sm:w-48 md:w-56",
    aspect: "aspect-[3/4]",
    layer: "z-20",
    delay: 0.36,
    start: { x: 0, y: -30, rotate: 12, scale: 0.82 },
    end: { x: 260, y: -80, rotate: -18, scale: 0.98 },
    arc: { x: 120, y: -20 },
  },
  {
    src: "/images/p8.png",
    alt: "Motion image 8",
    size: "w-40 sm:w-56 md:w-64",
    aspect: "aspect-[2/3]",
    layer: "z-10",
    delay: 0.42,
    start: { x: -10, y: 40, rotate: -14, scale: 0.8 },
    end: { x: -260, y: 320, rotate: 26, scale: 0.98 },
    arc: { x: -120, y: 140 },
  },
];

type ThrowImageProps = {
  item: ThrowItem;
  progress: MotionValue<number>;
  reduceMotion: boolean;
};

function ThrowImage({ item, progress, reduceMotion }: ThrowImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const start = reduceMotion ? { x: 0, y: 0, rotate: 0, scale: 1 } : item.start;
  const end = reduceMotion ? { x: 0, y: 0, rotate: 0, scale: 1 } : item.end;
  const arc = reduceMotion ? { x: 0, y: 0 } : item.arc;

  const dampedProgress = useTransform(progress, [0, 1], [0, 0.7]);

  const startPoint = 0.08 + item.delay;
  const endPoint = 0.86 + item.delay;
  const fadeIn = Math.max(0, startPoint - 0.06);
  const midPoint = startPoint + (endPoint - startPoint) * 0.5;

  const midX = (start.x + end.x) / 2 + arc.x;
  const midY = (start.y + end.y) / 2 + arc.y;

  const x = useTransform(dampedProgress, [startPoint, midPoint, endPoint], [
    start.x,
    midX,
    end.x,
  ]);
  const y = useTransform(dampedProgress, [startPoint, midPoint, endPoint], [
    start.y,
    midY,
    end.y,
  ]);
  const rotate = useTransform(dampedProgress, [startPoint, endPoint], [
    start.rotate,
    end.rotate,
  ]);
  const scale = useTransform(dampedProgress, [startPoint, endPoint], [
    start.scale,
    end.scale,
  ]);
  const opacity = useTransform(dampedProgress, [0, fadeIn, startPoint], [
    0,
    0,
    1,
  ]);

  return (
    <div className={`pointer-events-none absolute inset-0 flex items-center justify-center ${item.layer}`}>
      <motion.div
        style={{ x, y, rotate, scale, opacity }}
        className={`relative rounded-2xl border border-white/20 bg-surface/60 shadow-lg will-change-transform ${item.size} ${item.aspect}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 12rem, (max-width: 1024px) 16rem, 20rem"
          className={`h-full w-full rounded-2xl object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
        <MediaLoader isLoaded={isLoaded} />
      </motion.div>
    </div>
  );
}

type MotionSectionProps = {
  copy: Translations["motion"];
};

export function MotionSection({ copy }: MotionSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.35, 0.5, 0]
  );

  const items = throwItems.map((item, index) => ({
    ...item,
    alt: copy.itemAlt[index] ?? item.alt,
  }));

  return (
    <section id="motion" ref={ref} className="relative scroll-mt-16 bg-background">
      <h2 className="sr-only">{copy.srTitle}</h2>

      <div className="relative min-h-[500vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
          <motion.div
            aria-hidden
            style={{ opacity: glowOpacity }}
            className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_30%_30%,_rgba(94,234,212,0.25),_transparent_50%)]"
          />

          <div className="relative z-10 h-full w-full" aria-hidden="true">
            {items.map((item) => (
              <ThrowImage
                key={`${item.src}-${item.delay}`}
                item={item}
                progress={scrollYProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
