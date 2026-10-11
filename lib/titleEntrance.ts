/** Split heading text into characters for Okes-style title entrance (DOM / HTML pages). */

function wrapChars(el: HTMLElement) {
  if (el.dataset.titleAnim === "1") return;
  el.dataset.titleAnim = "1";
  el.classList.add("title-anim");

  if (!el.getAttribute("aria-label")) {
    el.setAttribute("aria-label", (el.textContent || "").replace(/\s+/g, " ").trim());
  }

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent || !node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      if ((node.parentElement as HTMLElement | null)?.closest(".sr-only, .title-char")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    textNodes.push(current as Text);
    current = walker.nextNode();
  }

  let charIndex = 0;
  textNodes.forEach((textNode) => {
    const text = textNode.textContent ?? "";
    const frag = document.createDocumentFragment();
    for (const char of text) {
      const span = document.createElement("span");
      span.className = "title-char";
      span.setAttribute("aria-hidden", "true");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.setProperty("--char-i", String(charIndex));
      frag.appendChild(span);
      charIndex += 1;
    }
    textNode.parentNode?.replaceChild(frag, textNode);
  });

  el.style.setProperty("--title-chars", String(charIndex));
}

export function initTitleEntrances(root: ParentNode, reduceMotion: boolean) {
  const titles = root.querySelectorAll<HTMLElement>(
    ".page-hero .h1, .svc-hero .h1, .page-hero h1, .svc-hero h1"
  );

  if (reduceMotion) {
    titles.forEach((el) => el.classList.add("is-title-visible"));
    return;
  }

  titles.forEach((el) => {
    wrapChars(el);

    const reveal = () => el.classList.add("is-title-visible");

    // Heroes are above the fold — start shortly after paint
    if (el.closest(".page-hero, .svc-hero")) {
      requestAnimationFrame(() => {
        window.setTimeout(reveal, 180);
      });
      return;
    }

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            reveal();
            io.disconnect();
          });
        },
        { threshold: 0.35 }
      );
      io.observe(el);
    } else {
      reveal();
    }
  });
}
