"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, type CSSProperties } from "react";

type ASMRStaticBackgroundProps = {
  className?: string;
  showOverlay?: boolean;
  showCursor?: boolean;
  interactive?: boolean;
};

/**
 * ASMRStaticBackground Component
 *
 * Features:
 * - High-density particle system using HTML5 Canvas.
 * - Reactive "magnetic vortex" effect on mouse hover.
 * - Visual "friction glow" when particles accelerate.
 * - Glass-shard and charcoal-dust aesthetic.
 */
const ASMRStaticBackground = ({
  className,
  showOverlay = true,
  showCursor = true,
  interactive = true,
}: ASMRStaticBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const setMouseVars = (x: number, y: number) => {
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    const PARTICLE_COUNT = 1000;
    const MAGNETIC_RADIUS = 280;
    const VORTEX_STRENGTH = 0.07;
    const PULL_STRENGTH = 0.12;
    const EDGE_PADDING = 24;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    class Particle {
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      size = 0;
      alpha = 0;
      color = "";
      rotation = 0;
      rotationSpeed = 0;
      frictionGlow = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        // 70% Charcoal, 30% Glass
        const isGlass = Math.random() > 0.7;
        this.color = isGlass ? "240, 245, 255" : "80, 80, 85";
        this.alpha = Math.random() * 0.4 + 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const safeDist = Math.max(dist, 1);

        if (dist < MAGNETIC_RADIUS) {
          const force = (MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS;

          // Magnetic center pull
          this.vx += (dx / safeDist) * force * PULL_STRENGTH;
          this.vy += (dy / safeDist) * force * PULL_STRENGTH;

          // Swirl vortex motion (Perpendicular to radius)
          this.vx += (dy / safeDist) * force * VORTEX_STRENGTH * 10;
          this.vy -= (dx / safeDist) * force * VORTEX_STRENGTH * 10;

          // Glow based on proximity and velocity
          this.frictionGlow = force * 0.7;
        } else {
          this.frictionGlow *= 0.92;
        }

        // Physics application
        this.x += this.vx;
        this.y += this.vy;

        // Friction / Damping
        this.vx *= 0.95;
        this.vy *= 0.95;

        // Background jitter (frozen static feel)
        this.vx += (Math.random() - 0.5) * 0.04;
        this.vy += (Math.random() - 0.5) * 0.04;

        this.rotation +=
          this.rotationSpeed + (Math.abs(this.vx) + Math.abs(this.vy)) * 0.05;

        // Screen wrap
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        const finalAlpha = Math.min(this.alpha + this.frictionGlow, 0.9);
        ctx.fillStyle = `rgba(${this.color}, ${finalAlpha})`;

        if (this.frictionGlow > 0.3) {
          ctx.shadowBlur = 8 * this.frictionGlow;
          ctx.shadowColor = `rgba(180, 220, 255, ${this.frictionGlow})`;
        }

        // Sharp shard geometry
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 2.5);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(0, this.size * 2.5);
        ctx.lineTo(-this.size, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    const resize = () => {
      const rect = container.getBoundingClientRect();

      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.ceil(rect.width * dpr));
      canvas.height = Math.max(1, Math.ceil(rect.height * dpr));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      width = canvas.width / dpr;
      height = canvas.height / dpr;
    };

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        particles.push(new Particle());
      }
    };

    const render = () => {
      // Create slight motion blur effect
      ctx.fillStyle = "rgba(10, 10, 12, 0.18)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        mouse.x = -1000;
        mouse.y = -1000;
        setMouseVars(-1000, -1000);
        return;
      }

      const padding = Math.min(
        EDGE_PADDING,
        rect.width * 0.5,
        rect.height * 0.5,
      );
      const clampedX = clamp(x, padding, rect.width - padding);
      const clampedY = clamp(y, padding, rect.height - padding);

      mouse.x = clampedX;
      mouse.y = clampedY;
      setMouseVars(clampedX, clampedY);
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      setMouseVars(-1000, -1000);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        handleMouseLeave();
        return;
      }

      const padding = Math.min(
        EDGE_PADDING,
        rect.width * 0.5,
        rect.height * 0.5,
      );
      const clampedX = clamp(x, padding, rect.width - padding);
      const clampedY = clamp(y, padding, rect.height - padding);

      mouse.x = clampedX;
      mouse.y = clampedY;
      setMouseVars(clampedX, clampedY);
    };

    const handleResize = () => {
      init();
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(handleResize)
        : null;

    if (resizeObserver) {
      resizeObserver.observe(container);
    }

    const viewport = window.visualViewport;
    if (viewport) {
      viewport.addEventListener("resize", handleResize);
      viewport.addEventListener("scroll", handleResize);
    }

    const isCoarsePointer =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;
    const allowInteraction = interactive && !isCoarsePointer;

    setMouseVars(-1000, -1000);
    init();
    render();

    window.addEventListener("resize", handleResize);
    if (allowInteraction) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("blur", handleMouseLeave);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (viewport) {
        viewport.removeEventListener("resize", handleResize);
        viewport.removeEventListener("scroll", handleResize);
      }
      if (allowInteraction) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("blur", handleMouseLeave);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleMouseLeave);
      }
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#0a0a0c]",
        showCursor && "cursor-none",
        className,
      )}
      style={
        {
          "--mouse-x": "-100px",
          "--mouse-y": "-100px",
        } as CSSProperties
      }
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

      {showOverlay ? (
        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center">
          <div className="rounded-sm border border-white/5 bg-white/[0.02] px-8 py-4 backdrop-blur-sm">
            <h2 className="text-sm font-light uppercase tracking-[0.7em] text-white/30 md:text-xl">
              Atmospheric Friction
            </h2>
            <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="text-center text-[10px] tracking-widest text-white/10">
              INTERACTIVE KINETIC ENVIRONMENT
            </p>
          </div>
        </div>
      ) : null}

      {showCursor ? (
        <div
          className="pointer-events-none absolute left-0 top-0 z-50 h-4 w-4 rounded-full border border-white/20 transition-transform duration-75 ease-out"
          style={{
            transform:
              "translate(calc(var(--mouse-x, -100px) - 50%), calc(var(--mouse-y, -100px) - 50%))",
          }}
        />
      ) : null}
    </div>
  );
};

export default ASMRStaticBackground;
