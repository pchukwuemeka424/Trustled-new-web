"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { PageImage, PageSection } from "@/lib/mongodb";
import { emptySection, labelFromHtml } from "@/lib/sections";

type PublicPage = {
  slug: string;
  title: string;
  description: string;
  bodyHtml: string;
  sections: PageSection[];
  heroImage?: string;
  images: PageImage[];
  published: boolean;
  updatedAt?: string;
};

type Props = {
  slug: string;
  label: string;
  path: string;
};

/** Text nodes made contentEditable. Buttons / CTAs are excluded in enableEditables(). */
const EDITABLE_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "li",
  "blockquote",
  "figcaption",
  "td",
  "th",
  ".eyebrow",
  ".hero-eyebrow",
  ".about-hero__brand",
  ".about-hero__eyebrow",
  ".lead",
  ".hero-description",
  ".about-hero__lead",
  ".tile-label",
  ".trust-label",
  ".stat-num",
  ".stat-label",
  ".small",
  ".more",
  ".link-arrow",
  ".tags span",
  ".chip",
  ".value-body p",
  ".value-body h3",
  ".cta-copy p",
  ".cta-copy h2",
  ".mission-copy p",
  ".mission-copy h2",
  ".mini-list span",
  ".service-card strong",
  ".service-card small",
  ".tile h3",
  ".tile p",
  ".fact b",
  ".fact small",
  "li.step p",
  "li.step h3",
  ".post-meta",
  ".breadcrumb",
].join(",");

const BUTTON_LIKE_SELECTOR =
  "button, .btn, .hero-btn, a.btn, a.hero-btn, .live-btn, .live-img-btn, .live-img-ctrl, svg";

function isButtonLike(el: HTMLElement) {
  if (el.closest(BUTTON_LIKE_SELECTOR)) return true;
  if (el.matches(BUTTON_LIKE_SELECTOR)) return true;
  return false;
}

type BlockFormat = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "ul" | "ol";

function copyEditableAttrs(from: HTMLElement, to: HTMLElement) {
  for (const attr of Array.from(from.attributes)) {
    if (attr.name === "contenteditable" || attr.name === "spellcheck") continue;
    if (attr.name === "data-live-editable") continue;
    to.setAttribute(attr.name, attr.value);
  }
}

function activateEditable(el: HTMLElement) {
  el.contentEditable = "true";
  el.spellcheck = true;
  el.dataset.liveEditable = "1";
}

function replaceBlockTag(el: HTMLElement, tag: string): HTMLElement {
  if (el.tagName.toLowerCase() === tag.toLowerCase()) return el;
  const next = document.createElement(tag);
  copyEditableAttrs(el, next);
  next.innerHTML = el.innerHTML;
  el.replaceWith(next);
  return next;
}

function unwrapListItem(li: HTMLElement): HTMLElement {
  const list = li.parentElement;
  const p = document.createElement("p");
  copyEditableAttrs(li, p);
  p.innerHTML = li.innerHTML;

  if (!list || (list.tagName !== "UL" && list.tagName !== "OL")) {
    li.replaceWith(p);
    return p;
  }

  if (list.children.length === 1) {
    list.replaceWith(p);
    return p;
  }

  const parent = list.parentNode;
  if (!parent) {
    li.replaceWith(p);
    return p;
  }

  const after = document.createElement(list.tagName);
  let seen = false;
  for (const child of Array.from(list.children)) {
    if (child === li) {
      seen = true;
      continue;
    }
    if (seen) after.appendChild(child);
  }

  parent.insertBefore(p, list.nextSibling);
  if (after.children.length) parent.insertBefore(after, p.nextSibling);
  li.remove();
  if (!list.children.length) list.remove();
  return p;
}

function toListItem(el: HTMLElement, listTag: "ul" | "ol"): HTMLElement {
  const currentList = el.closest("ul, ol");
  if (el.tagName === "LI" && currentList) {
    if (currentList.tagName.toLowerCase() === listTag) {
      return unwrapListItem(el);
    }
    const index = Array.from(currentList.children).indexOf(el);
    const nextList = document.createElement(listTag);
    nextList.innerHTML = currentList.innerHTML;
    currentList.replaceWith(nextList);
    return (
      (nextList.children[Math.max(0, index)] as HTMLElement) ||
      (nextList.firstElementChild as HTMLElement)
    );
  }

  const list = document.createElement(listTag);
  const li = document.createElement("li");
  copyEditableAttrs(el, li);
  li.innerHTML = el.innerHTML;
  list.appendChild(li);
  el.replaceWith(list);
  return li;
}

function applyBlockFormat(el: HTMLElement, format: BlockFormat): HTMLElement {
  if (format === "ul" || format === "ol") {
    return toListItem(el, format);
  }

  let target = el;
  if (target.tagName === "LI") {
    target = unwrapListItem(target);
  }
  return replaceBlockTag(target, format);
}

function getBlockFormat(el: HTMLElement): BlockFormat {
  const list = el.closest("ul, ol");
  if (el.tagName === "LI" && list) {
    return list.tagName === "OL" ? "ol" : "ul";
  }
  const tag = el.tagName.toLowerCase();
  if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4" || tag === "h5") {
    return tag;
  }
  return "p";
}

function runInlineCommand(command: "bold" | "italic" | "underline") {
  try {
    document.execCommand(command, false);
  } catch {
    /* ignore */
  }
}

function FormatToolbar({
  target,
  onApplied,
}: {
  target: HTMLElement | null;
  onApplied: (next: HTMLElement) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [format, setFormat] = useState<BlockFormat>("p");
  const [marks, setMarks] = useState({ bold: false, italic: false, underline: false });

  const refresh = useCallback(() => {
    if (!target || !document.contains(target)) {
      setPos(null);
      return;
    }
    const rect = target.getBoundingClientRect();
    const barW = barRef.current?.offsetWidth || 480;
    const left = Math.min(
      Math.max(8, rect.left + rect.width / 2 - barW / 2),
      window.innerWidth - barW - 8,
    );
    const above = rect.top - 52;
    const top = above < 56 ? rect.bottom + 8 : above;
    setPos({ top, left });
    setFormat(getBlockFormat(target));
    setMarks({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  }, [target]);

  useEffect(() => {
    refresh();
    if (!target) return;
    const onScroll = () => refresh();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    document.addEventListener("selectionchange", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("selectionchange", onScroll);
    };
  }, [target, refresh]);

  if (!target || !pos) return null;

  const preventBlur = (e: ReactMouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
      ref={barRef}
      className="live-format-bar"
      style={{ top: pos.top, left: pos.left }}
      onMouseDown={preventBlur}
      role="toolbar"
      aria-label="Text formatting"
    >
      <select
        className="live-format-bar__select"
        value={format === "ul" || format === "ol" ? "p" : format}
        aria-label="Block style"
        onChange={(e) => {
          const next = applyBlockFormat(target, e.target.value as BlockFormat);
          activateEditable(next);
          next.focus();
          onApplied(next);
        }}
      >
        <option value="p">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="h5">Heading 5</option>
      </select>

      <span className="live-format-bar__sep" aria-hidden="true" />

      {(["h1", "h2", "h3", "h4", "h5"] as const).map((tag) => (
        <button
          key={tag}
          type="button"
          className={`live-format-bar__btn${format === tag ? " is-active" : ""}`}
          title={`Heading ${tag.slice(1)}`}
          aria-pressed={format === tag}
          onClick={() => {
            const next = applyBlockFormat(target, tag);
            activateEditable(next);
            next.focus();
            onApplied(next);
          }}
        >
          {tag.toUpperCase()}
        </button>
      ))}

      <span className="live-format-bar__sep" aria-hidden="true" />

      <button
        type="button"
        className={`live-format-bar__btn${format === "ul" ? " is-active" : ""}`}
        title="Bullet list"
        aria-pressed={format === "ul"}
        onClick={() => {
          const next = applyBlockFormat(target, "ul");
          activateEditable(next);
          next.focus();
          onApplied(next);
        }}
      >
        • List
      </button>
      <button
        type="button"
        className={`live-format-bar__btn${format === "ol" ? " is-active" : ""}`}
        title="Numbered list"
        aria-pressed={format === "ol"}
        onClick={() => {
          const next = applyBlockFormat(target, "ol");
          activateEditable(next);
          next.focus();
          onApplied(next);
        }}
      >
        1. List
      </button>

      <span className="live-format-bar__sep" aria-hidden="true" />

      <button
        type="button"
        className={`live-format-bar__btn live-format-bar__btn--mark${marks.bold ? " is-active" : ""}`}
        title="Bold"
        aria-pressed={marks.bold}
        onClick={() => {
          target.focus();
          runInlineCommand("bold");
          onApplied(target);
        }}
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        className={`live-format-bar__btn live-format-bar__btn--mark${marks.italic ? " is-active" : ""}`}
        title="Italic"
        aria-pressed={marks.italic}
        onClick={() => {
          target.focus();
          runInlineCommand("italic");
          onApplied(target);
        }}
      >
        <em>I</em>
      </button>
      <button
        type="button"
        className={`live-format-bar__btn live-format-bar__btn--mark${marks.underline ? " is-active" : ""}`}
        title="Underline"
        aria-pressed={marks.underline}
        onClick={() => {
          target.focus();
          runInlineCommand("underline");
          onApplied(target);
        }}
      >
        <span style={{ textDecoration: "underline" }}>U</span>
      </button>
    </div>
  );
}

function cleanClone(frame: HTMLElement) {
  const clone = frame.cloneNode(true) as HTMLElement;
  clone.querySelectorAll(".live-img-ctrl").forEach((el) => el.remove());
  clone.querySelectorAll(".live-img-host").forEach((el) => {
    el.classList.remove("live-img-host");
  });
  clone.querySelectorAll("[contenteditable]").forEach((el) => {
    el.removeAttribute("contenteditable");
    el.removeAttribute("spellcheck");
    el.removeAttribute("data-live-editable");
  });
  clone.querySelectorAll("a[tabindex='-1']").forEach((el) => {
    el.removeAttribute("tabindex");
  });
  return clone;
}

function serializeFrame(frame: HTMLElement) {
  const clone = cleanClone(frame);
  const section = clone.querySelector(":scope > section");
  if (section) return section.outerHTML;
  const first = clone.firstElementChild;
  if (first) return first.outerHTML;
  return clone.innerHTML.trim();
}

async function uploadImageFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return String(data.url);
}

function applyImageToHost(host: HTMLElement, url: string) {
  if (host.classList.contains("ph")) {
    const alt =
      host.textContent?.replace(/[\[\]]/g, "").replace(/^Photo:\s*/i, "").trim() ||
      "Uploaded image";
    host.innerHTML = "";
    const img = document.createElement("img");
    img.src = url;
    img.alt = alt;
    img.style.cssText =
      "width:100%;height:100%;object-fit:cover;display:block;min-height:inherit;border-radius:inherit";
    host.appendChild(img);
    host.classList.add("ph--has-image");
    return;
  }

  if (host.tagName === "IMG") {
    (host as HTMLImageElement).src = url;
    return;
  }

  const existing = host.querySelector("img");
  if (existing) {
    existing.src = url;
    return;
  }

  const img = document.createElement("img");
  img.src = url;
  img.alt = "Uploaded image";
  img.style.cssText = "width:100%;height:auto;display:block";
  host.appendChild(img);
}

function mountImageControls(
  root: HTMLElement,
  onUpload: (file: File, host: HTMLElement) => Promise<void>,
) {
  root.querySelectorAll(".live-img-ctrl").forEach((el) => el.remove());
  root.querySelectorAll(".live-img-host").forEach((el) => {
    el.classList.remove("live-img-host");
  });

  const hosts = new Set<HTMLElement>();

  root.querySelectorAll(".ph").forEach((node) => {
    hosts.add(node as HTMLElement);
  });

  root.querySelectorAll("img").forEach((node) => {
    const img = node as HTMLImageElement;
    const ph = img.closest(".ph") as HTMLElement | null;
    if (ph) {
      hosts.add(ph);
      return;
    }
    // Skip tiny decorative marks under ~40px if already loaded; still allow if unknown
    hosts.add(img);
  });

  hosts.forEach((host) => {
    host.classList.add("live-img-host");

    const ctrl = document.createElement("div");
    ctrl.className = "live-img-ctrl";
    ctrl.contentEditable = "false";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "live-img-btn";
    button.textContent = host.classList.contains("ph") && !host.querySelector("img")
      ? "Upload image"
      : "Replace image";

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.hidden = true;

    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      input.click();
    });

    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      input.value = "";
      if (!file) return;
      button.disabled = true;
      const prev = button.textContent;
      button.textContent = "Uploading…";
      try {
        await onUpload(file, host);
        button.textContent = "Replace image";
      } catch {
        button.textContent = prev || "Upload image";
      } finally {
        button.disabled = false;
      }
    });

    ctrl.appendChild(button);
    ctrl.appendChild(input);
    host.appendChild(ctrl);
  });
}

function LiveSection({
  section,
  index,
  active,
  onSelect,
  onHtmlChange,
  onImageUploaded,
  onImageError,
}: {
  section: PageSection;
  index: number;
  active: boolean;
  onSelect: () => void;
  onHtmlChange: (html: string) => void;
  onImageUploaded: (url: string, file: File) => void;
  onImageError: (message: string) => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const lastHtml = useRef(section.html);
  const editing = useRef(false);
  const applyingFormat = useRef(false);
  const [formatTarget, setFormatTarget] = useState<HTMLElement | null>(null);

  const commit = useCallback(() => {
    const root = frameRef.current;
    if (!root) return;
    const next = serializeFrame(root);
    if (next === lastHtml.current) return;
    lastHtml.current = next;
    onHtmlChange(next);
  }, [onHtmlChange]);

  const enableEditables = useCallback(() => {
    const root = frameRef.current;
    if (!root) return;

    root.querySelectorAll("[data-live-editable]").forEach((node) => {
      const el = node as HTMLElement;
      el.removeAttribute("contenteditable");
      el.removeAttribute("data-live-editable");
    });

    root.querySelectorAll(EDITABLE_SELECTOR).forEach((node) => {
      const el = node as HTMLElement;
      if (isButtonLike(el)) return;

      const nested = el.querySelector(EDITABLE_SELECTOR);
      if (nested && !isButtonLike(nested as HTMLElement)) return;

      activateEditable(el);
    });

    root.querySelectorAll(BUTTON_LIKE_SELECTOR).forEach((node) => {
      const el = node as HTMLElement;
      el.contentEditable = "false";
      el.removeAttribute("data-live-editable");
    });

    root.querySelectorAll("a").forEach((anchor) => {
      anchor.setAttribute("tabindex", "-1");
    });
  }, []);

  const wireImages = useCallback(() => {
    const root = frameRef.current;
    if (!root) return;

    const handleUpload = async (file: File, host: HTMLElement) => {
      try {
        const url = await uploadImageFile(file);
        applyImageToHost(host, url);
        onImageUploaded(url, file);
        commit();
        mountImageControls(root, handleUpload);
        enableEditables();
      } catch (e) {
        onImageError(e instanceof Error ? e.message : "Upload failed");
        throw e;
      }
    };

    mountImageControls(root, handleUpload);
  }, [commit, enableEditables, onImageUploaded, onImageError]);

  useEffect(() => {
    const root = frameRef.current;
    if (!root) return;

    const shouldPaint =
      !root.innerHTML || (section.html !== lastHtml.current && !editing.current);

    if (shouldPaint) {
      root.innerHTML = section.html;
      lastHtml.current = section.html;
      setFormatTarget(null);
    }

    root
      .querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-down, .reveal-stagger, .reveal-hero, .title-anim",
      )
      .forEach((el) => el.classList.add("is-visible"));

    enableEditables();
    wireImages();
  }, [section.html, enableEditables, wireImages]);

  const onFormatApplied = useCallback(
    (next: HTMLElement) => {
      applyingFormat.current = true;
      editing.current = true;
      enableEditables();
      wireImages();
      activateEditable(next);
      setFormatTarget(next);
      requestAnimationFrame(() => {
        if (document.contains(next)) {
          activateEditable(next);
          next.focus();
        }
        commit();
        applyingFormat.current = false;
      });
    },
    [commit, enableEditables, wireImages],
  );

  return (
    <div
      className={`live-section${active ? " is-active" : ""}`}
      data-section-id={section.id}
      onMouseDown={(e) => {
        if ((e.target as HTMLElement).closest(".live-img-ctrl")) return;
        if ((e.target as HTMLElement).closest(".live-format-bar")) return;
        if ((e.target as HTMLElement).closest("[contenteditable='true']")) return;
        onSelect();
      }}
      onFocusCapture={(e) => {
        editing.current = true;
        onSelect();
        const el = (e.target as HTMLElement).closest(
          "[contenteditable='true']",
        ) as HTMLElement | null;
        if (el && frameRef.current?.contains(el)) {
          setFormatTarget(el);
        }
      }}
      onBlurCapture={(e) => {
        if (applyingFormat.current) return;
        const next = e.relatedTarget as Node | null;
        if (next && frameRef.current?.contains(next)) return;
        if (next && (next as HTMLElement).closest?.(".live-format-bar")) return;
        window.setTimeout(() => {
          if (applyingFormat.current) return;
          const activeEl = document.activeElement as HTMLElement | null;
          if (activeEl && frameRef.current?.contains(activeEl)) return;
          if (activeEl?.closest?.(".live-format-bar")) return;
          editing.current = false;
          setFormatTarget(null);
          commit();
        }, 80);
      }}
      onClick={(e) => {
        const anchor = (e.target as HTMLElement).closest("a");
        if (anchor) e.preventDefault();
      }}
    >
      <button
        type="button"
        className="live-section__badge"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        Section {index + 1}
        <span aria-hidden="true">·</span>
        {section.label || `Section ${index + 1}`}
      </button>
      <div ref={frameRef} className="live-section__html" />
      <FormatToolbar target={formatTarget} onApplied={onFormatApplied} />
    </div>
  );
}

export function LiveEditor({ slug, label, path }: Props) {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [draft, setDraft] = useState<PublicPage | null>(null);
  const [activeId, setActiveId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [showSeo, setShowSeo] = useState(false);
  const [showHtml, setShowHtml] = useState(false);
  const [uploading, setUploading] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const activeSection = useMemo(() => {
    if (!draft) return null;
    return draft.sections.find((s) => s.id === activeId) || draft.sections[0] || null;
  }, [draft, activeId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const session = await fetch("/api/admin/session").then((r) => r.json());
      if (cancelled) return;
      if (!session.authenticated) {
        setAuthed(false);
        setLoading(false);
        return;
      }
      setAuthed(true);
      try {
        const res = await fetch(`/api/admin/pages/${slug}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load page");
        if (cancelled) return;
        const page = data.page as PublicPage;
        const sections =
          page.sections?.length > 0
            ? page.sections
            : [
                {
                  id: crypto.randomUUID(),
                  label: labelFromHtml(page.bodyHtml || "", 0),
                  html: page.bodyHtml || emptySection(0).html,
                },
              ];
        setDraft({ ...page, sections, images: page.images || [] });
        setActiveId(sections[0]?.id || "");
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load page");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  function updateSections(next: PageSection[]) {
    if (!draft) return;
    setDraft({
      ...draft,
      sections: next,
      bodyHtml: next.map((s) => s.html.trim()).filter(Boolean).join("\n\n"),
    });
    setStatus("Unsaved changes");
  }

  function updateSectionHtml(id: string, html: string) {
    if (!draft) return;
    updateSections(
      draft.sections.map((section, index) =>
        section.id === id
          ? { ...section, html, label: labelFromHtml(html, index) }
          : section,
      ),
    );
  }

  function trackUploadedImage(url: string, file: File) {
    setDraft((prev) => {
      if (!prev) return prev;
      const image: PageImage = {
        id: crypto.randomUUID(),
        url,
        alt: file.name,
        label: file.name,
      };
      return { ...prev, images: [...(prev.images || []), image] };
    });
    setStatus("Image uploaded — remember to Save");
    setError("");
  }

  async function uploadHeroImage(file: File) {
    setUploading(true);
    setError("");
    try {
      const url = await uploadImageFile(file);
      setDraft((prev) => {
        if (!prev) return prev;
        const image: PageImage = {
          id: crypto.randomUUID(),
          url,
          alt: file.name,
          label: file.name,
        };
        return {
          ...prev,
          heroImage: url,
          images: [...(prev.images || []), image],
        };
      });
      setStatus("Hero image uploaded — remember to Save");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function scrollToSection(id: string) {
    setActiveId(id);
    const el = canvasRef.current?.querySelector(`[data-section-id="${id}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function addSection() {
    if (!draft) return;
    const section = emptySection(draft.sections.length);
    const next = [...draft.sections, section];
    updateSections(next);
    setActiveId(section.id);
    setTimeout(() => scrollToSection(section.id), 50);
  }

  function removeActiveSection() {
    if (!draft || !activeSection) return;
    if (draft.sections.length <= 1) {
      setError("A page needs at least one section");
      return;
    }
    if (!window.confirm("Delete this section?")) return;
    const next = draft.sections.filter((s) => s.id !== activeSection.id);
    updateSections(next);
    setActiveId(next[0]?.id || "");
  }

  function moveActive(direction: -1 | 1) {
    if (!draft || !activeSection) return;
    const index = draft.sections.findIndex((s) => s.id === activeSection.id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= draft.sections.length) return;
    const next = [...draft.sections];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    updateSections(next);
  }

  async function onSave() {
    if (!draft) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/pages/${draft.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setDraft(data.page);
      if (data.page.sections?.[0]) {
        const still = data.page.sections.some((s: PageSection) => s.id === activeId);
        if (!still) setActiveId(data.page.sections[0].id);
      }
      setStatus("Saved");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
      setStatus("");
    } finally {
      setSaving(false);
    }
  }

  async function onReset() {
    if (!draft) return;
    if (!window.confirm("Reset this page to default content?")) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/pages/${draft.slug}/reset`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Reset failed");
      setDraft(data.page);
      setActiveId(data.page.sections?.[0]?.id || "");
      setStatus("Reset to defaults");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reset failed");
    } finally {
      setSaving(false);
    }
  }

  if (authed === false) {
    router.replace("/admin");
    return (
      <div className="live-shell">
        <div className="live-loading">Redirecting to sign in…</div>
      </div>
    );
  }

  if (loading || !draft) {
    return (
      <div className="live-shell">
        <div className="live-loading">{error || "Loading live editor…"}</div>
      </div>
    );
  }

  return (
    <div className="live-shell">
      <div className="live-bar">
        <div className="live-bar__brand">
          <strong>{label}</strong>
          <span>
            Live edit · {path} · {draft.sections.length} sections
          </span>
        </div>
        <div className="live-bar__actions">
          <span className={`live-status${error ? " is-err" : status === "Saved" ? " is-ok" : ""}`}>
            {error || status || "Ready"}
          </span>
          <label className="live-check">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) => {
                setDraft({ ...draft, published: e.target.checked });
                setStatus("Unsaved changes");
              }}
            />
            Published
          </label>
          <button className="live-btn live-btn--ghost" type="button" onClick={() => setShowSeo((v) => !v)}>
            SEO
          </button>
          <button className="live-btn live-btn--ghost" type="button" onClick={() => setShowHtml((v) => !v)}>
            HTML
          </button>
          <button className="live-btn live-btn--ghost" type="button" onClick={onReset} disabled={saving}>
            Reset
          </button>
          <Link className="live-btn live-btn--ghost" href={path} target="_blank">
            Preview
          </Link>
          <Link className="live-btn live-btn--ghost" href="/admin">
            All pages
          </Link>
          <button className="live-btn live-btn--primary" type="button" onClick={onSave} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="live-body">
        <aside className="live-rail">
          <div className="live-rail__head">
            <strong>Sections</strong>
            <button className="live-btn live-btn--primary" type="button" onClick={addSection}>
              Add
            </button>
          </div>
          <div className="live-rail__list">
            {draft.sections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                className={`live-rail__item${section.id === activeSection?.id ? " is-active" : ""}`}
                onClick={() => scrollToSection(section.id)}
              >
                <span>{index + 1}</span>
                <span>
                  <strong>{section.label || `Section ${index + 1}`}</strong>
                  <small>
                    {section.html.replace(/<[^>]+>/g, " ").trim().slice(0, 60) || "Empty"}
                  </small>
                </span>
              </button>
            ))}
          </div>
          {activeSection ? (
            <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
              <button className="live-btn" type="button" onClick={() => moveActive(-1)}>
                Move up
              </button>
              <button className="live-btn" type="button" onClick={() => moveActive(1)}>
                Move down
              </button>
              <button className="live-btn" type="button" onClick={removeActiveSection}>
                Delete section
              </button>
            </div>
          ) : null}
        </aside>

        <div className="live-canvas-wrap" ref={canvasRef}>
          <div className="live-hint-banner">
            Click text to edit in place · use H1–H5, lists & formatting · Save when done
          </div>
          <div className="live-section-strip" aria-label="Jump to section">
            {draft.sections.map((section, index) => (
              <button
                key={`strip-${section.id}`}
                type="button"
                className={`live-section-strip__btn${section.id === activeSection?.id ? " is-active" : ""}`}
                onClick={() => scrollToSection(section.id)}
              >
                {index + 1}. {section.label || `Section ${index + 1}`}
              </button>
            ))}
            <button type="button" className="live-section-strip__btn live-section-strip__add" onClick={addSection}>
              + Add section
            </button>
          </div>
          <div className="live-canvas">
            <Header />
            <main id="main">
              {draft.sections.map((section, index) => (
                <LiveSection
                  key={section.id}
                  section={section}
                  index={index}
                  active={section.id === activeSection?.id}
                  onSelect={() => setActiveId(section.id)}
                  onHtmlChange={(html) => updateSectionHtml(section.id, html)}
                  onImageUploaded={trackUploadedImage}
                  onImageError={(message) => setError(message)}
                />
              ))}
            </main>
            <Footer />
          </div>

          {showSeo ? (
            <div className="live-drawer">
              <h3>SEO & meta</h3>
              <div className="admin-field">
                <label htmlFor="live-title">Title</label>
                <input
                  id="live-title"
                  value={draft.title}
                  onChange={(e) => {
                    setDraft({ ...draft, title: e.target.value });
                    setStatus("Unsaved changes");
                  }}
                />
              </div>
              <div className="admin-field">
                <label htmlFor="live-desc">Description</label>
                <textarea
                  id="live-desc"
                  value={draft.description}
                  onChange={(e) => {
                    setDraft({ ...draft, description: e.target.value });
                    setStatus("Unsaved changes");
                  }}
                />
              </div>
              <div className="admin-field">
                <label htmlFor="live-hero">Hero / OG image URL</label>
                <input
                  id="live-hero"
                  value={draft.heroImage || ""}
                  onChange={(e) => {
                    setDraft({ ...draft, heroImage: e.target.value });
                    setStatus("Unsaved changes");
                  }}
                />
              </div>
              <label className="live-btn live-btn--primary" style={{ cursor: "pointer", marginBottom: 12 }}>
                {uploading ? "Uploading…" : "Upload hero image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadHeroImage(file);
                    e.target.value = "";
                  }}
                />
              </label>
              <button className="live-btn live-btn--ghost" type="button" onClick={() => setShowSeo(false)}>
                Close
              </button>
            </div>
          ) : null}

          {showHtml && activeSection ? (
            <div className="live-drawer">
              <h3>Section HTML</h3>
              <div className="admin-field">
                <label htmlFor="live-section-label">Section name</label>
                <input
                  id="live-section-label"
                  value={activeSection.label}
                  onChange={(e) => {
                    updateSections(
                      draft.sections.map((s) =>
                        s.id === activeSection.id ? { ...s, label: e.target.value } : s,
                      ),
                    );
                  }}
                />
              </div>
              <div className="admin-field">
                <label htmlFor="live-section-html">HTML</label>
                <textarea
                  id="live-section-html"
                  value={activeSection.html}
                  onChange={(e) => updateSectionHtml(activeSection.id, e.target.value)}
                />
              </div>
              <button className="live-btn live-btn--ghost" type="button" onClick={() => setShowHtml(false)}>
                Close
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
