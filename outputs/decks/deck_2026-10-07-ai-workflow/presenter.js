/* Presenter layer ported from the deck skill's shared player runtime (runtime.js),
   adapted to this deck's own renderer and to the v3 deck.html routes of mockup-serve.
   Roles (by URL query): main (none) · ?presenter · ?receiver[&offset=1].
   Transport: BroadcastChannel + server sync (relative to the deck mount: GET sync,
   POST sync/state|nav|pointer, save-notes {slide_id, notes_html, build}, feedback). */
(function () {
  const q = new URLSearchParams(location.search);
  const role = q.has('presenter') ? 'presenter' : q.has('receiver') ? 'receiver' : 'main';
  const served = location.protocol.startsWith('http');
  const api = location.pathname.replace(/[^/]*$/, '');
  const deck = window.__deck;
  const slides = deck.slides;
  const N = slides.length;
  const bc = ('BroadcastChannel' in window) ? new BroadcastChannel('deck-sync:' + api) : null;
  const notesOn = (document.documentElement.getAttribute('data-deck-notes') || 'on') !== 'off';

  const css = document.createElement('style');
  css.textContent = `
  :root{--pv-ground:#0E1117;--pv-panel:#161B24;--pv-line:#262D3A;--pv-ink:#E8ECF2;--pv-muted:#8B95A7;--pv-amber:#F2B84B;--pv-red:#E5484D;
        --pv-font:"Plex KR","Apple SD Gothic Neo",system-ui,sans-serif}
  #dk-laser{position:fixed;width:18px;height:18px;border-radius:50%;background:rgba(229,72,77,.9);box-shadow:0 0 14px rgba(229,72,77,.9);pointer-events:none;display:none;z-index:99;transform:translate(-50%,-50%)}
  body.dk-receiver #thread,body.dk-receiver #counter{display:none}

  body.presenter{background:var(--pv-ground);color:var(--pv-ink);overflow:hidden;font:15px/1.5 var(--pv-font);-webkit-font-smoothing:antialiased}
  body.presenter #viewport,body.presenter #thread,body.presenter #counter{display:none}
  #dk-progress{position:fixed;top:0;left:0;height:3px;background:var(--pv-amber);width:0;transition:width .25s ease;z-index:5}
  #dk-rebuilt{position:fixed;top:0;left:0;right:0;z-index:120;padding:12px 20px;background:var(--pv-amber);color:#12161F;font-weight:700;font-size:15px;text-align:center;font-family:var(--pv-font)}
  #dk-pv{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(360px,1fr);grid-template-rows:auto minmax(0,1fr);gap:0 28px;height:100vh;padding:18px 28px 22px;box-sizing:border-box}
  #dk-pv .bar{grid-column:1/3;display:flex;align-items:center;gap:22px;padding:6px 0 14px;border-bottom:1px solid var(--pv-line);margin-bottom:18px}
  #dk-pv .bar .pos{font-size:30px;font-weight:600;letter-spacing:-.02em;font-variant-numeric:tabular-nums;line-height:1}
  #dk-pv .bar .pos small{font-size:15px;color:var(--pv-muted);font-weight:400;margin-left:6px}
  #dk-pv .bar .time{font-size:22px;font-variant-numeric:tabular-nums;color:var(--pv-muted);letter-spacing:.02em;cursor:pointer}
  #dk-pv .bar .sp{flex:1}
  #dk-pv .bar .status{font-size:12px;color:var(--pv-muted)}
  #dk-pv .bar .status.ok{color:var(--pv-amber)}
  .pv-btn{font:inherit;font-size:14px;padding:8px 14px;background:transparent;color:var(--pv-ink);border:1px solid var(--pv-line);border-radius:6px;cursor:pointer;transition:background .15s,border-color .15s}
  .pv-btn:hover{background:var(--pv-panel)} .pv-btn:focus-visible{outline:2px solid var(--pv-amber);outline-offset:2px}
  .pv-btn.primary{border-color:var(--pv-ink)}
  .pv-btn.on{background:var(--pv-red);border-color:var(--pv-red);color:#fff}
  .pv-btn kbd{font:inherit;font-size:11px;color:var(--pv-muted);margin-left:6px}
  .pv-btn.on kbd{color:rgba(255,255,255,.75)}
  #dk-pv .stage{display:flex;flex-direction:column;gap:14px;min-height:0}
  #dk-pv .cur{position:relative;background:#000;aspect-ratio:16/9;width:100%;border:1px solid var(--pv-line)}
  #dk-pv .cur iframe,#dk-pv .nxt iframe{width:100%;height:100%;border:0;background:#000;display:block;pointer-events:none}
  #dk-pv .cur .hit{position:absolute;inset:0}
  #dk-pv .cur.pointing .hit{cursor:crosshair}
  #dk-pv .nxt-row{display:flex;gap:14px;align-items:flex-end}
  #dk-pv .nxt{background:#000;aspect-ratio:16/9;width:38%;border:1px solid var(--pv-line);position:relative}
  #dk-pv .nxt-title{flex:1;color:var(--pv-muted);font-size:14px;line-height:1.5;padding-bottom:4px}
  #dk-pv .nxt-title b{display:block;color:var(--pv-ink);font-weight:500;font-size:15px}
  #dk-pv .lbl{font-size:12px;color:var(--pv-muted)}
  #dk-pv .pv-notes{display:flex;flex-direction:column;min-height:0;border-left:1px solid var(--pv-line);padding-left:26px}
  #dk-pv .pv-notes .hd{display:flex;align-items:baseline;gap:10px;margin-bottom:12px}
  #dk-pv .pv-notes .hd .lbl{flex:1;font-family:"Plex Mono",ui-monospace,monospace}
  #dk-pv .pv-notes .hd button{font-size:12px;padding:4px 10px}
  #dk-pv .pv-notes .title{font-size:16px;font-weight:600;letter-spacing:-.01em;margin-bottom:4px;color:var(--pv-ink);line-height:1.35}
  #dk-pv .pv-notes .sub{font-size:14px;color:var(--pv-muted);margin-bottom:14px;line-height:1.4}
  #dk-pv .notes-view{flex:1;min-height:0;overflow:auto;font-size:var(--dk-notes-fs,22px);line-height:1.65;color:var(--pv-ink);padding-right:8px}
  #dk-pv .notes-view p{margin:0 0 .7em;font-size:inherit;line-height:inherit}
  #dk-pv .notes-view strong{color:var(--pv-amber);font-weight:600}
  #dk-pv .notes-view .empty{color:var(--pv-muted)}
  #dk-pv textarea.notes-edit{flex:1;min-height:0;margin:0;padding:14px;font:17px/1.6 var(--pv-font);background:var(--pv-panel);color:var(--pv-ink);border:1px solid var(--pv-line);border-radius:6px;resize:none;display:none}
  #dk-pv textarea:focus-visible{outline:2px solid var(--pv-amber);outline-offset:1px}
  #dk-pv .md-hint{display:none;font-size:12px;color:var(--pv-muted);margin-top:8px}
  #dk-pv .pv-notes.editing .md-hint{display:block}
  #dk-pv .fb{margin-top:16px;padding-top:14px;border-top:1px dashed var(--pv-line)}
  #dk-pv .fb-add{width:100%;text-align:left;font:inherit;font-size:14px;color:var(--pv-muted);background:transparent;border:1px dashed var(--pv-line);border-radius:6px;padding:12px 14px;cursor:pointer;transition:color .15s,border-color .15s}
  #dk-pv .fb-add:hover{color:var(--pv-ink);border-color:var(--pv-muted)}
  #dk-pv .fb-add:focus-visible{outline:2px solid var(--pv-amber);outline-offset:2px}
  #dk-pv .fb-box{display:none;flex-direction:column;gap:8px}
  #dk-pv .fb.open .fb-add{display:none} #dk-pv .fb.open .fb-box{display:flex}
  #dk-pv .fb-box .row{display:flex;align-items:center;gap:8px}
  #dk-pv .fb-box .row .lbl{flex:1}
  #dk-pv .fb-scope{display:inline-flex;border:1px solid var(--pv-line);border-radius:6px;overflow:hidden}
  #dk-pv .fb-scope button{font:inherit;font-size:12px;padding:3px 10px;background:transparent;color:var(--pv-muted);border:0;cursor:pointer}
  #dk-pv .fb-scope button.on{background:var(--pv-panel);color:var(--pv-ink)}
  #dk-pv .fb-kind{display:flex;flex-wrap:wrap;gap:6px}
  #dk-pv .fb-kind button{font:inherit;font-size:12px;padding:3px 10px;background:transparent;color:var(--pv-muted);border:1px solid var(--pv-line);border-radius:999px;cursor:pointer}
  #dk-pv .fb-kind button.on{background:var(--pv-panel);color:var(--pv-ink);border-color:var(--pv-muted)}
  #dk-pv .fb-kind button:focus-visible{outline:2px solid var(--pv-amber);outline-offset:1px}
  #dk-pv .fb.deck-scope .fb-kind{display:none}
  #dk-pv .fb-box textarea{min-height:96px;padding:12px;font:15px/1.55 var(--pv-font);background:var(--pv-panel);color:var(--pv-ink);border:1px solid var(--pv-line);border-radius:6px;resize:vertical}
  #dk-pv .fb-box .foot{display:flex;align-items:center;gap:10px;font-size:12px;color:var(--pv-muted)}
  #dk-pv .fb-box .foot .sp{flex:1}
  #dk-pv .fb-box .foot button{font-size:12px;padding:4px 10px}
  @media (max-width:900px){#dk-pv{grid-template-columns:1fr;grid-template-rows:auto auto minmax(0,1fr);padding:12px 14px;gap:0}#dk-pv .bar{grid-column:1;gap:10px;flex-wrap:nowrap}#dk-pv .bar .pv-btn{white-space:nowrap;padding:8px 12px}#dk-pv .bar .pv-btn kbd,#dk-pv .bar .status{display:none}#dk-pv .bar .pos{font-size:24px}#dk-pv .bar .time{font-size:16px}#dk-pv .stage{margin-bottom:14px}#dk-pv .nxt-row{display:none}#dk-pv .pv-notes{border-left:0;padding-left:0;overflow:auto}#dk-pv .notes-view{flex:none;overflow:visible}}
  @media (prefers-reduced-motion:reduce){#dk-progress{transition:none}}
  `;
  document.head.appendChild(css);

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Notes are plain text, one paragraph per line; **stress** words are highlighted as in the deck skill.
  const notesToHtml = t => t.trim().split(/\n+/).map(p => '<p>' + esc(p).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') + '</p>').join('');

  let index = deck.index();
  let seqSeen = 0;
  const idOf = i => slides[i] && slides[i].id;
  const textOf = (i, sel) => { const h = slides[i] && slides[i].querySelector(sel); return h ? h.textContent.replace(/\s+/g, ' ').trim() : ''; };
  const titleOf = i => textOf(i, 'h1,h2');
  const notesOf = i => (slides[i] && slides[i].querySelector('aside.notes')) || null;
  function post(path, obj) {
    if (!served) return Promise.resolve(null);
    return fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(obj) }).catch(() => null);
  }

  // The server reports the build it would serve now; a different stamp means the deck was
  // rebuilt underneath this window, and a note save aimed at the old build is refused anyway.
  const buildId = () => document.documentElement.dataset.deckBuild;
  let reloading = false;
  const rebuilt = d => !!(d && d.build && d.build !== buildId());
  function reloadForRebuild() { if (reloading) return; reloading = true; location.reload(); }

  // ---------- main / receiver ----------
  if (role === 'main' || role === 'receiver') {
    if (role === 'receiver') document.body.classList.add('dk-receiver');
    const laser = document.createElement('div'); laser.id = 'dk-laser'; document.body.appendChild(laser);
    const offset = role === 'receiver' ? parseInt(q.get('offset') || '0', 10) : 0;
    const show = i => { index = Math.max(0, Math.min(N - 1, i)); deck.go(index, true); };
    function applyRemote(msg) {
      if (msg.t === 'state') { if (role === 'receiver') show(msg.index + offset); }
      else if (msg.t === 'nav' && role === 'main') deck.go(deck.index() + (msg.dir === 'next' ? 1 : -1));
      else if (msg.t === 'pointer') {
        const on = msg.on && (role === 'main' || offset === 0);
        laser.style.display = on ? 'block' : 'none';
        const r = deck.stage.getBoundingClientRect();
        laser.style.left = (r.left + msg.x * r.width) + 'px';
        laser.style.top = (r.top + msg.y * r.height) + 'px';
      }
    }
    bc && (bc.onmessage = e => applyRemote(e.data));
    if (role === 'main') {
      const announce = i => { bc && bc.postMessage({ t: 'state', index: i }); post(api + 'sync/state', { index: i, fragment: 0 }); };
      window.addEventListener('deck:go', e => { if (!e.detail.silent) announce(e.detail.index); });
      announce(deck.index());
    }
    let holdUntil = 0; // after a parent-driven move, ignore stale server state until the main deck catches up
    if (served && role === 'receiver') {
      (function pollR() { fetch(api + 'sync?cmd_after=0', { cache: 'no-store' }).then(r => r.json()).then(d => { if (rebuilt(d)) return reloadForRebuild(); if (d.state && typeof d.state.index === 'number' && Date.now() > holdUntil) show(d.state.index + offset); if (d.pointer && offset === 0) applyRemote({ t: 'pointer', ...d.pointer }); }).catch(() => {}).finally(() => setTimeout(pollR, 500)); })();
    }
    if (served && role === 'main') {
      let primed = false; // the first poll only learns the latest seq: commands from earlier sessions are never replayed
      (function poll() {
        fetch(api + 'sync?cmd_after=' + seqSeen, { cache: 'no-store' }).then(r => r.json()).then(d => {
          if (rebuilt(d)) return reloadForRebuild();
          (d.commands || []).forEach(c => { seqSeen = Math.max(seqSeen, c.seq); if (primed) applyRemote({ t: 'nav', dir: c.dir }); });
          primed = true;
          if (d.pointer) applyRemote({ t: 'pointer', ...d.pointer });
        }).catch(() => {}).finally(() => setTimeout(poll, 500));
      })();
    }
    if (role === 'receiver') window.addEventListener('message', e => { if (e.data && e.data.t === 'state') { holdUntil = Date.now() + 1500; show(e.data.index + offset); } });
    return;
  }

  // ---------- presenter ----------
  document.body.classList.add('presenter');
  index = Math.max(0, (parseInt(location.hash.slice(1), 10) || 1) - 1);
  const base = location.pathname;
  const KINDS = [['edit', '수정'], ['exclude', '제외'], ['backup', '백업으로'], ['enrich', '보강'], ['add', '뒤에 추가']];
  const prog = document.createElement('div'); prog.id = 'dk-progress'; document.body.appendChild(prog);
  const pv = document.createElement('div'); pv.id = 'dk-pv';
  pv.innerHTML = `
    <div class="bar">
      <button class="pv-btn" id="pp" aria-label="이전 슬라이드">◀ 이전</button>
      <button class="pv-btn primary" id="pn" aria-label="다음 슬라이드">다음 ▶<kbd>→</kbd></button>
      <div class="pos"><span id="pi">–</span><small>/ ${N}</small></div>
      <div class="time" id="pt" title="R 또는 클릭: 타이머 초기화">00:00</div>
      <div class="sp"></div>
      <button class="pv-btn" id="pl">포인터<kbd>L</kbd></button>
      <span class="status" id="ps">${served ? '서버 동기화' : '이 브라우저 안에서만 동기화'}</span>
    </div>
    <div class="stage">
      <div class="cur"><iframe src="${base}?receiver" title="현재 슬라이드"></iframe><div class="hit"></div></div>
      <div class="nxt-row"><div class="nxt"><iframe src="${base}?receiver&offset=1" title="다음 슬라이드"></iframe></div><div class="nxt-title"><span class="lbl">다음</span><b id="pnx">–</b><span id="pnxs"></span></div></div>
    </div>
    <div class="pv-notes">
      <div class="hd"><span class="lbl" id="pnt">노트</span><button class="pv-btn" id="pfs" aria-label="노트 글자 작게">A−</button><button class="pv-btn" id="pfl" aria-label="노트 글자 크게">A+</button><button class="pv-btn" id="pe">수정<kbd>E</kbd></button></div>
      <div class="title" id="ptt"></div>
      <div class="sub" id="pts"></div>
      <div class="notes-view" id="pnv"></div>
      <textarea class="notes-edit" id="pne" spellcheck="false" aria-label="노트 편집"></textarea>
      <div class="md-hint">줄바꿈으로 문단 구분 · **굵게**는 강조어로 표시 · Cmd/Ctrl+S 저장</div>
      <div class="fb" id="pfb">
        <button class="fb-add" id="pfa">＋ 피드백 추가</button>
        <div class="fb-box">
          <div class="row"><span class="lbl">피드백</span><span class="fb-scope"><button data-scope="slide" class="on">이 슬라이드</button><button data-scope="deck">덱 전체</button></span></div>
          <div class="fb-kind" role="group" aria-label="피드백 종류">${KINDS.map(([k, t]) => `<button data-kind="${k}"${k === 'edit' ? ' class="on"' : ''}>${t}</button>`).join('')}</div>
          <textarea id="pft" placeholder="고칠 점을 적어 두면 다음 수정 라운드에 한 번에 반영합니다"></textarea>
          <div class="foot"><span id="pfs2">자동 저장</span><span class="sp"></span><button class="pv-btn" id="pfc">접기</button></div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(pv);
  const $ = s => pv.querySelector(s);
  let pointerOn = false, editing = false, fbScope = 'slide', fbKind = 'edit', fbDoc = { version: 2, slides: {} }, fbTimer = null;
  // A note edit and a feedback entry stay pinned to the slide they were started on:
  // the deck can move under the presenter mid-edit, and a save must never land elsewhere.
  let editTarget = null, fbTarget = null, fbLoadedKey = null;
  const store = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private window */ } } };
  let fs = parseInt(store.get('dk-notes-fs') || '22', 10);
  const setFs = v => { fs = Math.max(16, Math.min(32, v)); store.set('dk-notes-fs', fs); document.documentElement.style.setProperty('--dk-notes-fs', fs + 'px'); };
  setFs(fs);
  let t0 = Date.now();
  const tick = () => { const s = Math.floor((Date.now() - t0) / 1000); $('#pt').textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  setInterval(tick, 1000);
  const resetTimer = () => { t0 = Date.now(); tick(); };
  $('#pt').onclick = resetTimer;
  const clock = () => new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  function setStatus(t, ok) { const s = $('#ps'); s.textContent = t; s.classList.toggle('ok', !!ok); }

  function render() {
    $('#pi').textContent = String(index + 1).padStart(2, '0');
    prog.style.width = ((index + 1) / N * 100) + '%';
    $('#pnt').textContent = idOf(index) + ' · ' + (slides[index].dataset.key || '');
    $('#ptt').textContent = titleOf(index);
    $('#pts').textContent = textOf(index, '.ko-sub');
    $('#pnx').textContent = index + 1 < N ? titleOf(index + 1) : '마지막 슬라이드';
    $('#pnxs').textContent = index + 1 < N ? textOf(index + 1, '.ko-sub') : '';
    const a = notesOf(index);
    $('#pnv').innerHTML = a && a.textContent.trim() ? notesToHtml(a.textContent) : '<p class="empty">이 슬라이드에는 노트가 없습니다. 수정을 눌러 적어 두세요.</p>';
    $('#pnv').scrollTop = 0;
    history.replaceState(null, '', '?presenter#' + (index + 1));
    pv.querySelectorAll('iframe').forEach(f => f.contentWindow && f.contentWindow.postMessage({ t: 'state', index }, '*'));
    loadFb();
  }
  let navHold = 0;
  // The one place index moves: a pending feedback autosave is flushed to its pinned slide first.
  function setIndex(next) {
    next = Math.max(0, Math.min(N - 1, next));
    if (next !== index) { flushFb(); index = next; fbTarget = null; }
    render();
  }
  function nav(dir) {
    navHold = Date.now() + 1500;
    if (served) post(api + 'sync/nav', { dir }); else bc && bc.postMessage({ t: 'nav', dir });
    setIndex(index + (dir === 'next' ? 1 : -1));
    bc && bc.postMessage({ t: 'state', index });
  }
  $('#pp').onclick = () => nav('prev'); $('#pn').onclick = () => nav('next');
  $('#pfs').onclick = () => setFs(fs - 2); $('#pfl').onclick = () => setFs(fs + 2);

  // pointer: coordinates are fractions of the slide, so every screen size agrees
  let lastPtr = 0;
  const clamp01 = v => Math.max(0, Math.min(1, v));
  function sendPointer(x, y, on) { const now = Date.now(); if (on && now - lastPtr < 80) return; lastPtr = now; x = clamp01(x); y = clamp01(y); const msg = { t: 'pointer', x, y, on }; bc && bc.postMessage(msg); if (served) post(api + 'sync/pointer', { x, y, on }); }
  $('#pl').onclick = () => { pointerOn = !pointerOn; $('#pl').classList.toggle('on', pointerOn); $('.cur').classList.toggle('pointing', pointerOn); if (!pointerOn) sendPointer(0, 0, false); };
  const hit = $('.cur .hit');
  hit.addEventListener('mousemove', e => { if (!pointerOn) return; const r = hit.getBoundingClientRect(); sendPointer((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height, true); });
  hit.addEventListener('mouseleave', () => { if (pointerOn) sendPointer(0, 0, false); });
  hit.addEventListener('touchmove', e => { if (!pointerOn) return; const t = e.touches[0], r = hit.getBoundingClientRect(); sendPointer((t.clientX - r.left) / r.width, (t.clientY - r.top) / r.height, true); e.preventDefault(); }, { passive: false });
  hit.addEventListener('touchend', () => { if (pointerOn) sendPointer(0, 0, false); });

  function showRebuilt() {
    let banner = document.getElementById('dk-rebuilt');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'dk-rebuilt';
      banner.textContent = '발표 자료가 다시 만들어졌습니다 — 편집 중인 노트를 복사한 뒤 새로고침하고 다시 적용하세요';
      pv.insertBefore(banner, pv.firstChild);
    }
    $('#pe').disabled = true;
  }
  // notes edit (plain text, saved into this deck's aside.notes on the server)
  function toggleEdit() {
    const ta = $('#pne'), v = $('#pnv'), box = $('.pv-notes');
    if (!editing) { editTarget = index; const a0 = notesOf(editTarget); ta.value = a0 ? a0.textContent.trim() : ''; ta.style.display = 'block'; v.style.display = 'none'; box.classList.add('editing'); $('#pe').firstChild.textContent = '저장'; editing = true; ta.focus(); return; }
    const target = editTarget == null ? index : editTarget;
    const text = ta.value.replace(/\r\n/g, '\n').trim();
    const a = notesOf(target); if (a) a.textContent = text;
    ta.style.display = 'none'; v.style.display = 'block'; box.classList.remove('editing'); $('#pe').firstChild.textContent = '수정'; editing = false; editTarget = null; render();
    if (served && notesOn) post(api + 'save-notes', { slide_id: idOf(target), notes_html: esc(text), build: buildId() }).then(r => {
      if (r && r.status === 409) { showRebuilt(); setStatus('자료가 바뀌어 저장 거부됨', false); return; }
      setStatus(r && r.ok ? `노트 저장됨 ${clock()}` : '노트 저장 실패', !!(r && r.ok));
    });
    else setStatus('오프라인 — 이 창에서만 반영됨', false);
  }
  $('#pe').onclick = toggleEdit;

  // feedback
  if (served) fetch(api + 'feedback', { cache: 'no-store' }).then(r => r.ok ? r.json() : Promise.reject(r.status)).then(j => { fbDoc = j; loadFb(); }).catch(() => {});
  function fbKey(target) { return fbScope === 'deck' ? 'deck' : idOf(target); }
  function loadFb() {
    const entry = fbScope === 'deck' ? fbDoc.deck : (fbDoc.slides || {})[idOf(index)];
    const key = fbKey(index), ta = $('#pft');
    // Focus protects a draft only while the feedback target stays the same.
    if (key !== fbLoadedKey || document.activeElement !== ta) {
      ta.value = entry ? entry.text : '';
      setKind(fbScope === 'deck' ? 'edit' : ((entry && entry.kind) || 'edit'));
    }
    fbLoadedKey = key;
    $('#pfb').classList.toggle('deck-scope', fbScope === 'deck');
    $('#pfb').classList.toggle('open', !!entry || $('#pfb').dataset.forced === '1');
    $('#pfs2').textContent = entry ? `저장됨 · ${new Date(entry.updated_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}` : '자동 저장';
  }
  function saveFb(target) {
    if (target == null) target = index;
    const scope = fbScope, key = fbKey(target), text = $('#pft').value, kind = scope === 'deck' ? 'edit' : fbKind;
    const body = { slide_id: key, text, kind }; if (scope !== 'deck') body.title = titleOf(target);
    post(api + 'feedback', body).then(r => {
      if (!(r && r.ok)) { $('#pfs2').textContent = served ? '저장 실패' : '오프라인 — 저장되지 않음'; return; }
      if (text.trim() === '') { if (scope === 'deck') delete fbDoc.deck; else delete fbDoc.slides[key]; }
      else { const e = { text, kind, updated_at: new Date().toISOString() }; if (scope === 'deck') fbDoc.deck = e; else { e.title = titleOf(target); fbDoc.slides = fbDoc.slides || {}; fbDoc.slides[key] = e; } }
      $('#pfs2').textContent = `저장됨 · ${clock()}`;
    });
  }
  function flushFb() { if (fbTimer === null) return; clearTimeout(fbTimer); fbTimer = null; saveFb(fbTarget); }
  $('#pfa').onclick = () => { $('#pfb').dataset.forced = '1'; fbTarget = index; $('#pfb').classList.add('open'); $('#pft').focus(); };
  $('#pfc').onclick = () => { flushFb(); fbTarget = null; $('#pfb').dataset.forced = '0'; loadFb(); };
  $('#pft').addEventListener('input', () => {
    if (fbTarget === null) fbTarget = index;
    const target = fbTarget;
    clearTimeout(fbTimer); fbTimer = setTimeout(() => { fbTimer = null; saveFb(target); }, 800);
  });
  pv.querySelectorAll('.fb-scope button').forEach(b => b.onclick = () => { flushFb(); fbTarget = null; fbScope = b.dataset.scope; pv.querySelectorAll('.fb-scope button').forEach(x => x.classList.toggle('on', x === b)); loadFb(); });
  function setKind(k) { fbKind = k; pv.querySelectorAll('.fb-kind button').forEach(x => x.classList.toggle('on', x.dataset.kind === k)); }
  // a kind change on a saved entry is saved at once (the text did not change, so no input event fires)
  pv.querySelectorAll('.fb-kind button').forEach(b => b.onclick = () => { setKind(b.dataset.kind); if (fbTarget === null) fbTarget = index; if ($('#pft').value.trim()) { clearTimeout(fbTimer); fbTimer = null; saveFb(fbTarget); } });

  document.addEventListener('keydown', e => {
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'textarea' || tag === 'input') { if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); if (editing) toggleEdit(); } return; }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); nav('next'); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); nav('prev'); }
    else if (e.key === 'l' || e.key === 'L') { e.preventDefault(); $('#pl').click(); }
    else if (e.key === 'e' || e.key === 'E') { e.preventDefault(); toggleEdit(); }
    else if (e.key === 'r' || e.key === 'R') resetTimer();
  });
  // follow the main deck
  bc && (bc.onmessage = e => { if (e.data.t === 'state' && e.data.index !== index && !editing) setIndex(e.data.index); });
  if (served) (function poll() { fetch(api + 'sync?cmd_after=' + seqSeen, { cache: 'no-store' }).then(r => r.json()).then(d => { if (rebuilt(d)) { if (editing) return showRebuilt(); return reloadForRebuild(); } if (d.state && typeof d.state.index === 'number' && d.state.index !== index && !editing && Date.now() > navHold) setIndex(d.state.index); }).catch(() => {}).finally(() => setTimeout(poll, 500)); })();
  pv.querySelectorAll('iframe').forEach(f => f.addEventListener('load', () => f.contentWindow.postMessage({ t: 'state', index }, '*')));
  render();
})();
