/* TrustLed AI survey engine: Check AI Career Path and Responsible AI Tracking */
(function () {
  'use strict';
  var ARROW = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  document.querySelectorAll('[data-survey]').forEach(function (root) {
    var dataEl = document.getElementById(root.id + '-data');
    if (!dataEl) return;
    var D = JSON.parse(dataEl.textContent);
    var Q = D.questions, total = Q.length, idx = 0;
    var answers = Q.map(function () { return []; });

    var stage = root.querySelector('[data-stage]');
    var bar = root.querySelector('.progress span');
    var barWrap = root.querySelector('.progress');
    var countLabel = root.querySelector('[data-count-label]');
    var errorEl = root.querySelector('[data-error]');
    var nav = root.querySelector('[data-nav]');
    var back = root.querySelector('[data-back]');
    var next = root.querySelector('[data-next]');
    var resultEl = root.querySelector('[data-result]');
    var sendBox = root.querySelector('[data-send]');

    function render() {
      var q = Q[idx];
      var multi = q.type === 'checkbox';
      var name = root.id + '-q' + idx;
      var opts = q.options.map(function (o, i) {
        var checked = answers[idx].indexOf(i) > -1 ? ' checked' : '';
        return '<label class="opt"><input type="' + (multi ? 'checkbox' : 'radio') + '" name="' + name + '" value="' + i + '"' + checked + '><span class="mark"></span><span>' + esc(o.label) + '</span></label>';
      }).join('');
      stage.innerHTML = '<div class="q"><fieldset><div class="q-domain">' + esc(q.domain) + '</div><legend>' + esc(q.title) + '</legend>' +
        '<p class="q-hint">' + esc(q.hint || 'Choose one answer.') + '</p><div class="opts">' + opts + '</div></fieldset></div>';
      countLabel.textContent = 'Question ' + (idx + 1) + ' of ' + total;
      var pct = Math.round((idx / total) * 100);
      bar.style.width = pct + '%';
      barWrap.setAttribute('aria-valuenow', pct);
      back.style.visibility = idx === 0 ? 'hidden' : 'visible';
      next.innerHTML = (idx === total - 1 ? 'See my results ' : 'Continue ') + ARROW;
      errorEl.textContent = '';
      updateNext();

      stage.querySelectorAll('input').forEach(function (inp) {
        inp.addEventListener('change', function () {
          var i = +inp.value;
          if (multi) {
            var noneIdx = q.options.findIndex(function (o) { return o.none; });
            if (inp.checked && q.options[i].none) {
              stage.querySelectorAll('input').forEach(function (x) { if (+x.value !== i) x.checked = false; });
            } else if (inp.checked && noneIdx > -1) {
              var n = stage.querySelector('input[value="' + noneIdx + '"]'); if (n) n.checked = false;
            }
            answers[idx] = Array.prototype.filter.call(stage.querySelectorAll('input'), function (x) { return x.checked; }).map(function (x) { return +x.value; });
          } else {
            answers[idx] = [i];
          }
          errorEl.textContent = '';
          updateNext();
        });
      });
    }

    function updateNext() { next.classList.toggle('is-waiting', answers[idx].length === 0); }

    next.addEventListener('click', function () {
      if (!answers[idx].length) { errorEl.textContent = 'Please choose an answer to continue.'; return; }
      if (idx < total - 1) { idx++; render(); focusQ(); }
      else finish();
    });
    back.addEventListener('click', function () { if (idx > 0) { idx--; render(); focusQ(); } });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.closest('[data-stage]')) { e.preventDefault(); next.click(); }
    });

    function focusQ() {
      var top = root.getBoundingClientRect().top;
      if (top < 0) root.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }

    function answerText() {
      return Q.map(function (q, i) {
        return (i + 1) + '. ' + q.title + ' — ' + answers[i].map(function (a) { return q.options[a].label; }).join('; ');
      }).join('\n');
    }

    function levelFor(score) {
      var l = D.levels[0];
      D.levels.forEach(function (x) { if (score >= x[0]) l = x; });
      return l;
    }

    function finish() {
      bar.style.width = '100%';
      barWrap.setAttribute('aria-valuenow', 100);
      countLabel.textContent = 'Your results';
      stage.innerHTML = '';
      nav.hidden = true;
      errorEl.textContent = '';
      var summary = D.mode === 'career' ? careerResult() : trackingResult();
      resultEl.hidden = false;
      sendBox.hidden = false;
      sendBox.querySelector('[data-result-field]').value = summary;
      sendBox.querySelector('[data-answers-field]').value = answerText();
      resultEl.querySelectorAll('[data-restart]').forEach(function (b) { b.addEventListener('click', restart); });
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          resultEl.querySelectorAll('[data-w]').forEach(function (s) { s.style.width = s.getAttribute('data-w') + '%'; });
          var ring = resultEl.querySelector('.score-ring');
          if (ring) animateRing(ring, +ring.getAttribute('data-score'));
        });
      });
      focusQ();
    }

    function restart() {
      answers = Q.map(function () { return []; });
      idx = 0;
      resultEl.hidden = true; resultEl.innerHTML = '';
      sendBox.hidden = true; nav.hidden = false;
      render(); focusQ();
    }

    function animateRing(ring, target) {
      var b = ring.querySelector('b');
      if (reduceMotion) { ring.style.setProperty('--p', target); b.textContent = target; return; }
      var start = null;
      function step(t) {
        if (!start) start = t;
        var k = Math.min(1, (t - start) / 1100), e = 1 - Math.pow(1 - k, 3), v = Math.round(target * e);
        ring.style.setProperty('--p', target * e); b.textContent = v;
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    /* ---------- Career path ---------- */
    function careerResult() {
      var keys = Object.keys(D.roles), score = {}, max = {}, r = 0;
      keys.forEach(function (k) { score[k] = 0; max[k] = 0; });
      Q.forEach(function (q, qi) {
        var multi = q.type === 'checkbox';
        keys.forEach(function (k) {
          var vals = q.options.map(function (o) { return o.w[k] || 0; });
          max[k] += multi ? Math.min(3, vals.reduce(function (a, b) { return a + b; }, 0)) : Math.max.apply(null, vals);
        });
        var got = {}, rr = 0;
        answers[qi].forEach(function (a) {
          var w = q.options[a].w;
          keys.forEach(function (k) { got[k] = (got[k] || 0) + (w[k] || 0); });
          rr += w.r || 0;
        });
        keys.forEach(function (k) { score[k] += multi ? Math.min(3, got[k] || 0) : (got[k] || 0); });
        r += multi ? Math.min(3, rr) : rr;
      });
      var ranked = keys.slice().sort(function (a, b) { return score[b] / max[b] - score[a] / max[a]; });
      var pct = function (k) { return Math.max(35, Math.min(97, Math.round(30 + 70 * score[k] / max[k]))); };
      var top = D.roles[ranked[0]], second = D.roles[ranked[1]], lv = levelFor(r);
      var stepsHtml = top.steps.map(function (s, i) {
        return '<div class="rec"><span class="num">0' + (i + 1) + '</span><div><p style="color:var(--navy);font-weight:500">' + esc(s) + '</p></div></div>';
      }).join('');
      var bars = ranked.map(function (k) {
        var p = pct(k);
        return '<div><div class="dbar-top"><span>' + esc(D.roles[k].name) + '</span><span>' + p + '%</span></div><div class="dbar"><span data-w="' + p + '"' + (k === ranked[0] ? ' class="low"' : '') + '></span></div></div>';
      }).join('');
      resultEl.innerHTML =
        '<div class="result-grid">' +
          '<div><div class="role-card"><div class="match">Your strongest match · ' + pct(ranked[0]) + '% fit</div><h2 class="h2">' + esc(top.name) + '</h2><p>' + esc(top.text) + '</p></div>' +
          '<div class="role-alt"><span class="small">Also worth exploring</span><b>' + esc(second.name) + '</b></div>' +
          '<div style="margin-top:18px"><span class="level-pill ' + lv[2] + '">Readiness: ' + esc(lv[1]) + '</span><p class="small">' + esc(lv[3]) + '</p></div></div>' +
          '<div><h3 class="h3" style="margin-bottom:10px">How you match each role</h3><div class="domain-bars">' + bars + '</div>' +
          '<h3 class="h3" style="margin-bottom:10px">Your next three steps</h3>' + stepsHtml + '</div>' +
        '</div>' +
        '<div class="result-actions"><a class="btn btn-primary" href="contact.html?topic=grc">Talk to us about training ' + ARROW + '</a><button type="button" class="btn btn-outline" data-restart>Retake the check</button></div>';
      return 'Top match: ' + top.name + ' (' + pct(ranked[0]) + '%). Second: ' + second.name + ' (' + pct(ranked[1]) + '%). Readiness: ' + lv[1] + '.';
    }

    /* ---------- Responsible AI tracking ---------- */
    function trackingResult() {
      var dom = {}, sum = 0, n = 0, weak = [], notes = [];
      D.domains.forEach(function (d) { dom[d] = { s: 0, m: 0 }; });
      Q.forEach(function (q, qi) {
        if (q.context) {
          answers[qi].forEach(function (a) { var c = q.options[a].w.c; if (D.notes[c]) notes.push(D.notes[c]); });
          return;
        }
        var s = q.options[answers[qi][0]].w.s || 0;
        dom[q.domain].s += s; dom[q.domain].m += 3; sum += s; n += 3;
        weak.push({ s: s, q: q, i: qi });
      });
      var score = Math.round(100 * sum / n), lv = levelFor(score);
      weak.sort(function (a, b) { return a.s - b.s || a.i - b.i; });
      var recs = weak.filter(function (w) { return w.s < 3; }).slice(0, 3);
      var bars = D.domains.map(function (d) {
        var p = Math.round(100 * dom[d].s / dom[d].m);
        return '<div><div class="dbar-top"><span>' + esc(d) + '</span><span>' + p + '%</span></div><div class="dbar"><span data-w="' + p + '"' + (p < 50 ? ' class="low"' : '') + '></span></div></div>';
      }).join('');
      var recHtml = recs.length ? recs.map(function (w, i) {
        return '<div class="rec"><span class="num">0' + (i + 1) + '</span><div><h4>' + esc(w.q.rec[0]) + '</h4><p>' + esc(w.q.rec[1]) + '</p></div></div>';
      }).join('') : '<div class="rec"><span class="num">01</span><div><h4>Seek formal assurance</h4><p>Your answers point to mature governance. An independent ISO/IEC 42001 readiness review would confirm it for clients and regulators.</p></div></div>';
      var notesHtml = notes.length ? '<h3 class="h3" style="margin:22px 0 8px">Worth knowing for your context</h3><ul class="list-sq">' + notes.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '';
      resultEl.innerHTML =
        '<div class="result-head"><div class="score-ring" data-score="' + score + '" style="--p:0"><div><span><b>0</b><small>out of 100</small></span></div></div>' +
        '<div style="flex:1 1 260px"><span class="level-pill ' + lv[2] + '">' + esc(lv[1]) + '</span><h2 class="h2" style="margin-bottom:6px">Your responsible AI score</h2><p>' + esc(lv[3]) + '</p></div></div>' +
        '<div class="result-grid"><div><h3 class="h3" style="margin-bottom:10px">Score by area</h3><div class="domain-bars">' + bars + '</div>' + notesHtml + '</div>' +
        '<div><h3 class="h3" style="margin-bottom:10px">Your priority actions</h3>' + recHtml + '</div></div>' +
        '<p class="small muted" style="margin-top:18px">This is an indicative self-assessment informed by ISO/IEC 42001, the NIST AI RMF, UK GDPR and the Nigeria Data Protection Act 2023. It is not legal advice or a certification.</p>' +
        '<div class="result-actions"><a class="btn btn-primary" href="contact.html?topic=tracking">Book a review call ' + ARROW + '</a><button type="button" class="btn btn-outline" data-restart>Retake the assessment</button></div>';
      return 'Score: ' + score + '/100 (' + lv[1] + '). ' + D.domains.map(function (d) { return d + ' ' + Math.round(100 * dom[d].s / dom[d].m) + '%'; }).join(', ') + '. Priorities: ' + recs.map(function (w) { return w.q.rec[0]; }).join('; ') + '.';
    }

    render();
  });
})();
