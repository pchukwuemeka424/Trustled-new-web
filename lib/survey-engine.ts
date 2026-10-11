/* Port of legacy assets/js/survey.js for Next.js client mount */

const ARROW =
  '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function esc(s: unknown) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mountSurvey(root: HTMLElement, D: any) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const Q = D.questions;
  const total = Q.length;
  let idx = 0;
  let answers: number[][] = Q.map(() => []);

  const stage = root.querySelector("[data-stage]") as HTMLElement;
  const bar = root.querySelector(".progress span") as HTMLElement;
  const barWrap = root.querySelector(".progress") as HTMLElement;
  const countLabel = root.querySelector("[data-count-label]") as HTMLElement;
  const errorEl = root.querySelector("[data-error]") as HTMLElement;
  const nav = root.querySelector("[data-nav]") as HTMLElement;
  const back = root.querySelector("[data-back]") as HTMLElement;
  const next = root.querySelector("[data-next]") as HTMLElement;
  const resultEl = root.querySelector("[data-result]") as HTMLElement;
  const sendBox = root.querySelector("[data-send]") as HTMLElement;

  function render() {
    const q = Q[idx];
    const multi = q.type === "checkbox";
    const name = root.id + "-q" + idx;
    const opts = q.options
      .map((o: { label: string }, i: number) => {
        const checked = answers[idx].indexOf(i) > -1 ? " checked" : "";
        return (
          '<label class="opt"><input type="' +
          (multi ? "checkbox" : "radio") +
          '" name="' +
          name +
          '" value="' +
          i +
          '"' +
          checked +
          '><span class="mark"></span><span>' +
          esc(o.label) +
          "</span></label>"
        );
      })
      .join("");
    stage.innerHTML =
      '<div class="q"><fieldset><div class="q-domain">' +
      esc(q.domain) +
      "</div><legend>" +
      esc(q.title) +
      "</legend>" +
      '<p class="q-hint">' +
      esc(q.hint || "Choose one answer.") +
      '</p><div class="opts">' +
      opts +
      "</div></fieldset></div>";
    countLabel.textContent = "Question " + (idx + 1) + " of " + total;
    const pct = Math.round((idx / total) * 100);
    bar.style.width = pct + "%";
    barWrap.setAttribute("aria-valuenow", String(pct));
    back.style.visibility = idx === 0 ? "hidden" : "visible";
    next.innerHTML = (idx === total - 1 ? "See my results " : "Continue ") + ARROW;
    errorEl.textContent = "";
    updateNext();

    stage.querySelectorAll("input").forEach((inp) => {
      inp.addEventListener("change", () => {
        const i = +(inp as HTMLInputElement).value;
        if (multi) {
          const noneIdx = q.options.findIndex((o: { none?: boolean }) => o.none);
          if ((inp as HTMLInputElement).checked && q.options[i].none) {
            stage.querySelectorAll("input").forEach((x) => {
              if (+(x as HTMLInputElement).value !== i) (x as HTMLInputElement).checked = false;
            });
          } else if ((inp as HTMLInputElement).checked && noneIdx > -1) {
            const n = stage.querySelector(
              'input[value="' + noneIdx + '"]'
            ) as HTMLInputElement | null;
            if (n) n.checked = false;
          }
          answers[idx] = Array.prototype.filter
            .call(stage.querySelectorAll("input"), (x: HTMLInputElement) => x.checked)
            .map((x: HTMLInputElement) => +x.value);
        } else {
          answers[idx] = [i];
        }
        errorEl.textContent = "";
        updateNext();
      });
    });
  }

  function updateNext() {
    next.classList.toggle("is-waiting", answers[idx].length === 0);
  }

  function onNext() {
    if (!answers[idx].length) {
      errorEl.textContent = "Please choose an answer to continue.";
      return;
    }
    if (idx < total - 1) {
      idx++;
      render();
      focusQ();
    } else finish();
  }

  function onBack() {
    if (idx > 0) {
      idx--;
      render();
      focusQ();
    }
  }

  function onKey(e: KeyboardEvent) {
    const t = e.target as HTMLElement;
    if (e.key === "Enter" && t.tagName === "INPUT" && t.closest("[data-stage]")) {
      e.preventDefault();
      next.click();
    }
  }

  next.addEventListener("click", onNext);
  back.addEventListener("click", onBack);
  root.addEventListener("keydown", onKey);

  function focusQ() {
    const top = root.getBoundingClientRect().top;
    if (top < 0) root.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function answerText() {
    return Q.map((q: { title: string; options: { label: string }[] }, i: number) => {
      return (
        i +
        1 +
        ". " +
        q.title +
        " — " +
        answers[i].map((a) => q.options[a].label).join("; ")
      );
    }).join("\n");
  }

  function levelFor(score: number) {
    let l = D.levels[0];
    D.levels.forEach((x: unknown[]) => {
      if (score >= (x[0] as number)) l = x;
    });
    return l;
  }

  function finish() {
    bar.style.width = "100%";
    barWrap.setAttribute("aria-valuenow", "100");
    countLabel.textContent = "Your results";
    stage.innerHTML = "";
    nav.hidden = true;
    errorEl.textContent = "";
    const summary = D.mode === "career" ? careerResult() : trackingResult();
    resultEl.hidden = false;
    sendBox.hidden = false;
    (sendBox.querySelector("[data-result-field]") as HTMLInputElement).value = summary;
    (sendBox.querySelector("[data-answers-field]") as HTMLInputElement).value = answerText();
    resultEl.querySelectorAll("[data-restart]").forEach((b) => b.addEventListener("click", restart));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resultEl.querySelectorAll<HTMLElement>("[data-w]").forEach((s) => {
          s.style.width = s.getAttribute("data-w") + "%";
        });
        const ring = resultEl.querySelector(".score-ring") as HTMLElement | null;
        if (ring) animateRing(ring, +ring.getAttribute("data-score")!);
      });
    });
    focusQ();
  }

  function restart() {
    answers = Q.map(() => []);
    idx = 0;
    resultEl.hidden = true;
    resultEl.innerHTML = "";
    sendBox.hidden = true;
    nav.hidden = false;
    render();
    focusQ();
  }

  function animateRing(ring: HTMLElement, target: number) {
    const b = ring.querySelector("b")!;
    if (reduceMotion) {
      ring.style.setProperty("--p", String(target));
      b.textContent = String(target);
      return;
    }
    let start: number | null = null;
    const step = (t: number) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / 1100);
      const e = 1 - Math.pow(1 - k, 3);
      const v = Math.round(target * e);
      ring.style.setProperty("--p", String(target * e));
      b.textContent = String(v);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function careerResult() {
    const keys = Object.keys(D.roles);
    const score: Record<string, number> = {};
    const max: Record<string, number> = {};
    let r = 0;
    keys.forEach((k) => {
      score[k] = 0;
      max[k] = 0;
    });
    Q.forEach((q: { type: string; options: { w: Record<string, number> }[] }, qi: number) => {
      const multi = q.type === "checkbox";
      keys.forEach((k) => {
        const vals = q.options.map((o) => o.w[k] || 0);
        max[k] += multi
          ? Math.min(
              3,
              vals.reduce((a, b) => a + b, 0)
            )
          : Math.max.apply(null, vals);
      });
      const got: Record<string, number> = {};
      let rr = 0;
      answers[qi].forEach((a) => {
        const w = q.options[a].w;
        keys.forEach((k) => {
          got[k] = (got[k] || 0) + (w[k] || 0);
        });
        rr += w.r || 0;
      });
      keys.forEach((k) => {
        score[k] += multi ? Math.min(3, got[k] || 0) : got[k] || 0;
      });
      r += multi ? Math.min(3, rr) : rr;
    });
    const ranked = keys.slice().sort((a, b) => score[b] / max[b] - score[a] / max[a]);
    const pct = (k: string) =>
      Math.max(35, Math.min(97, Math.round(30 + (70 * score[k]) / max[k])));
    const top = D.roles[ranked[0]];
    const second = D.roles[ranked[1]];
    const lv = levelFor(r);
    const stepsHtml = top.steps
      .map(
        (s: string, i: number) =>
          '<div class="rec"><span class="num">0' +
          (i + 1) +
          '</span><div><p style="color:var(--navy);font-weight:500">' +
          esc(s) +
          "</p></div></div>"
      )
      .join("");
    const bars = ranked
      .map((k) => {
        const p = pct(k);
        return (
          '<div><div class="dbar-top"><span>' +
          esc(D.roles[k].name) +
          "</span><span>" +
          p +
          '%</span></div><div class="dbar"><span data-w="' +
          p +
          '"' +
          (k === ranked[0] ? ' class="low"' : "") +
          "></span></div></div>"
        );
      })
      .join("");
    resultEl.innerHTML =
      '<div class="result-grid">' +
      '<div><div class="role-card"><div class="match">Your strongest match · ' +
      pct(ranked[0]) +
      '% fit</div><h2 class="h2">' +
      esc(top.name) +
      "</h2><p>" +
      esc(top.text) +
      "</p></div>" +
      '<div class="role-alt"><span class="small">Also worth exploring</span><b>' +
      esc(second.name) +
      "</b></div>" +
      '<div style="margin-top:18px"><span class="level-pill ' +
      lv[2] +
      '">Readiness: ' +
      esc(lv[1]) +
      '</span><p class="small">' +
      esc(lv[3]) +
      "</p></div></div>" +
      '<div><h3 class="h3" style="margin-bottom:10px">How you match each role</h3><div class="domain-bars">' +
      bars +
      '</div><h3 class="h3" style="margin-bottom:10px">Your next three steps</h3>' +
      stepsHtml +
      "</div></div>" +
      '<div class="result-actions"><a class="btn btn-primary" href="/contact?topic=grc">Talk to us about training ' +
      ARROW +
      '</a><button type="button" class="btn btn-outline" data-restart>Retake the check</button></div>';
    return (
      "Top match: " +
      top.name +
      " (" +
      pct(ranked[0]) +
      "%). Second: " +
      second.name +
      " (" +
      pct(ranked[1]) +
      "%). Readiness: " +
      lv[1] +
      "."
    );
  }

  function trackingResult() {
    const dom: Record<string, { s: number; m: number }> = {};
    let sum = 0;
    let n = 0;
    const weak: { s: number; q: { rec: string[] }; i: number }[] = [];
    const notes: string[] = [];
    D.domains.forEach((d: string) => {
      dom[d] = { s: 0, m: 0 };
    });
    Q.forEach(
      (
        q: {
          context?: boolean;
          domain: string;
          options: { w: { c?: string; s?: number } }[];
          rec: string[];
        },
        qi: number
      ) => {
        if (q.context) {
          answers[qi].forEach((a) => {
            const c = q.options[a].w.c;
            if (c && D.notes[c]) notes.push(D.notes[c]);
          });
          return;
        }
        const s = q.options[answers[qi][0]].w.s || 0;
        dom[q.domain].s += s;
        dom[q.domain].m += 3;
        sum += s;
        n += 3;
        weak.push({ s, q, i: qi });
      }
    );
    const score = Math.round((100 * sum) / n);
    const lv = levelFor(score);
    weak.sort((a, b) => a.s - b.s || a.i - b.i);
    const recs = weak.filter((w) => w.s < 3).slice(0, 3);
    const bars = D.domains
      .map((d: string) => {
        const p = Math.round((100 * dom[d].s) / dom[d].m);
        return (
          '<div><div class="dbar-top"><span>' +
          esc(d) +
          "</span><span>" +
          p +
          '%</span></div><div class="dbar"><span data-w="' +
          p +
          '"' +
          (p < 50 ? ' class="low"' : "") +
          "></span></div></div>"
        );
      })
      .join("");
    const recHtml = recs.length
      ? recs
          .map(
            (w, i) =>
              '<div class="rec"><span class="num">0' +
              (i + 1) +
              "</span><div><h4>" +
              esc(w.q.rec[0]) +
              "</h4><p>" +
              esc(w.q.rec[1]) +
              "</p></div></div>"
          )
          .join("")
      : '<div class="rec"><span class="num">01</span><div><h4>Seek formal assurance</h4><p>Your answers point to mature governance. An independent ISO/IEC 42001 readiness review would confirm it for clients and regulators.</p></div></div>';
    const notesHtml = notes.length
      ? '<h3 class="h3" style="margin:22px 0 8px">Worth knowing for your context</h3><ul class="list-sq">' +
        notes.map((t) => "<li>" + esc(t) + "</li>").join("") +
        "</ul>"
      : "";
    resultEl.innerHTML =
      '<div class="result-head"><div class="score-ring" data-score="' +
      score +
      '" style="--p:0"><div><span><b>0</b><small>out of 100</small></span></div></div>' +
      '<div style="flex:1 1 260px"><span class="level-pill ' +
      lv[2] +
      '">' +
      esc(lv[1]) +
      '</span><h2 class="h2" style="margin-bottom:6px">Your responsible AI score</h2><p>' +
      esc(lv[3]) +
      "</p></div></div>" +
      '<div class="result-grid"><div><h3 class="h3" style="margin-bottom:10px">Score by area</h3><div class="domain-bars">' +
      bars +
      "</div>" +
      notesHtml +
      '</div><div><h3 class="h3" style="margin-bottom:10px">Your priority actions</h3>' +
      recHtml +
      "</div></div>" +
      '<p class="small muted" style="margin-top:18px">This is an indicative self-assessment informed by ISO/IEC 42001, the NIST AI RMF, UK GDPR and the Nigeria Data Protection Act 2023. It is not legal advice or a certification.</p>' +
      '<div class="result-actions"><a class="btn btn-primary" href="/contact?topic=tracking">Book a review call ' +
      ARROW +
      '</a><button type="button" class="btn btn-outline" data-restart>Retake the assessment</button></div>';
    return (
      "Score: " +
      score +
      "/100 (" +
      lv[1] +
      "). " +
      D.domains
        .map((d: string) => d + " " + Math.round((100 * dom[d].s) / dom[d].m) + "%")
        .join(", ") +
      ". Priorities: " +
      recs.map((w) => w.q.rec[0]).join("; ") +
      "."
    );
  }

  render();

  return () => {
    next.removeEventListener("click", onNext);
    back.removeEventListener("click", onBack);
    root.removeEventListener("keydown", onKey);
  };
}
