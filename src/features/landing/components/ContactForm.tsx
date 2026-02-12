"use client";

import { useState, type FormEvent, type RefObject } from "react";
import type { Translations } from "@/i18n/translations";

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
  copy: Translations["contact"]["form"];
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = "idle" | "sending" | "success" | "error";

const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim(),
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim(),
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim(),
};

export function ContactForm({
  nameRef,
  emailRef,
  messageRef,
  onFocusField,
  onBlurField,
  onInputField,
  onSubmitSuccess,
  copy,
}: ContactFormProps) {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validate = (nextValues: FormState) => {
    const nextErrors: FormErrors = {};
    const nameValue = nextValues.name.trim();
    const emailValue = nextValues.email.trim();
    const messageValue = nextValues.message.trim();

    if (nameValue.length < 2) {
      nextErrors.name = copy.errors.name;
    }
    if (!emailPattern.test(emailValue)) {
      nextErrors.email = copy.errors.email;
    }
    if (messageValue.length < 10) {
      nextErrors.message = copy.errors.message;
    }

    return nextErrors;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setStatus((prev) => (prev === "sending" ? prev : "idle"));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") {
      return;
    }

    const sanitizedValues: FormState = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };
    const nextErrors = validate(sanitizedValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length !== 0) {
      return;
    }

    if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          service_id: emailJsConfig.serviceId,
          template_id: emailJsConfig.templateId,
          user_id: emailJsConfig.publicKey,
          template_params: {
            name: sanitizedValues.name,
            from_name: sanitizedValues.name,
            email: sanitizedValues.email,
            from_email: sanitizedValues.email,
            reply_to: sanitizedValues.email,
            message: sanitizedValues.message,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("EmailJS request failed");
      }

      setValues(initialState);
      setErrors({});
      setStatus("success");
      onSubmitSuccess?.();
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  };

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          {copy.labels.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          disabled={status === "sending"}
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
          {copy.labels.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={status === "sending"}
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
        <label htmlFor="message" className="text-sm font-semibold text-foreground">
          {copy.labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          disabled={status === "sending"}
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
          disabled={status === "sending"}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-background transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? copy.statusSending : copy.submit}
        </button>
        <p className="text-xs text-muted" aria-live="polite" role="status">
          {status === "success"
            ? copy.statusSuccess
            : status === "error"
              ? copy.statusError
              : status === "sending"
                ? copy.statusSending
                : copy.statusIdle}
        </p>
      </div>
    </form>
  );
}
