"use client";

import { useEffect, useState } from "react";
import type { RobotMode } from "./ContactScene";
import type { Translations } from "@/i18n/translations";

type EyesTrackerProps = {
  mode: RobotMode;
  emailValue?: string;
  isSubmitSuccess?: boolean;
  copy: Translations["contact"]["eyes"];
};

export function EyesTracker({
  mode,
  emailValue = "",
  isSubmitSuccess = false,
  copy,
}: EyesTrackerProps) {
  const [lookDirection, setLookDirection] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [eyesClosed, setEyesClosed] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [jumpHeight, setJumpHeight] = useState(0);
  const [faceScale, setFaceScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Check if email is missing @ symbol
  const hasMissingAtSymbol = emailValue.length > 0 && !emailValue.includes("@");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateMatch = () => setIsMobile(mediaQuery.matches);
    updateMatch();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMatch);
      return () => mediaQuery.removeEventListener("change", updateMatch);
    }

    mediaQuery.addListener(updateMatch);
    return () => mediaQuery.removeListener(updateMatch);
  }, []);

  useEffect(() => {
    // Change eye position and rotation based on form field focus
    if (isSubmitSuccess) {
      // Happy/closed eyes for success
      setRotation(0);
      setEyesClosed(true);
      return;
    }

    switch (mode) {
      case "name":
        setRotation(isMobile ? 0 : 15);
        setLookDirection(isMobile ? { x: 0, y: 8 } : { x: 8, y: -6 });
        setEyesClosed(false);
        break;
      case "email":
        setRotation(isMobile ? 0 : 20);
        setLookDirection(isMobile ? { x: 0, y: 10 } : { x: 10, y: -4 });
        setEyesClosed(false);
        break;
      case "message":
        // Turn around and close eyes
        setRotation(180);
        setLookDirection({ x: 0, y: 0 });
        setEyesClosed(true);
        break;
      case "idle":
        setRotation(0);
        setLookDirection({ x: 0, y: 0 });
        setEyesClosed(false);
        break;
    }
  }, [mode, isSubmitSuccess, isMobile]);

  // Jumping animation while holding
  useEffect(() => {
    if (!isHolding) return;

    let jumpCounter = 0;
    const jumpInterval = setInterval(() => {
      jumpCounter++;
      const jumpPhase = (jumpCounter % 20) / 10; // 0 to 2
      const height = Math.abs(Math.sin(jumpPhase * Math.PI)) * 30; // Jump height
      setJumpHeight(-height);
      setFaceScale(1 + Math.sin(jumpPhase * Math.PI) * 0.15); // Squash and stretch
    }, 50);

    return () => clearInterval(jumpInterval);
  }, [isHolding]);

  const handlePressStart = () => {
    setIsHolding(true);
  };

  const handlePressEnd = () => {
    setIsHolding(false);
    setJumpHeight(0);
    setFaceScale(1);
  };

  useEffect(() => {
    window.addEventListener("pointerup", handlePressEnd);
    window.addEventListener("pointercancel", handlePressEnd);
    return () => {
      window.removeEventListener("pointerup", handlePressEnd);
      window.removeEventListener("pointercancel", handlePressEnd);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-full w-full flex-col gap-12">
      {/* Animated Face */}
      <div
        className="relative h-32 w-32 touch-none select-none transition-transform duration-500 cursor-grab active:cursor-grabbing"
        style={{
          transform: `rotateY(${rotation}deg) translateY(${jumpHeight}px) scale(${faceScale})`,
          transformStyle: "preserve-3d",
        }}
        onPointerDown={handlePressStart}
        onPointerUp={handlePressEnd}
        onPointerLeave={handlePressEnd}
        onPointerCancel={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        {/* Head */}
        <div className="absolute inset-0 rounded-full border-4 border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-lg" />

        {/* Left Eye */}
        <div className={`absolute left-6 top-8 w-10 h-14 rounded-full border-2 border-white/20 bg-surface/40 flex items-center justify-center overflow-hidden ${isHolding ? "animate-pulse" : ""}`}>
          {eyesClosed ? (
            <div className="w-8 h-2 border-b-2 border-white/30" />
          ) : (
            <div
              className="w-4 h-6 bg-gradient-to-b from-accent to-accent/60 rounded-full transition-all duration-300"
              style={{
                transform: `translate(${lookDirection.x * 0.3 + (isHolding ? Math.random() * 4 - 2 : 0)}px, ${lookDirection.y * 0.4 + (isHolding ? Math.random() * 4 - 2 : 0)}px)`,
              }}
            />
          )}
        </div>

        {/* Right Eye */}
        <div className={`absolute right-6 top-8 w-10 h-14 rounded-full border-2 border-white/20 bg-surface/40 flex items-center justify-center overflow-hidden ${isHolding ? "animate-pulse" : ""}`}>
          {eyesClosed ? (
            <div className="w-8 h-2 border-b-2 border-white/30" />
          ) : (
            <div
              className="w-4 h-6 bg-gradient-to-b from-accent to-accent/60 rounded-full transition-all duration-300"
              style={{
                transform: `translate(${lookDirection.x * 0.3 + (isHolding ? Math.random() * 4 - 2 : 0)}px, ${lookDirection.y * 0.4 + (isHolding ? Math.random() * 4 - 2 : 0)}px)`,
              }}
            />
          )}
        </div>

        {/* Mouth - Changes when holding */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-300 ${isHolding ? "w-5 h-3 border-2 border-accent/50" : "w-6 h-2 border-b-2"} border-white/15 rounded-full`} />
      </div>

      {/* Status Text */}
      <div className="text-center min-h-10">
        {isSubmitSuccess && (
          <p className="text-sm text-accent font-semibold animate-bounce">
            {copy.success}
          </p>
        )}
        {!isSubmitSuccess && hasMissingAtSymbol && (
          <p className="text-sm text-accent-2 font-semibold animate-pulse">
            {copy.missingAt}
          </p>
        )}
        {!isSubmitSuccess && !hasMissingAtSymbol && isHolding && (
          <p className="text-sm text-accent/70 font-semibold animate-bounce">
            {copy.holding}
          </p>
        )}
        {!isSubmitSuccess &&
          !hasMissingAtSymbol &&
          !isHolding &&
          mode === "name" && (
            <p className="text-sm text-accent font-semibold">{copy.name}</p>
          )}
        {!isSubmitSuccess &&
          !hasMissingAtSymbol &&
          !isHolding &&
          mode === "email" && (
            <p className="text-sm text-accent font-semibold">{copy.email}</p>
          )}
        {!isSubmitSuccess &&
          !hasMissingAtSymbol &&
          !isHolding &&
          mode === "message" && (
            <p className="text-sm text-accent/70 italic">{copy.message}</p>
          )}
        {!isSubmitSuccess &&
          !hasMissingAtSymbol &&
          !isHolding &&
          mode === "idle" && (
            <p className="text-xs text-muted">{copy.idle}</p>
          )}
      </div>
    </div>
  );
}
