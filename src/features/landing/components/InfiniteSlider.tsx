"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";

type InfiniteSliderProps = {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean; // საპირისპირო მიმართულებისთვის
};

export function InfiniteSlider({
  children,
  duration = 18,
  className,
  reverse = false,
}: InfiniteSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!trackRef.current) return;

    const imgs = trackRef.current.querySelectorAll("img");
    const promises = Array.from(imgs).map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) resolve();
          else img.addEventListener("load", () => resolve());
        })
    );

    Promise.all(promises).then(() => {
      if (!trackRef.current) return;
      setDistance(trackRef.current.scrollWidth / 2);
      setReady(true);
    });

    const updateDistance = () => {
      if (!trackRef.current) return;
      setDistance(trackRef.current.scrollWidth / 2);
    };
    window.addEventListener("resize", updateDistance);
    return () => window.removeEventListener("resize", updateDistance);
  }, [children]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{
          animation: ready
            ? `${reverse ? "marquee-reverse" : "marquee"} ${duration}s linear infinite`
            : undefined,
        }}
      >
        {children}
        {children}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-${distance}px); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-${distance}px); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
