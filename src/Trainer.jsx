import { useEffect, useRef, useState } from "react";
import { reduced, useSeen } from "./hooks.jsx";

// A real (tiny) neural network learning in your browser: 2 inputs -> 10 hidden units -> 1 output.
const mulberry = (a) => () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const gauss = (r) => Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(6.2832 * r());

function makeData(kind) {
  const r = mulberry(kind.length * 97 + 7), pts = [], N = 70;
  for (let i = 0; i < N; i++) {
    if (kind === "groups") {
      pts.push({ x: -0.5 + gauss(r) * 0.22, y: -0.35 + gauss(r) * 0.22, c: 0 }, { x: 0.5 + gauss(r) * 0.22, y: 0.35 + gauss(r) * 0.22, c: 1 });
    } else if (kind === "moons") {
      const t = Math.PI * r(), u = Math.PI * r();
      pts.push({ x: (Math.cos(t) - 0.5) * 0.75 + gauss(r) * 0.06, y: (Math.sin(t) - 0.25) * 0.9 + gauss(r) * 0.06, c: 0 },
               { x: (1 - Math.cos(u) - 0.5) * 0.75 + gauss(r) * 0.06, y: (0.25 - Math.sin(u)) * 0.9 + gauss(r) * 0.06, c: 1 });
    } else {
      const a = 6.2832 * r(), b = 6.2832 * r(), r0 = 0.28 + gauss(r) * 0.05, r1 = 0.7 + gauss(r) * 0.05;
      pts.push({ x: Math.cos(a) * r0, y: Math.sin(a) * r0, c: 0 }, { x: Math.cos(b) * r1, y: Math.sin(b) * r1, c: 1 });
    }
  }
  return pts;
}

class Net {
  constructor(h, seed) {
    const r = mulberry(seed); this.h = h;
    this.W1 = Array.from({ length: h * 2 }, () => (r() * 2 - 1) * 1.5); this.b1 = new Array(h).fill(0);
    this.W2 = Array.from({ length: h }, () => r() * 2 - 1); this.b2 = 0;
  }
  p(x, y) { let o = this.b2; for (let j = 0; j < this.h; j++) o += this.W2[j] * Math.tanh(this.W1[2 * j] * x + this.W1[2 * j + 1] * y + this.b1[j]); return 1 / (1 + Math.exp(-o)); }
  step(pts, lr) {
    const h = this.h, g1 = new Array(h * 2).fill(0), gb1 = new Array(h).fill(0), g2 = new Array(h).fill(0), a = new Array(h);
    let gb2 = 0, loss = 0, ok = 0;
    for (const q of pts) {
      let o = this.b2;
      for (let j = 0; j < h; j++) { a[j] = Math.tanh(this.W1[2 * j] * q.x + this.W1[2 * j + 1] * q.y + this.b1[j]); o += this.W2[j] * a[j]; }
      const p = 1 / (1 + Math.exp(-o)), e = p - q.c;
      loss -= q.c ? Math.log(p + 1e-9) : Math.log(1 - p + 1e-9); if ((p > 0.5) === (q.c === 1)) ok++;
      gb2 += e;
      for (let j = 0; j < h; j++) { g2[j] += e * a[j]; const dz = e * this.W2[j] * (1 - a[j] * a[j]); g1[2 * j] += dz * q.x; g1[2 * j + 1] += dz * q.y; gb1[j] += dz; }
    }
    const n = pts.length; this.b2 -= (lr * gb2) / n;
    for (let j = 0; j < h; j++) { this.W2[j] -= (lr * g2[j]) / n; this.b1[j] -= (lr * gb1[j]) / n; this.W1[2 * j] -= (lr * g1[2 * j]) / n; this.W1[2 * j + 1] -= (lr * g1[2 * j + 1]) / n; }
    return { loss: loss / n, acc: ok / n };
  }
}

const W = 600, H = 430, GW = 60, GH = 43, MAXSTEP = 1500;
const toX = (x) => ((x + 1.2) / 2.4) * W, toY = (y) => ((0.86 - y) / 1.72) * H;
const SETS = [["groups", "Two groups"], ["moons", "Two moons"], ["rings", "Rings"]];

export default function Trainer() {
  const cv = useRef(null), st = useRef(null);
  const [sec, seen] = useSeen(0.35);
  const [kind, setKind] = useState("moons");
  const [view, setView] = useState({ step: 0, loss: 0.7, acc: 0.5, hist: [] });
  const [playing, setPlaying] = useState(false);

  const reset = (k, play) => {
    const pts = makeData(k), net = new Net(10, Math.floor(Math.random() * 1000)), r = net.step(pts, 0);
    st.current = { ...st.current, pts, net, step: 0, loss: r.loss, acc: r.acc, hist: [], play, dirty: true, sync: true };
    setPlaying(play);
  };

  useEffect(() => {
    st.current = { off: Object.assign(document.createElement("canvas"), { width: GW, height: GH }) };
    reset("moons", false);
    const ctx = cv.current.getContext("2d");
    let raf, fr = 0;
    const draw = () => {
      const s = st.current, octx = s.off.getContext("2d"), img = octx.createImageData(GW, GH);
      for (let gy = 0; gy < GH; gy++) for (let gx = 0; gx < GW; gx++) {
        const p = s.net.p(((gx + 0.5) / GW) * 2.4 - 1.2, 0.86 - ((gy + 0.5) / GH) * 1.72), o = (gy * GW + gx) * 4;
        img.data[o] = 34 + 90 * p; img.data[o + 1] = 211 - 119 * p; img.data[o + 2] = 238 + 17 * p; img.data[o + 3] = (0.16 + 0.55 * Math.abs(p - 0.5) * 2) * 255;
      }
      octx.putImageData(img, 0, 0);
      ctx.fillStyle = "#0e1a44"; ctx.fillRect(0, 0, W, H); ctx.imageSmoothingEnabled = true; ctx.drawImage(s.off, 0, 0, W, H);
      for (const q of s.pts) { ctx.beginPath(); ctx.arc(toX(q.x), toY(q.y), 5.5, 0, 6.283); ctx.fillStyle = q.c ? "#8f78ff" : "#22d3ee"; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = "#fff"; ctx.stroke(); }
    };
    const loop = () => {
      const s = st.current;
      if (s.play) {
        for (let i = 0; i < 5; i++) { const r = s.net.step(s.pts, 1.0); s.step++; s.loss = r.loss; s.acc = r.acc; if (s.step % 2 === 0) { s.hist.push(r.loss); if (s.hist.length > 160) s.hist.shift(); } }
        s.dirty = true; s.sync = true;
        if (s.step >= MAXSTEP) { s.play = false; setPlaying(false); }
      }
      if (s.dirty) { draw(); s.dirty = false; }
      if (s.sync && ++fr % 6 === 0) { setView({ step: s.step, loss: s.loss, acc: s.acc, hist: [...s.hist] }); s.sync = false; }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => { if (seen && !reduced && st.current.step === 0) reset(kind, true); }, [seen]);

  const toggle = () => { if (st.current.step >= MAXSTEP) reset(kind, true); else { st.current.play = !st.current.play; setPlaying(st.current.play); } };
  const pick = (k) => { setKind(k); reset(k, true); };
  const max = Math.max(0.8, ...view.hist), pts = view.hist.map((v, i) => `${(i / Math.max(1, view.hist.length - 1)) * 220},${56 - (v / max) * 52}`).join(" ");

  return (
    <div className="trainer" ref={sec}>
      <div className="tr-stage">
        <canvas ref={cv} width={W} height={H} role="img" aria-label="Two kinds of dots, cyan and violet. The colored background shows where the model currently believes each kind belongs." />
        <p className="tr-key"><i className="c0" /> group A <i className="c1" /> group B <span>Background = the model's guess</span></p>
      </div>
      <div className="tr-panel">
        <div className="seg" role="group" aria-label="Pick a puzzle">{SETS.map(([k, l]) => <button key={k} aria-pressed={kind === k} onClick={() => pick(k)}>{l}</button>)}</div>
        <div className="tr-btns">
          <button className="btn primary" onClick={toggle}>{playing ? "Pause" : st.current && st.current.step >= MAXSTEP ? "Train again" : "Train"}</button>
          <button className="btn ghost" onClick={() => reset(kind, false)}>Reset</button>
        </div>
        <dl className="tr-stats">
          <div><dt>Learning steps</dt><dd>{view.step}</dd></div>
          <div><dt>Correct guesses</dt><dd>{Math.round(view.acc * 100)}%</dd></div>
          <div><dt>Mistake score</dt><dd>{view.loss.toFixed(2)}</dd></div>
        </dl>
        <svg className="spark" viewBox="0 0 220 60" role="img" aria-label="Mistake score over time, going down as the model learns"><polyline points={pts} /></svg>
        <p className="tr-note">Each step, the model nudges thousands of tiny dials a little, so it makes fewer mistakes. The mistake score is the line above: lower is better.</p>
      </div>
    </div>
  );
}
