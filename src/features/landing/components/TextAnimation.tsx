"use client";

import type { ComponentType, JSX } from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const generateVariants = (direction: Direction): Variants => {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const value = direction === "right" || direction === "down" ? 40 : -40;
  const axisOffset = axis === "x" ? { x: value } : { y: value };
  const axisReset = axis === "x" ? { x: 0 } : { y: 0 };

  return {
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
      ...axisOffset,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      ...axisReset,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };
};

const defaultViewport = { amount: 0.3, margin: "0px 0px 0px 0px" };

type TextAnimationProps = {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  viewport?: {
    amount?: number;
    margin?: string;
    once?: boolean;
  };
  variants?: Variants;
  direction?: Direction;
  letterAnimation?: boolean;
  lineAnimation?: boolean;
};

export function TextAnimation({
  as = "h2",
  text,
  className,
  viewport = defaultViewport,
  variants,
  direction = "down",
  letterAnimation = false,
  lineAnimation = false,
}: TextAnimationProps) {
  const baseVariants = variants ?? generateVariants(direction);
  const MotionComponent = motion[
    as as keyof typeof motion
  ] as ComponentType<HTMLMotionProps<HTMLElement>>;
  const words = text.split(" ");

  return (
    <MotionComponent
      whileInView="visible"
      initial="hidden"
      variants={containerVariants}
      viewport={viewport}
      className={cn("block text-foreground", className)}
    >
      <span className="sr-only">{text}</span>
      {lineAnimation ? (
        <motion.span
          aria-hidden="true"
          className="inline-block"
          variants={baseVariants}
        >
          {text}
        </motion.span>
      ) : (
        <span aria-hidden="true" className="inline-flex flex-wrap gap-[0.3em]">
          {words.map((word, index) => {
            const isLastWord = index === words.length - 1;
            return (
              <motion.span
                key={`${word}-${index}`}
                className="inline-block"
                variants={letterAnimation ? {} : baseVariants}
              >
                {letterAnimation ? (
                  <>
                    {Array.from(word).map((letter, letterIndex) => (
                      <motion.span
                        key={`${letter}-${letterIndex}`}
                        className="inline-block"
                        variants={baseVariants}
                      >
                        {letter}
                      </motion.span>
                    ))}
                    {!isLastWord ? <span>&nbsp;</span> : null}
                  </>
                ) : (
                  <>
                    {word}
                    {!isLastWord ? "\u00A0" : null}
                  </>
                )}
              </motion.span>
            );
          })}
        </span>
      )}
    </MotionComponent>
  );
}
