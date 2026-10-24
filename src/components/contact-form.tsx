"use client";

import { useState } from "react";
import { z } from "zod";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const topics = ["Internship", "Mentoring", "Collaboration", "Something else"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  topic: z.enum(topics),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(2000, "Please keep it under 2000 characters."),
});

type Field = keyof z.infer<typeof schema>;
type Status = "idle" | "sending" | "sent" | "error" | "mailto";

const inputClass =
  "mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent aria-[invalid=true]:border-red-500";

export function ContactForm({ formId }: { formId?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // 1. Honeypot check: real visitors never see or fill this field.
    if (String(data.get("_gotcha") ?? "") !== "") {
      setStatus("sent");
      return;
    }

    // 2. Validate input fields with Zod schema first
    const parsed = schema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      topic: data.get("topic"),
      message: data.get("message"),
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        topic: fieldErrors.topic?.[0],
        message: fieldErrors.message?.[0],
      });
      // Move keyboard and screen-reader focus to the first field that needs fixing.
      const firstInvalid = (["name", "email", "topic", "message"] as const).find((f) => fieldErrors[f]?.[0]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      setStatus("idle");
      return;
    }
    setErrors({});

    // 3. Fallback: If no formId is passed, open mailto link
    if (!formId) {
      const { name, email, topic, message } = parsed.data;
      const body = `${message}\n\n— ${name} (${email})`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`[${topic}] from ${name}`)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    // 4. Send successfully validated data to Formspree using FormData (avoids CORS issues)
    setStatus("sending");
    try {
      const formData = new FormData();
      formData.append("name", parsed.data.name);
      formData.append("email", parsed.data.email);
      formData.append("topic", parsed.data.topic);
      formData.append("message", parsed.data.message);
      // Formspree uses this as the subject line of the email you receive.
      formData.append("_subject", `[${parsed.data.topic}] message from ${parsed.data.name} via your website`);

      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border border-border bg-card p-6">
        <p className="font-semibold">Thank you, your message is on its way.</p>
        <p className="mt-1 text-sm text-muted-foreground">I&apos;ll reply as soon as I can.</p>
      </div>
    );
  }

  const fieldError = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
        {errors[f]}
      </p>
    ) : null;

  const aria = (f: Field) => ({
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${f}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" className={inputClass} {...aria("name")} />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClass} {...aria("email")} />
          {fieldError("email")}
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="text-sm font-medium">
          What is this about?
        </label>
        <select id="topic" name="topic" defaultValue={topics[0]} className={inputClass} {...aria("topic")}>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {fieldError("topic")}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea id="message" name="message" rows={6} className={cn(inputClass, "resize-y")} {...aria("message")} />
        {fieldError("message")}
      </div>

      {/* Honeypot field, hidden from people and screen readers */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : formId ? "Send message" : "Open in my email app"}
        </button>
        {status === "mailto" && (
          <p role="status" className="text-sm text-muted-foreground">
            Your email app should open with the message filled in. If nothing happens, email me at{" "}
            <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            Something went wrong. Please email me directly at{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}