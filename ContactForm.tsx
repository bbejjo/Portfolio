"use client";

import { useState, type FormEvent, type RefObject } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type ContactField = keyof FormState;

type ContactFormProps = {
  nameRef?: RefObject<HTMLInputElement | null>;
  emailRef?: RefObject<HTMLInputElement | null>;
  messageRef?: RefObject<HTMLTextAreaElement | null>;
  onFocusField?: (field: ContactField) => void;
  onBlurField?: (field: ContactField) => void;
  onInputField?: (field: ContactField) => void;
  onSubmitSuccess?: () => void;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({
  nameRef,
  emailRef,
  messageRef,
  onFocusField,
  onBlurField,
  onInputField,
  onSubmitSuccess,
}: ContactFormProps) {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const validate = (nextValues: FormState) => {
    const nextErrors: FormErrors = {};

    if (nextValues.name.trim().length < 2) {
      nextErrors.name = "Please enter at least 2 characters.";
    }
    if (!emailPattern.test(nextValues.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (nextValues.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters.";
    }

    return nextErrors;
  };

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setStatus("success");
      onSubmitSuccess?.();
    }
  };

  return (
    <form
      className="flex flex-col gap-6"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          ref={nameRef}
          value={values.name}
          onChange={(event) => {
            handleChange("name", event.target.value);
            onInputField?.("name");
          }}
          onFocus={() => onFocusField?.("name")}
          onBlur={() => onBlurField?.("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        {errors.name ? (
          <p id="name-error" className="text-xs text-accent-2">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          ref={emailRef}
          value={values.email}
          onChange={(event) => {
            handleChange("email", event.target.value);
            onInputField?.("email");
          }}
          onFocus={() => onFocusField?.("email")}
          onBlur={() => onBlurField?.("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        {errors.email ? (
          <p id="email-error" className="text-xs text-accent-2">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          ref={messageRef}
          value={values.message}
          onChange={(event) => {
            handleChange("message", event.target.value);
            onInputField?.("message");
          }}
          onFocus={() => onFocusField?.("message")}
          onBlur={() => onBlurField?.("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="resize-none rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        {errors.message ? (
          <p id="message-error" className="text-xs text-accent-2">
            {errors.message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-background transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          Send message
        </button>
        <p
          className="text-xs text-muted"
          aria-live="polite"
          role="status"
        >
          {status === "success"
            ? "Message captured. Hook up the form to an API route when ready."
            : "We reply within two business days."}
        </p>
      </div>
    </form>
  );
}
