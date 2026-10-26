"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { ContactResponse } from "@/lib/contact-schema";
import { budgetRanges, projectTypes } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const fieldBase =
  "w-full rounded-xl bg-surface-2 px-4 py-3 text-base text-bright ring-1 ring-line-strong ring-inset outline-none transition-colors placeholder:text-faint hover:ring-faint/60 focus:ring-2 focus:ring-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFormError(null);
    setFieldErrors({});

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body: ContactResponse = await res.json();

      if (body.ok) {
        setStatus("sent");
        return;
      }

      setStatus("error");
      setFormError(body.message);
      setFieldErrors(body.fieldErrors ?? {});
    } catch {
      setStatus("error");
      setFormError(
        "Couldn't reach the server. Check your connection, or email us directly.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-2xl bg-surface p-8 ring-1 ring-accent/30 ring-inset sm:p-10"
      >
        <CheckCircle2 className="size-10 text-accent" />
        <h2 className="text-2xl font-semibold">Message sent</h2>
        <p className="text-base leading-relaxed text-muted">
          Thanks — we&apos;ve got it. You&apos;ll hear back within one working day,
          usually sooner. If it&apos;s urgent, WhatsApp is the fastest way to reach
          us.
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setStatus("idle")}
          className="mt-2"
        >
          Send another message
        </Button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-2xl bg-surface p-7 ring-1 ring-line ring-inset sm:p-9"
    >
      {formError ? (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300 ring-1 ring-red-500/25 ring-inset"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {formError}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" errors={fieldErrors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ayesha Rahman"
            className={fieldBase}
          />
        </Field>

        <Field label="Email" name="email" errors={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldBase}
          />
        </Field>
      </div>

      <Field
        label="Company"
        name="company"
        optional
        errors={fieldErrors.company}
      >
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Your business name"
          className={fieldBase}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Project type"
          name="projectType"
          errors={fieldErrors.projectType}
        >
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={cn(fieldBase, "appearance-none")}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget range" name="budget" errors={fieldErrors.budget}>
          <select
            id="budget"
            name="budget"
            required
            defaultValue=""
            className={cn(fieldBase, "appearance-none")}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="What do you need built?"
        name="message"
        hint="What the business does, what the site or app has to do, and any deadline."
        errors={fieldErrors.message}
      >
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={20}
          placeholder="We sell handmade furniture and take orders over WhatsApp. We need a store that handles stock and cash on delivery…"
          className={cn(fieldBase, "resize-y")}
        />
      </Field>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <Button type="submit" size="lg" disabled={sending}>
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
        <p className="text-sm text-faint">
          We reply within one working day. No newsletter, no sales sequence.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  hint,
  optional,
  errors,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  optional?: boolean;
  errors?: string[];
  children: React.ReactNode;
}) {
  const errorId = `${name}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="flex items-center gap-2 text-sm font-medium text-bright"
      >
        {label}
        {optional ? (
          <span className="text-xs font-normal text-faint">optional</span>
        ) : null}
      </label>
      {hint ? <p className="text-xs text-faint">{hint}</p> : null}
      {children}
      {errors?.length ? (
        <p id={errorId} role="alert" className="text-xs text-red-300">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}
