"use client";

import { useRef, useState } from "react";
import { ContactForm } from "./ContactForm";
import { EyesTracker } from "./EyesTracker";
import type { RobotMode } from "./ContactScene";

export function ContactInteractive() {
  const [mode, setMode] = useState<RobotMode>("idle");
  const [emailValue, setEmailValue] = useState("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  type ContactField = Exclude<RobotMode, "idle">;

  const handleFocus = (field: ContactField) => {
    setMode(field);
  };

  const handleBlur = () => {
    setMode("idle");
  };

  const handleSubmitSuccess = () => {
    setIsSubmitSuccess(true);
    // Reset after 4 seconds
    setTimeout(() => {
      setIsSubmitSuccess(false);
      setMode("idle");
    }, 4000);
  };

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-surface/60">
        <div className="absolute left-6 top-6 z-10 rounded-full border border-white/10 bg-background/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted">
          👀 Eyes
        </div>
        <div className="h-full w-full" aria-hidden="true">
          <EyesTracker mode={mode} emailValue={emailValue} isSubmitSuccess={isSubmitSuccess} />
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-surface/60 p-8">
        <ContactForm
          nameRef={nameRef}
          emailRef={emailRef}
          messageRef={messageRef}
          onFocusField={handleFocus}
          onBlurField={handleBlur}
          onInputField={(field) => {
            if (field === "email") {
              setEmailValue(emailRef.current?.value || "");
            }
          }}
          onSubmitSuccess={handleSubmitSuccess}
        />
      </div>
    </div>
  );
}
