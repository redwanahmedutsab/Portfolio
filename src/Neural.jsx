import { useEffect, useRef } from "react";

// Hero background: a small neural network that "thinks". Each signal wave travels stage by stage:
// input layer -> hidden layers -> output layer. Nodes light up as they receive data, the output layer
// flashes when the prediction arrives, the cursor excites nearby nodes, and a click sends a wave.
const LAYERS = [4, 6, 7, 6, 3];
const LAST = LAYERS.length - 1;
const COLORS = ["#22d3ee", "#38a3ff", "#2f6bff", "#6d5cff", "#9b7bff"];
const LABELS = { 0: "Input layer", 2: "Hidden layers", 4: "Output layer" };
const SPEED = 1.15; // edge traversals per second, so a full wave takes about 3.5s

export default function Neural({ run = true }) {
  const ref = useRef(null);
  const runRef = useRef(run);
  runRef.current = run;

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const mouse = { x: -999, y: -999 };
    let w = 0, h = 0, nodes = [], edges = [], byLayer = [], pulses = [], waves = [], parts = [], rings = [];
    let raf, visible = true, nextWave = 400, y1 = 0;

    const layout = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mob = w <= 720, x0 = mob ? w * 0.1 : w * (w < 1200 ? 0.6 : 0.54), x1 = mob ? w * 0.9 : w * 0.94, y0 = mob ? h - 340 : h * 0.18;
      y1 = mob ? h - 110 : h * 0.78; // on phones the network sits in the padded strip under the text
      nodes = []; byLayer = LAYERS.map(() => []);
      LAYERS.forEach((n, l) => { for (let k = 0; k < n; k++) { byLayer[l].push(nodes.length); nodes.push({ l, hx: x0 + ((x1 - x0) * l) / LAST, hy: y0 + (y1 - y0) * ((k + 0.5) / n), x: 0, y: 0, e: 0, ph: Math.random() * 6 }); } });
      // fully connected: every node feeds every node in the next layer
      edges = [];
      for (let l = 0; l < LAST; l++) byLayer[l].forEach((a) => byLayer[l + 1].forEach((b) => edges.push([a, b])));
      const count = Math.max(30, Math.min(80, Math.round((w * h) / 20000)));
      parts = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25 }));
    };

    // A wave moves one layer at a time. Stage s sends a pulse along every edge from layer s to s+1;
    // when the last pulse of the stage lands, the next stage starts. Stage LAST-1 ends at the output.
    const startStage = (wave) => {
      const l = wave.stage;
      wave.left = 0;
      edges.forEach(([a, b]) => {
        if (nodes[a].l !== l) return;
        wave.left++;
        pulses.push({ a, b, t: -Math.random() * 0.18, sp: SPEED * (0.9 + Math.random() * 0.2), wave, br: 0.55 + Math.random() * 0.45 });
      });
    };
    const fire = (all) => {
      const wave = { stage: 0, left: 0 };
      byLayer[0].forEach((i) => { if (all || Math.random() < 0.75) nodes[i].e = 1; });
      waves.push(wave); startStage(wave);
    };
    const land = (p) => {
      const b = nodes[p.b]; b.e = Math.min(1, b.e + 0.45);
      const wave = p.wave; wave.left--;
      if (wave.left > 0) return;
      const arrived = wave.stage + 1; // layer that just received the whole stage
      byLayer[arrived].forEach((i) => (nodes[i].e = 1));
      if (arrived === LAST) {
        byLayer[LAST].forEach((i) => rings.push({ i, t: 0 }));
        waves.splice(waves.indexOf(wave), 1);
      } else { wave.stage = arrived; startStage(wave); }
    };

    const draw = (now, dt) => {
      ctx.clearRect(0, 0, w, h);
      const m = reduced ? 0 : 1;
      nodes.forEach((n) => {
        n.x = n.hx + Math.sin(now / 1500 + n.ph) * 5 * m; n.y = n.hy + Math.cos(now / 1800 + n.ph) * 5 * m;
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120) { n.x += (dx / (d || 1)) * (1 - d / 120) * 12; n.y += (dy / (d || 1)) * (1 - d / 120) * 12; n.e = Math.max(n.e, (1 - d / 120) * 0.8); }
        n.e = Math.max(0, n.e - dt * 0.7);
      });
      // drifting particles with faint links
      for (const p of parts) {
        p.x = (p.x + p.vx * m + w) % w; p.y = (p.y + p.vy * m + h) % h;
        ctx.fillStyle = "rgba(160,190,255,.45)"; ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, 6.283); ctx.fill();
      }
      for (let i = 0; i < parts.length; i++) for (let j = i + 1; j < parts.length; j++) {
        const d = Math.hypot(parts[i].x - parts[j].x, parts[i].y - parts[j].y);
        if (d < 90) { ctx.strokeStyle = `rgba(120,160,255,${(1 - d / 90) * 0.16})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(parts[i].x, parts[i].y); ctx.lineTo(parts[j].x, parts[j].y); ctx.stroke(); }
      }
      // connections
      edges.forEach(([i, j]) => {
        const a = nodes[i], b = nodes[j];
        ctx.strokeStyle = `rgba(110,150,255,${0.1 + 0.45 * a.e * b.e + 0.12 * Math.max(a.e, b.e)})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });
      // cursor links
      nodes.forEach((n) => { const d = Math.hypot(n.x - mouse.x, n.y - mouse.y); if (d < 170) { ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 170) * 0.55})`; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); } });
      // signals
      const landed = [];
      pulses = pulses.filter((p) => {
        p.t += dt * p.sp;
        if (p.t >= 1) { landed.push(p); return false; }
        if (p.t < 0) return true;
        const a = nodes[p.a], b = nodes[p.b];
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = `rgba(34,211,238,${0.28 * p.br})`; ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.283); ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${0.55 + 0.45 * p.br})`; ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 6.283); ctx.fill();
        return true;
      });
      landed.forEach(land);
      // output rings: the prediction arriving
      rings = rings.filter((r) => {
        r.t += dt * 1.1; if (r.t >= 1) return false;
        const n = nodes[r.i];
        ctx.strokeStyle = `rgba(155,123,255,${0.7 * (1 - r.t)})`; ctx.lineWidth = 2.5 * (1 - r.t) + 0.5;
        ctx.beginPath(); ctx.arc(n.x, n.y, 12 + 38 * r.t, 0, 6.283); ctx.stroke();
        return true;
      });
      // nodes
      nodes.forEach((n) => {
        if (n.e > 0.02) { ctx.fillStyle = COLORS[n.l] + Math.round(n.e * 70).toString(16).padStart(2, "0"); ctx.beginPath(); ctx.arc(n.x, n.y, 9 + 16 * n.e, 0, 6.283); ctx.fill(); }
        ctx.fillStyle = COLORS[n.l]; ctx.beginPath(); ctx.arc(n.x, n.y, 5.5 + 2 * n.e, 0, 6.283); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.75)"; ctx.lineWidth = 1.5; ctx.stroke();
      });
      if (w > 380) {
        ctx.font = "500 13px Geist, system-ui, sans-serif"; ctx.textAlign = "center"; ctx.fillStyle = "rgba(200,215,255,.75)";
        Object.entries(LABELS).forEach(([l, t]) => { const n = nodes[byLayer[+l][0]]; ctx.fillText(t, n.hx, y1 + 46); });
      }
    };

    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (visible && runRef.current) {
        nextWave -= dt * 1000; if (nextWave <= 0) { fire(false); nextWave = 2400; }
        draw(now, dt);
      }
      raf = requestAnimationFrame(loop);
    };
    layout();
    const ro = new ResizeObserver(() => { layout(); if (reduced) draw(0, 0); }); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(cv);
    const move = (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const leave = () => { mouse.x = mouse.y = -999; };
    const click = () => !reduced && fire(true);
    cv.addEventListener("pointermove", move); cv.addEventListener("pointerleave", leave); cv.addEventListener("pointerdown", click);
    if (reduced) draw(0, 0); else raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); cv.removeEventListener("pointermove", move); cv.removeEventListener("pointerleave", leave); cv.removeEventListener("pointerdown", click); };
  }, []);
  return <canvas ref={ref} className="neural" aria-hidden="true" />;
}
