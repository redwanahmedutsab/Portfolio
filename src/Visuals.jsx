import { useSeen, reduced } from "./hooks.jsx";

// ---------- "AI in one minute": three small animated explainers ----------
const rnd = (s) => { let a = s; return () => ((a = (a * 9301 + 49297) % 233280) / 233280); };
const CENTERS = [[55, 50, "#22d3ee"], [120, 110, "#2f6bff"], [190, 48, "#8f78ff"]];
const r = rnd(7);
const DOTS = Array.from({ length: 21 }, (_, i) => { const [cx, cy, c] = CENTERS[i % 3]; return { sx: 12 + r() * 216, sy: 12 + r() * 136, ex: cx + (r() - 0.5) * 38, ey: cy + (r() - 0.5) * 34, c, dl: (i % 7) * 0.07 }; });

export function Learn() {
  const [ref, on] = useSeen(0.4);
  return (
    <svg ref={ref} className={`viz${on ? " on" : ""}`} viewBox="0 0 240 160" role="img" aria-label="Scattered dots sort themselves into three groups">
      {DOTS.map((d, i) => <circle key={i} className="dotc" r="6" fill={d.c} style={{ "--sx": `${d.sx}px`, "--sy": `${d.sy}px`, "--ex": `${d.ex}px`, "--ey": `${d.ey}px`, "--dl": `${d.dl}s` }} />)}
    </svg>
  );
}

export function Meaning() {
  const [ref, on] = useSeen(0.4);
  const rows = [["Data analyst", 0.92, 30], ["ML engineer", 0.8, 70], ["Barista", 0.22, 110]];
  return (
    <svg ref={ref} className={`viz${on ? " on" : ""}`} viewBox="0 0 260 160" role="img" aria-label="A question is matched to the closest meanings: data analyst and ML engineer are close, barista is far">
      <rect x="4" y="52" width="86" height="40" rx="10" fill="#0b1437" /><text x="47" y="69" textAnchor="middle" className="vt">I want a</text><text x="47" y="83" textAnchor="middle" className="vt">data career</text>
      {rows.map(([t, v, y], i) => (
        <g key={t}>
          <path className="vline" d={`M90 72C120 72 110 ${y + 14} 134 ${y + 14}`} style={{ "--k": `${0.2 + i * 0.2}s` }} />
          <text x="138" y={y + 8} className="vt dark">{t}</text>
          <rect x="138" y={y + 14} width="116" height="8" rx="4" fill="#dfe5f6" />
          <rect className="vbar" x="138" y={y + 14} width={116 * v} height="8" rx="4" fill={v > 0.5 ? "#2f6bff" : "#9aa6cf"} style={{ "--k": `${0.5 + i * 0.2}s` }} />
        </g>
      ))}
    </svg>
  );
}

export function Predict() {
  const [ref, on] = useSeen(0.4);
  const pts = [[30, 128], [55, 112], [78, 118], [100, 92], [124, 96], [146, 70], [170, 78], [192, 50], [214, 52]];
  return (
    <svg ref={ref} className={`viz${on ? " on" : ""}`} viewBox="0 0 240 160" role="img" aria-label="Points rising to the right with a line fitted through them, predicting the next value">
      <line x1="20" y1="140" x2="228" y2="140" stroke="#c8d1ec" /><line x1="20" y1="20" x2="20" y2="140" stroke="#c8d1ec" />
      {pts.map(([x, y], i) => <circle key={i} className="ppt" cx={x} cy={y} r="5" fill="#2f6bff" style={{ "--k": `${i * 0.07}s` }} />)}
      <path className="fitline" d="M26 128L222 46" pathLength="1" />
      <circle className="pred" cx="222" cy="46" r="8" fill="#8f78ff" /><text x="222" y="30" textAnchor="middle" className="vt dark">prediction</text>
    </svg>
  );
}

// ---------- project art ----------
export function CareerArt() {
  return (
    <svg viewBox="0 0 320 140" className="art" aria-hidden="true">
      {[["Question", 18], ["Search", 118], ["Answer", 218]].map(([t, x], i) => (
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
      <text x="224" y="124" textAnchor="middle" className="at">estimated price</text>
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

// ---------- data visualizations ----------
export function Ring({ value, label }) {
  const [ref, on] = useSeen(0.5), C = 2 * Math.PI * 54;
  return (
    <figure ref={ref} className="ring">
      <svg viewBox="0 0 130 130" role="img" aria-label={`${value} percent`}>
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

// n squared versus n log n: why "reading smarter" matters as text gets longer.
const pts = (f) => Array.from({ length: 51 }, (_, i) => { const n = (i / 50) * 100; return `${i === 0 ? "M" : "L"}${40 + n * 3.4} ${210 - (f(n) / 10000) * 190}`; }).join("");
export function Growth() {
  const [ref, on] = useSeen(0.4), ratio = Math.round(10000 / (100 * Math.log2(100)));
  return (
    <figure ref={ref} className={`growth${on ? " on" : ""}`}>
      <svg viewBox="0 0 400 250" role="img" aria-label={`Work needed as text grows: reading everything against everything grows fast, selective reading grows slowly, about ${ratio} times less at 100 words`}>
        <path d="M40 20V210H380" className="axis" />
        <path className="g1" d={pts((n) => n * n)} pathLength="1" /><path className="g2" d={pts((n) => n * Math.log2(Math.max(n, 1)))} pathLength="1" />
        <text x="372" y="236" textAnchor="end" className="gt">longer text →</text><text x="46" y="16" className="gt">more work</text>
        <text x="236" y="56" className="gl one">Every word vs every word</text><text x="262" y="196" className="gl two">Selective reading</text>
      </svg>
      <figcaption>At 100 words, selective reading needs about <b>{ratio}×</b> less work, and the gap keeps growing.</figcaption>
    </figure>
  );
}
