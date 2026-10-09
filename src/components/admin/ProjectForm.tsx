"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "./FileUpload";
import { parseJsonArray } from "@/lib/slug";
import { useI18n } from "@/i18n/I18nProvider";
import { translateError } from "@/i18n/translate-error";

type ClientOption = { id: string; name: string };

type ProjectData = {
  id?: string;
  title: string;
  slug?: string;
  clientId?: string | null;
  category?: string | null;
  shortDescription?: string | null;
  challenge?: string | null;
  solution?: string | null;
  services?: string;
  technologies?: string;
  externalUrl?: string | null;
  coverUrl?: string | null;
  status: string;
  isFeatured: boolean;
  showInHome: boolean;
  showInCarousel: boolean;
  sortOrder: number;
  images?: { url: string; alt?: string | null }[];
};

export function ProjectForm({
  initial,
  clients,
}: {
  initial?: ProjectData;
  clients: ClientOption[];
}) {
  const router = useRouter();
  const { t } = useI18n();
  const [coverUrl, setCoverUrl] = useState<string | null>(initial?.coverUrl || null);
  const [gallery, setGallery] = useState<string[]>(
    initial?.images?.map((image) => image.url) || [],
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);

    const payload = {
      title: String(form.get("title") || ""),
      slug: String(form.get("slug") || "") || undefined,
      clientId: String(form.get("clientId") || "") || null,
      category: String(form.get("category") || "") || null,
      shortDescription: String(form.get("shortDescription") || "") || null,
      challenge: String(form.get("challenge") || "") || null,
      solution: String(form.get("solution") || "") || null,
      services: String(form.get("services") || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      technologies: String(form.get("technologies") || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      externalUrl: String(form.get("externalUrl") || "") || null,
      coverUrl,
      status: String(form.get("status") || "draft"),
      isFeatured: form.get("isFeatured") === "on",
      showInHome: form.get("showInHome") === "on",
      showInCarousel: form.get("showInCarousel") === "on",
      sortOrder: Number(form.get("sortOrder") || 0),
      gallery: gallery.map((url, index) => ({ url, sortOrder: index })),
    };

    const response = await fetch(
      initial?.id ? `/api/admin/projects/${initial.id}` : "/api/admin/projects",
      {
        method: initial?.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    setLoading(false);
    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "save_failed");
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  }

  async function deleteProject() {
    if (!initial?.id) return;
    if (!confirm(t.admin.projects.confirmDelete)) return;
    const response = await fetch(`/api/admin/projects/${initial.id}`, { method: "DELETE" });
    if (response.ok) {
      router.push("/admin/projects");
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSubmit} className="admin-card space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="admin-label">{t.admin.projects.titleField}</span>
          <input name="title" required className="admin-input" defaultValue={initial?.title} />
        </label>
        <label className="block">
          <span className="admin-label">{t.admin.projects.slug}</span>
          <input name="slug" className="admin-input" defaultValue={initial?.slug || ""} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="admin-label">{t.admin.projects.client}</span>
          <select name="clientId" className="admin-select" defaultValue={initial?.clientId || ""}>
            <option value="">{t.admin.projects.noClient}</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="admin-label">{t.admin.projects.category}</span>
          <input
            name="category"
            className="admin-input"
            defaultValue={initial?.category || ""}
          />
        </label>
      </div>

      <label className="block">
        <span className="admin-label">{t.admin.projects.shortDescription}</span>
        <textarea
          name="shortDescription"
          className="admin-textarea"
          defaultValue={initial?.shortDescription || ""}
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="admin-label">{t.admin.projects.challenge}</span>
          <textarea
            name="challenge"
            className="admin-textarea"
            defaultValue={initial?.challenge || ""}
          />
        </label>
        <label className="block">
          <span className="admin-label">{t.admin.projects.solution}</span>
          <textarea
            name="solution"
            className="admin-textarea"
            defaultValue={initial?.solution || ""}
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="admin-label">{t.admin.projects.services}</span>
          <textarea
            name="services"
            className="admin-textarea"
            defaultValue={parseJsonArray(initial?.services).join("\n")}
          />
        </label>
        <label className="block">
          <span className="admin-label">{t.admin.projects.technologies}</span>
          <textarea
            name="technologies"
            className="admin-textarea"
            defaultValue={parseJsonArray(initial?.technologies).join("\n")}
          />
        </label>
      </div>

      <label className="block">
        <span className="admin-label">{t.admin.projects.externalUrl}</span>
        <input
          name="externalUrl"
          type="url"
          className="admin-input"
          defaultValue={initial?.externalUrl || ""}
        />
      </label>

      <FileUpload label={t.admin.projects.cover} value={coverUrl} prefix="cover" onChange={setCoverUrl} />

      <div>
        <span className="admin-label">{t.admin.projects.gallery}</span>
        <div className="mb-3 flex flex-wrap gap-3">
          {gallery.map((url) => (
            <button
              key={url}
              type="button"
              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/70"
              onClick={() => setGallery((items) => items.filter((item) => item !== url))}
            >
              {t.admin.projects.removeImage}
            </button>
          ))}
        </div>
        <FileUpload
          label={t.admin.projects.addImage}
          value={null}
          prefix="gallery"
          onChange={(url) => {
            if (url) setGallery((items) => [...items, url]);
          }}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="admin-label">{t.admin.projects.status}</span>
          <select name="status" className="admin-select" defaultValue={initial?.status || "draft"}>
            <option value="draft">{t.admin.projects.draft}</option>
            <option value="published">{t.admin.projects.published}</option>
          </select>
        </label>
        <label className="block">
          <span className="admin-label">{t.admin.projects.sortOrder}</span>
          <input
            name="sortOrder"
            type="number"
            className="admin-input"
            defaultValue={initial?.sortOrder ?? 0}
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-5 text-sm">
        <label className="flex items-center gap-2">
          <input name="isFeatured" type="checkbox" defaultChecked={initial?.isFeatured} />
          {t.admin.projects.featured}
        </label>
        <label className="flex items-center gap-2">
          <input name="showInHome" type="checkbox" defaultChecked={initial?.showInHome ?? true} />
          {t.admin.projects.showHome}
        </label>
        <label className="flex items-center gap-2">
          <input
            name="showInCarousel"
            type="checkbox"
            defaultChecked={initial?.showInCarousel}
          />
          {t.admin.projects.showCarousel}
        </label>
      </div>

      {error ? <p className="text-sm text-red-400">{translateError(error, t.errors)}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="pill-btn pill-btn-blue" disabled={loading}>
          {loading ? t.admin.projects.saving : t.admin.projects.save}
        </button>
        {initial?.id ? (
          <button type="button" className="pill-btn pill-btn-ghost" onClick={deleteProject}>
            {t.admin.projects.delete}
          </button>
        ) : null}
        {initial?.slug && initial.status === "published" ? (
          <a
            href={`/progetti/${initial.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-white"
          >
            {t.admin.projects.preview}
          </a>
        ) : null}
      </div>
    </form>
  );
}
