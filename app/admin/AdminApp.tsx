"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { PageMeta } from "@/lib/page-registry";

type PublicPage = {
  slug: string;
  title: string;
  description: string;
  sections: { id: string; label: string; html: string }[];
  published: boolean;
  updatedAt?: string;
};

const CORE_SLUGS = new Set([
  "home",
  "about",
  "services",
  "who-we-serve",
  "programmes",
  "impact",
  "insights",
  "contact",
]);

function formatUpdated(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function AdminApp() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [pages, setPages] = useState<PublicPage[]>([]);
  const [registry, setRegistry] = useState<PageMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function refreshSession() {
    const res = await fetch("/api/admin/session");
    const data = await res.json();
    setAuthed(Boolean(data.authenticated));
    return Boolean(data.authenticated);
  }

  async function loadPages() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/pages");
      if (!res.ok) throw new Error("Failed to load pages");
      const data = await res.json();
      setPages(data.pages || []);
      setRegistry(data.registry || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load pages");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshSession().then((ok) => {
      if (ok) loadPages();
    });
  }, []);

  const metaBySlug = useMemo(() => {
    return new Map(registry.map((r) => [r.slug, r]));
  }, [registry]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pages;
    return pages.filter((page) => {
      const meta = metaBySlug.get(page.slug);
      const hay = `${meta?.label || ""} ${page.slug} ${meta?.path || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [pages, query, metaBySlug]);

  const publishedCount = useMemo(
    () => pages.filter((page) => page.published).length,
    [pages],
  );

  const sidebarPages = useMemo(() => {
    const ordered = registry.length
      ? registry
      : pages.map((page) => ({
          slug: page.slug,
          label: page.slug,
          path: `/${page.slug === "home" ? "" : page.slug}`,
        }));
    return {
      core: ordered.filter((item) => CORE_SLUGS.has(item.slug)),
      more: ordered.filter((item) => !CORE_SLUGS.has(item.slug)),
    };
  }, [registry, pages]);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError("Incorrect password");
      return;
    }
    setPassword("");
    setAuthed(true);
    await loadPages();
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setPages([]);
  }

  if (authed === null) {
    return (
      <div className="admin-login">
        <div className="admin-card">Checking session…</div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="admin-login">
        <form className="admin-card" onSubmit={onLogin}>
          <h1>TrustLed Admin</h1>
          <p>Sign in to live-edit every section on the site.</p>
          {loginError ? <p className="admin-error">{loginError}</p> : null}
          <div className="admin-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="admin-btn admin-btn--primary" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={`admin-app${sidebarOpen ? " is-sidebar-open" : ""}`}>
      <button
        type="button"
        className="admin-sidebar-backdrop"
        aria-label="Close navigation"
        onClick={() => setSidebarOpen(false)}
      />

      <aside className="admin-sidebar" aria-label="Admin navigation">
        <div className="admin-sidebar-brand">
          <span className="admin-sidebar-mark" aria-hidden="true">
            T
          </span>
          <div>
            <strong>TrustLed Admin</strong>
            <span>Content CMS</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          <p className="admin-sidebar-label">Workspace</p>
          <button type="button" className="admin-nav-item is-active">
            <span className="admin-nav-icon" aria-hidden="true">
              ▦
            </span>
            Pages
            <em>{pages.length || "—"}</em>
          </button>

          <p className="admin-sidebar-label">Site pages</p>
          <div className="admin-sidebar-scroll">
            {sidebarPages.core.map((item) => (
              <button
                key={item.slug}
                type="button"
                className="admin-nav-item admin-nav-item--page"
                onClick={() => {
                  setSidebarOpen(false);
                  router.push(`/admin/edit/${item.slug}`);
                }}
              >
                {item.label}
              </button>
            ))}
            {sidebarPages.more.length ? (
              <>
                <p className="admin-sidebar-label">More pages</p>
                {sidebarPages.more.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    className="admin-nav-item admin-nav-item--page"
                    onClick={() => {
                      setSidebarOpen(false);
                      router.push(`/admin/edit/${item.slug}`);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            ) : null}
          </div>
        </nav>

        <div className="admin-sidebar-foot">
          <Link className="admin-nav-item" href="/" onClick={() => setSidebarOpen(false)}>
            View site
          </Link>
          <button className="admin-nav-item" type="button" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-main-top">
          <div className="admin-main-heading">
            <button
              type="button"
              className="admin-menu-btn"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
            <div>
              <h1>Pages</h1>
              <p>Select a page to edit its sections live on the site.</p>
            </div>
          </div>
          <div className="admin-main-meta">
            <span>
              {pages.length} total
            </span>
            <span>
              {publishedCount} published
            </span>
          </div>
        </header>

        <div className="admin-toolbar">
          <div className="admin-search">
            <label htmlFor="page-search" className="sr-only">
              Find a page
            </label>
            <input
              id="page-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages…"
            />
          </div>
          <button
            type="button"
            className="admin-btn admin-btn--ghost"
            onClick={() => loadPages()}
            disabled={loading}
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {error ? <p className="admin-error">{error}</p> : null}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Path</th>
                <th>Sections</th>
                <th>Status</th>
                <th>Updated</th>
                <th>
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && !pages.length ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    Loading pages…
                  </td>
                </tr>
              ) : null}
              {!loading && !filtered.length ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    No pages match your search.
                  </td>
                </tr>
              ) : null}
              {filtered.map((page) => {
                const meta = metaBySlug.get(page.slug);
                const count = page.sections?.length || 0;
                return (
                  <tr
                    key={page.slug}
                    onClick={() => router.push(`/admin/edit/${page.slug}`)}
                  >
                    <td>
                      <strong>{meta?.label || page.slug}</strong>
                    </td>
                    <td>
                      <code>{meta?.path || `/${page.slug}`}</code>
                    </td>
                    <td>{count}</td>
                    <td>
                      <span
                        className={
                          page.published
                            ? "admin-badge"
                            : "admin-badge admin-badge--off"
                        }
                      >
                        {page.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td>{formatUpdated(page.updatedAt)}</td>
                    <td>
                      <span className="admin-row-action">Edit</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
