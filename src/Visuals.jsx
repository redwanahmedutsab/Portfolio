import { useSeen } from "./hooks.jsx";

// ---------- project art ----------
export function CareerArt() {
  return (
    <svg viewBox="0 0 320 140" className="art" aria-hidden="true">
      {[["Query", 18], ["Retrieve", 118], ["Generate", 218]].map(([t, x], i) => (
        <g key={t}><rect x={x} y="48" width="84" height="44" rx="12" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.6)" /><text x={x + 42} y="75" textAnchor="middle" className="at">{t}</text>
          {i < 2 && <path className="flow" d={`M${x + 86} 70H${x + 114}`} />}</g>
      ))}
    </svg>
  );
}
export function PropArt() {
  return (
    <svg viewBox="0 0 320 140" className="art" aria-hidden="true">
      <path d="M40 110V68L76 40L112 68V110Z" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.7)" strokeWidth="2" />
      <path className="flow" d="M150 112C190 112 200 80 230 76S280 40 300 30" />
      <text x="224" y="134" textAnchor="middle" className="at">ML price prediction</text>
    </svg>
  );
}
export function CampArt() {
  return (
    <svg viewBox="0 0 320 140" className="art" aria-hidden="true">
      {[["Marketplace", 60, 22], ["Events", 170, 22], ["Lost & Found", 60, 78], ["Users", 170, 78]].map(([t, x, y], i) => (
        <g key={t}><rect className="tile" x={x} y={y} width="96" height="42" rx="10" style={{ "--k": `${i * 0.5}s` }} /><text x={x + 48} y={y + 26} textAnchor="middle" className="at">{t}</text></g>
      ))}
    </svg>
  );
}

// ---------- skill icons (simple line icons) ----------
const ICONS = {
  spark: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  brain: "M9 4a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 006 1V5a2 2 0 00-3-1zM15 4a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5 3 3 0 01-6 1",
  db: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  server: "M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01",
  table: "M3 5h18v14H3zM3 10h18M9 5v14",
  rocket: "M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-4-4zM9 12l-3-.5 2-3 3 1M12 15l.5 3 3-2-1-3",
  code: "M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z",
  pin: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  github: "M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z",
  linkedin: "M4 9h4v11H4zM6 3.5a2 2 0 110 4 2 2 0 010-4zM10 9h3.8v1.6c.6-1.1 1.9-1.9 3.6-1.9 3.2 0 4.6 2 4.6 5.3V20h-4v-5.2c0-1.4-.6-2.4-2-2.4s-2 1-2 2.4V20h-4z",
  trophy: "M7 4h10v5a5 5 0 01-10 0zM7 6H4v1a3 3 0 003 3M17 6h3v1a3 3 0 01-3 3M12 14v4M8 21h8M10 18h4",
  code2: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  copy: "M9 9h11v11H9zM5 15V5h10",
  check: "M5 12.5l4.5 4.5L19 7",
  cap: "M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5",
  brief: "M3 8h18v12H3zM9 8V5h6v3M3 13h18",
};
export function Icon({ name, size = 22, fill = false, className = "" }) {
  return (
    <svg className={`ico ${className}`} width={size} height={size} viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

// ---------- data visualizations ----------
export function Ring({ value, label }) {
  const [ref, on] = useSeen(0.5), C = 2 * Math.PI * 54;
  return (
    <figure ref={ref} className="ring">
      <svg viewBox="0 0 130 130" role="img" aria-label={`${value} percent ${label}`}>
        <circle cx="65" cy="65" r="54" className="rt" /><circle cx="65" cy="65" r="54" className="rv2" strokeDasharray={C} strokeDashoffset={on ? C * (1 - value / 100) : C} transform="rotate(-90 65 65)" />
        <text x="65" y="74" textAnchor="middle" className="rn">{value}%</text>
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export function Bars({ title, before, after, note }) {
  const [ref, on] = useSeen(0.5);
  return (
    <div ref={ref} className="bars">
      <h4>{title}</h4>
      <div className="row"><span>Before</span><i><b style={{ width: on ? `${before}%` : 0 }} className="b0" /></i></div>
      <div className="row"><span>After</span><i><b style={{ width: on ? `${after}%` : 0, transitionDelay: ".3s" }} className="b1" /></i></div>
      <p>{note}</p>
    </div>
  );
}

// n squared versus n log n: why the thesis's selective attention matters as sequences get longer.
const pts = (f) => Array.from({ length: 51 }, (_, i) => { const n = (i / 50) * 100; return `${i === 0 ? "M" : "L"}${40 + n * 3.4} ${210 - (f(n) / 10000) * 190}`; }).join("");
export function Growth() {
  const [ref, on] = useSeen(0.4), ratio = Math.round(10000 / (100 * Math.log2(100)));
  return (
    <figure ref={ref} className={`growth${on ? " on" : ""}`}>
      <svg viewBox="0 0 400 250" role="img" aria-label={`Computation as sequence length grows: full attention O(n squared) grows fast, selective attention O(n log n) grows slowly, about ${ratio} times less at n = 100`}>
        <path d="M40 20V210H380" className="axis" />
        <path className="g1" d={pts((n) => n * n)} pathLength="1" /><path className="g2" d={pts((n) => n * Math.log2(Math.max(n, 1)))} pathLength="1" />
        <text x="372" y="236" textAnchor="end" className="gt">sequence length →</text><text x="46" y="16" className="gt">computation</text>
        <text x="190" y="56" className="gl one">Full attention, O(n²)</text><text x="238" y="196" className="gl two">Selective, O(n log n)</text>
      </svg>
      <figcaption>At n = 100, selective attention needs about <b>{ratio}×</b> less computation, and the gap keeps widening.</figcaption>
    </figure>
  );
}
