"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { initTitleEntrances } from "@/lib/titleEntrance";
import { IconArrowUp } from "./Icons";

function countUp(el: HTMLElement) {
  const target = parseInt(el.getAttribute("data-count") || "", 10);
  const suffix = el.getAttribute("data-suffix") || "";
  if (Number.isNaN(target)) return;
  let start: number | null = null;
  const duration = 1200;
  const step = (ts: number) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const toTop = document.querySelector<HTMLButtonElement>(".to-top");
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      toTop?.classList.toggle("is-shown", y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const onTopClick = () =>
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    toTop?.addEventListener("click", onTopClick);

    const main = document.getElementById("main");
    if (main) {
      main
        .querySelectorAll<HTMLElement>(".page-hero > .container, .svc-hero > .container")
        .forEach((el) => {
          el.classList.remove("reveal");
          el.classList.add("reveal-hero");
        });

      main
        .querySelectorAll<HTMLElement>(
          ".bento, .grid, .steps, .pillars, .reasons, .values-grid"
        )
        .forEach((el) => {
          if (
            !el.classList.contains("reveal-stagger") &&
            !el.classList.contains("reveal") &&
            !el.classList.contains("reveal-hero")
          ) {
            el.classList.add("reveal-stagger");
          }
        });

      main
        .querySelectorAll<HTMLElement>(
          ".cta, .sector, .mission, .featured, .form-card, .stats-card, .quote, .pull, .service"
        )
        .forEach((el) => {
          if (
            el.classList.contains("reveal") ||
            el.classList.contains("reveal-stagger") ||
            el.classList.contains("reveal-hero") ||
            el.closest(".reveal-stagger, .reveal-hero, .reveal")
          ) {
            return;
          }
          el.classList.add("reveal");
        });

      main.querySelectorAll<HTMLElement>(".split, .hero-split, .define").forEach((wrap) => {
        Array.from(wrap.children).forEach((child, idx) => {
          const el = child as HTMLElement;
          if (
            el.classList.contains("reveal") ||
            el.classList.contains("reveal-left") ||
            el.classList.contains("reveal-right") ||
            el.classList.contains("reveal-stagger") ||
            el.closest(".reveal-stagger, .reveal-hero")
          ) {
            return;
          }
          el.classList.add(idx % 2 === 0 ? "reveal-left" : "reveal-right");
        });
      });

      initTitleEntrances(main, reduceMotion);
    }

    const revealEls = document.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right, .reveal-down, .reveal-stagger, .reveal-hero, [data-count], .bar"
    );
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && !reduceMotion) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.classList.add("is-visible");
            el.closest(".tile, .card")?.classList.add("is-visible");
            if (el.hasAttribute("data-count")) countUp(el);
            io?.unobserve(el);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => io!.observe(el));
    } else {
      revealEls.forEach((el) => {
        el.classList.add("is-visible");
        el.closest(".tile, .card")?.classList.add("is-visible");
      });
    }

    const onPointerDown = (e: PointerEvent) => {
      const btn = (e.target as Element).closest(".btn") as HTMLElement | null;
      if (!btn || reduceMotion) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const r = document.createElement("span");
      r.className = "ripple";
      r.style.width = r.style.height = size + "px";
      r.style.left = e.clientX - rect.left - size / 2 + "px";
      r.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(r);
      setTimeout(() => r.remove(), 650);
    };
    document.addEventListener("pointerdown", onPointerDown);

    const tocLinks = document.querySelectorAll<HTMLAnchorElement>('.toc a[href^="#"]');
    let tocIo: IntersectionObserver | null = null;
    if (tocLinks.length && "IntersectionObserver" in window) {
      const map: Record<string, HTMLAnchorElement> = {};
      tocLinks.forEach((l) => {
        map[l.getAttribute("href")!.slice(1)] = l;
      });
      tocIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            tocLinks.forEach((l) => l.classList.remove("is-active"));
            const link = map[entry.target.id];
            if (link) link.classList.add("is-active");
          });
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      Object.keys(map).forEach((id) => {
        const s = document.getElementById(id);
        if (s) tocIo!.observe(s);
      });
    }

    document.querySelectorAll<HTMLFormElement>("form[data-form]").forEach((form) => {
      const next = form.querySelector<HTMLInputElement>('input[name="_next"]');
      if (next) next.value = new URL("/thank-you", location.href).href;
      if (form.hasAttribute("data-preview")) {
        const handler = (e: Event) => {
          e.preventDefault();
          let note = form.querySelector(".preview-note");
          if (!note) {
            note = document.createElement("p");
            note.className = "form-note preview-note";
            note.setAttribute("role", "status");
            form.appendChild(note);
          }
          note.textContent =
            "Preview only: on the live site this form sends to hello@trustledai.com.";
        };
        form.addEventListener("submit", handler);
        return;
      }
      const page = form.querySelector<HTMLInputElement>('input[name="Page"]');
      if (page) page.value = location.href;
      form.addEventListener("submit", () => {
        const b = form.querySelector<HTMLButtonElement>('button[type="submit"]');
        if (b) {
          b.classList.add("is-loading");
          b.setAttribute("aria-busy", "true");
        }
      });
    });

    const topicSelect = document.querySelector<HTMLSelectElement>('select[name="Topic"]');
    if (topicSelect) {
      const t = new URLSearchParams(location.search).get("topic");
      if (t) {
        Array.prototype.forEach.call(topicSelect.options, (o: HTMLOptionElement) => {
          if (o.getAttribute("data-key") === t) topicSelect.value = o.value;
        });
      }
    }

    const filterBtns = document.querySelectorAll<HTMLButtonElement>("[data-filter]");
    const onFilter = (btn: HTMLButtonElement) => {
      const f = btn.getAttribute("data-filter");
      filterBtns.forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
      document.querySelectorAll<HTMLElement>("[data-type]").forEach((item) => {
        const show = f === "all" || item.getAttribute("data-type") === f;
        item.hidden = !show;
      });
    };
    filterBtns.forEach((btn) => btn.addEventListener("click", () => onFilter(btn)));

    const tabCleanups: Array<() => void> = [];
    document.querySelectorAll("[data-tabs]").forEach((wrap) => {
      const btns = Array.from(wrap.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
      const select = (b: HTMLButtonElement, focus?: boolean) => {
        btns.forEach((x) => {
          const on = x === b;
          x.setAttribute("aria-selected", on ? "true" : "false");
          x.tabIndex = on ? 0 : -1;
          const panel = document.getElementById(x.getAttribute("aria-controls") || "");
          if (panel) panel.hidden = !on;
        });
        if (focus) b.focus();
      };
      const handlers = btns.map((b, i) => {
        const onClick = () => select(b);
        const onKey = (e: KeyboardEvent) => {
          const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (d) {
            e.preventDefault();
            select(btns[(i + d + btns.length) % btns.length], true);
          }
        };
        b.addEventListener("click", onClick);
        b.addEventListener("keydown", onKey);
        return () => {
          b.removeEventListener("click", onClick);
          b.removeEventListener("keydown", onKey);
        };
      });
      tabCleanups.push(...handlers);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      toTop?.removeEventListener("click", onTopClick);
      document.removeEventListener("pointerdown", onPointerDown);
      io?.disconnect();
      tocIo?.disconnect();
      tabCleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return (
    <button type="button" className="to-top" aria-label="Back to top">
      <IconArrowUp />
    </button>
  );
}
