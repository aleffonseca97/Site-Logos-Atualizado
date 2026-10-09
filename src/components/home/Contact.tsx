"use client";

import { FormEvent, useState } from "react";
import { projectTypeIds } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";
import { translateError } from "@/i18n/translate-error";

export function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          projectType: data.get("projectType"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "save_message_failed");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "unexpected");
    }
  }

  return (
    <section id="contatti" className="bg-white text-black">
      <div className="section container-wide">
        <hr className="hairline-dark mb-10" />
        <h2 className="display display-lg max-w-[14ch]">{t.contact.title}</h2>
        <hr className="hairline-dark mt-10" />

        <p className="mt-8 max-w-2xl text-base text-black/70 md:text-lg">{t.contact.text}</p>

        <form onSubmit={onSubmit} className="mt-10 grid max-w-3xl gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t.contact.name} name="name" required />
            <Field label={t.contact.email} name="email" type="email" required />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t.contact.company} name="company" />
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-black/45">
                {t.contact.projectType}
              </span>
              <select
                name="projectType"
                className="w-full rounded-none border-0 border-b border-black/20 bg-transparent py-3 outline-none focus:border-[var(--color-blue)]"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  {t.contact.select}
                </option>
                {projectTypeIds.map((type) => (
                  <option key={type} value={type}>
                    {t.projectTypes[type]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-black/45">
              {t.contact.description}
            </span>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full resize-y rounded-none border-0 border-b border-black/20 bg-transparent py-3 outline-none focus:border-[var(--color-blue)]"
            />
          </label>

          <label className="flex items-start gap-3 text-sm text-black/65">
            <input type="checkbox" name="consent" required className="mt-1" />
            <span>{t.contact.consent}</span>
          </label>

          <div className="pt-2">
            <Button type="submit" variant="blue" disabled={status === "loading"} arrow>
              {status === "loading" ? t.contact.sending : t.contact.submit}
            </Button>
          </div>

          {status === "success" ? (
            <p className="text-sm text-[var(--color-blue)]" role="status">
              {t.contact.success}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-red-600" role="alert">
              {translateError(error, t.errors)}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-black/45">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-none border-0 border-b border-black/20 bg-transparent py-3 outline-none focus:border-[var(--color-blue)]"
      />
    </label>
  );
}
