import { useEffect, useRef } from "react";

// Hero background: a small neural network that "thinks". Signals travel forward through the layers,
// nodes light up as they receive them, and the cursor excites nearby nodes. Click to send a signal.
const LAYERS = [4, 6, 7, 6, 3];
const COLORS = ["#22d3ee", "#38a3ff", "#2f6bff", "#6d5cff", "#9b7bff"];
const LABELS = { 0: "What goes in", 2: "Where patterns form", 4: "What comes out" };

export default function Neural() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const mouse = { x: -999, y: -999 };
    let w = 0, h = 0, nodes = [], out = [], pulses = [], parts = [], raf, visible = true, nextWave = 600, y1 = 0;

    const layout = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mob = w < 860, x0 = mob ? w * 0.1 : w * 0.44, x1 = mob ? w * 0.9 : w * 0.94, y0 = mob ? h * 0.6 : h * 0.18;
      y1 = mob ? h * 0.9 : h * 0.78;
      nodes = []; out = [];
      LAYERS.forEach((n, l) => { for (let k = 0; k < n; k++) nodes.push({ l, hx: x0 + ((x1 - x0) * l) / (LAYERS.length - 1), hy: y0 + (y1 - y0) * ((k + 0.5) / n), x: 0, y: 0, e: 0, ph: Math.random() * 6 }); });
      nodes.forEach((a, i) => { out[i] = []; nodes.forEach((b, j) => a.l + 1 === b.l && out[i].push(j)); });
      const count = Math.max(30, Math.min(80, Math.round((w * h) / 20000)));
      parts = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25 }));
    };

    const send = (i) => {
      const targets = out[i].slice().sort(() => Math.random() - 0.5).slice(0, 3);
      targets.forEach((j) => pulses.length < 260 && pulses.push({ a: i, b: j, t: 0, sp: 0.8 + Math.random() * 0.5 }));
    };
    const fire = (all) => nodes.forEach((n, i) => n.l === 0 && (all || Math.random() < 0.6) && (n.e = 1, send(i)));

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
      nodes.forEach((a, i) => out[i].forEach((j) => {
        const b = nodes[j];
        ctx.strokeStyle = `rgba(110,150,255,${0.1 + 0.45 * a.e * b.e + 0.12 * Math.max(a.e, b.e)})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }));
      // cursor links
      nodes.forEach((n) => { const d = Math.hypot(n.x - mouse.x, n.y - mouse.y); if (d < 170) { ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 170) * 0.55})`; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); } });
      // signals
      pulses = pulses.filter((p) => {
        p.t += dt * p.sp;
        const a = nodes[p.a], b = nodes[p.b];
        if (p.t >= 1) { b.e = 1; if (out[p.b].length && Math.random() < 0.85) send(p.b); return false; }
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = "rgba(34,211,238,.28)"; ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.283); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 6.283); ctx.fill();
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
        Object.entries(LABELS).forEach(([l, t]) => { const n = nodes.find((q) => q.l === +l); ctx.fillText(t, n.hx, y1 + 46); });
      }
    };

    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (visible) {
        nextWave -= dt * 1000; if (nextWave <= 0) { fire(false); nextWave = 2600; }
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
