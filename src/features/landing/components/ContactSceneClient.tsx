"use client";

import { useEffect, useState } from "react";
import { ContactScene, type RobotMode } from "./ContactScene";

type ContactSceneClientProps = {
  mode: RobotMode;
  nameEl: HTMLElement | null;
  emailEl: HTMLElement | null;
  messageEl: HTMLElement | null;
  typingIntensity: number;
};

export function ContactSceneClient({
  mode,
  nameEl,
  emailEl,
  messageEl,
  typingIntensity,
}: ContactSceneClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full" aria-hidden="true" />;
  }

  return (
    <ContactScene
      mode={mode}
      nameEl={nameEl}
      emailEl={emailEl}
      messageEl={messageEl}
      typingIntensity={typingIntensity}
    />
  );
}
