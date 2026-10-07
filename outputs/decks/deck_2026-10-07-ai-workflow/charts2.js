(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, parent, text) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) { e.setAttribute(k, attrs[k]); }
    if (text !== undefined) { e.textContent = text; }
    if (parent) { parent.appendChild(e); }
    return e;
  };
  const CL = '#2F5BEA', CX = '#14B07F', INK = '#14161B', INK2 = '#4A5160', INK3 = '#8A92A0', RULE = '#C9CED6';

  // ---- parallel swimlane (2026-10-06, Worker attempts)
  const par = document.getElementById('par-svg');
  if (par) {
    const S = [
      ['dotfiles', 'dotfiles-58ll8', 'claude', '11:49', '12:18'],
      ['CRC-rokit', 'rokit-0y1', 'claude', '12:00', '12:36'],
      ['oliveyoung', 'oliveyoung-9f3', 'codex', '12:29', '12:46'],
      ['dotfiles', 'dotfiles-hg6hv', 'codex', '12:31', '12:41'],
      ['microbiome_bile', 'Analysis-zwkj', 'codex', '12:34', '12:48'],
      ['CRC-rokit', 'rokit-viw', 'codex', '12:41', '12:50'],
      ['microbiome_bile', 'Analysis-e0vp', 'codex', '12:41', '12:52'],
      ['prostate', 'PROSTATE-vwl', 'codex', '12:41', '12:48'],
      ['dotfiles', 'dotfiles-lb188', 'claude', '12:45', '13:24'],
      ['microbiome_bile', 'Analysis-f2ie', 'claude', '13:00', '13:10'],
      ['microbiome_bile', 'Analysis-vfnz', 'claude', '13:01', '13:51'],
    ];
    const m = t => { const [h, mi] = t.split(':').map(Number); return h * 60 + mi; };
    const T0 = m('11:45'), T1 = m('14:00'), X0 = 230, X1 = 970;
    const x = t => X0 + (t - T0) / (T1 - T0) * (X1 - X0);
    const RH = 30, Y0 = 34;
    const yEnd = Y0 + S.length * RH;
    for (let t = T0; t <= T1; t += 15) {
      el('line', { x1: x(t), x2: x(t), y1: Y0 - 8, y2: yEnd, stroke: RULE, 'stroke-width': t % 60 === 0 ? 1.2 : .6 }, par);
      const lab = `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
      el('text', { x: x(t), y: Y0 - 14, 'text-anchor': 'middle', 'font-size': 13, fill: INK3 }, par, lab);
    }
    S.forEach((s, i) => {
      const y = Y0 + i * RH;
      el('text', { x: 0, y: y + 19, 'font-size': 14.5, fill: INK }, par, s[0]);
      el('text', { x: X0 - 10, y: y + 19, 'font-size': 12.5, fill: INK3, 'text-anchor': 'end', style: 'font-family:var(--mono)' }, par, s[1]);
      const r = el('rect', { x: x(m(s[3])), y: y + 6, width: Math.max(3, x(m(s[4])) - x(m(s[3]))), height: RH - 12, rx: 4, fill: s[2] === 'claude' ? CL : CX }, par);
      el('title', {}, r, `${s[1]} · ${s[2]} · ${s[3]}–${s[4]}`);
    });
    // concurrency step line
    const CY0 = yEnd + 40, CH = 96, MAXC = 6;
    const yc = c => CY0 + CH - c / MAXC * CH;
    el('text', { x: 0, y: CY0 + 14, 'font-size': 14.5, fill: INK }, par, '동시 세션 수');
    for (let c = 0; c <= MAXC; c += 2) {
      el('line', { x1: X0, x2: X1, y1: yc(c), y2: yc(c), stroke: RULE, 'stroke-width': c === 0 ? 1.2 : .6 }, par);
      el('text', { x: X0 - 10, y: yc(c) + 4, 'font-size': 12.5, fill: INK3, 'text-anchor': 'end' }, par, String(c));
    }
    let d = '', peak = 0, peakT = T0;
    for (let t = T0; t <= T1; t++) {
      const c = S.filter(s => m(s[3]) <= t && t < m(s[4])).length;
      if (c > peak) { peak = c; peakT = t; }
      d += (t === T0 ? 'M' : 'L') + x(t).toFixed(1) + ' ' + yc(c).toFixed(1) + ' ';
    }
    el('path', { d: d + `L${X1} ${yc(0)} L${X0} ${yc(0)} Z`, fill: 'rgba(138,146,160,.18)' }, par);
    el('path', { d, fill: 'none', stroke: INK2, 'stroke-width': 2, 'stroke-linejoin': 'round' }, par);
    el('circle', { cx: x(peakT), cy: yc(peak), r: 5, fill: INK, stroke: '#ECEEF1', 'stroke-width': 2 }, par);
    el('text', { x: x(peakT) + 10, y: yc(peak) - 6, 'font-size': 14, fill: INK, 'font-weight': 600 }, par, `${peak}개 동시`);
  }

  // ---- daily usage (API-equivalent USD), 2026-09-07 .. 2026-10-07
  const use = document.getElementById('use-svg');
  if (use) {
    const days = ['09-07','09-08','09-09','09-10','09-11','09-12','09-13','09-14','09-15','09-16','09-17','09-18','09-19','09-20','09-21','09-22','09-23','09-24','09-25','09-26','09-27','09-28','09-29','09-30','10-01','10-02','10-03','10-04','10-05','10-06','10-07'];
    const cl = [28,729,608,474,1,0,0,0,473,338,437,127,0,5,922,949,644,0,0,0,0,21,321,685,803,697,328,122,404,868,167];
    const cx = [0,395,26,319,151,0,0,181,1201,185,53,19,16,175,322,218,1,0,0,0,0,0,130,42,89,128,54,41,111,291,2];
    const tok = [24,1312,739,909,166,0,0,154,1687,451,640,227,12,122,1323,1327,850,0,0,0,0,55,642,2052,2146,1777,684,212,799,1652,302];
    const X0 = 64, X1 = 996, Y0 = 16, Y1 = 410, MAX = 1800;
    const y = v => Y1 - v / MAX * (Y1 - Y0);
    for (const v of [0, 500, 1000, 1500]) {
      el('line', { x1: X0, x2: X1, y1: y(v), y2: y(v), stroke: RULE, 'stroke-width': v === 0 ? 1.2 : .6 }, use);
      el('text', { x: X0 - 10, y: y(v) + 5, 'text-anchor': 'end', 'font-size': 14, fill: INK3 }, use, v === 0 ? '$0' : `$${v / 1000}k`);
    }
    const bw = (X1 - X0) / days.length;
    days.forEach((dname, i) => {
      const bx = X0 + i * bw + 4, w = bw - 8;
      const g = el('g', {}, use);
      if (cl[i] > 0) { el('rect', { x: bx, y: y(cl[i]), width: w, height: Y1 - y(cl[i]), rx: cx[i] > 0 ? 1 : 4, fill: CL }, g); }
      if (cx[i] > 0) {
        const top = y(cl[i] + cx[i]), bot = y(cl[i]) - (cl[i] > 0 ? 2 : 0);
        el('rect', { x: bx, y: top, width: w, height: Math.max(1, bot - top), rx: 4, fill: CX }, g);
      }
      el('rect', { x: bx - 4, y: Y0, width: bw, height: Y1 - Y0, fill: 'transparent' }, g);
      el('title', {}, g, `${dname}  Claude $${cl[i]} · Codex $${cx[i]} · ${(tok[i] / 10).toFixed(0)}억 토큰`);
      if (i % 7 === 0) { el('text', { x: bx + w / 2, y: Y1 + 24, 'text-anchor': 'middle', 'font-size': 14, fill: INK3 }, use, dname.replace('-', '/')); }
    });
    const pk = 8;
    el('text', { x: X0 + pk * bw + bw / 2, y: y(cl[pk] + cx[pk]) - 10, 'text-anchor': 'middle', 'font-size': 14, fill: INK, 'font-weight': 600 }, use, '$1.7k');
    const pk2 = 24;
    el('text', { x: X0 + pk2 * bw + bw / 2, y: y(cl[pk2] + cx[pk2]) - 10, 'text-anchor': 'middle', 'font-size': 14, fill: INK, 'font-weight': 600 }, use, '21억 토큰');
  }
})();
