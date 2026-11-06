import { useEffect, useState } from "react";
import { reduced } from "./hooks.jsx";

// Intro: a loading screen with a drawing neural mark and progress count, then a two-door gate that
// slides open to reveal the site. onOpen fires as the doors start to move, so the page can start its
// entrance animations, and the gate removes itself once the doors are gone.
const STATUS = ["Initializing model", "Loading embeddings", "Connecting layers", "Warming up the agent", "Ready"];
const MIN_MS = 2600;

export default function Loader({ onOpen }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading -> opening -> gone

  useEffect(() => {
    const root = document.documentElement;
    if (history.scrollRestoration) history.scrollRestoration = "manual";
    scrollTo(0, 0);
    if (reduced) { onOpen(); setPhase("gone"); return; }
    root.classList.add("locked");

    const t0 = performance.now();
    let raf, loaded = document.readyState === "complete", fontsOk = false, done = false, timers = [];
    if (!loaded) addEventListener("load", () => (loaded = true), { once: true });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => (fontsOk = true));
    setTimeout(() => { loaded = fontsOk = true; }, 6000); // never get stuck on a slow font or image

    const tick = (t) => {
      const time = Math.min(1, (t - t0) / MIN_MS);
      let target = 1 - Math.pow(1 - time, 2.2); // eased, time-based fill
      if (!(loaded && fontsOk)) target = Math.min(target, 0.92); // hold near the end until really loaded
      setPct((p) => Math.max(p, Math.round(target * 100)));
      if (time >= 1 && loaded && fontsOk && !done) {
        done = true; setPct(100);
        timers.push(setTimeout(() => { setPhase("opening"); onOpen(); }, 550));
        timers.push(setTimeout(() => { setPhase("gone"); root.classList.remove("locked"); }, 550 + 1500));
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); root.classList.remove("locked"); };
  }, []);

  if (phase === "gone") return null;
  const status = STATUS[Math.min(STATUS.length - 1, Math.floor(pct / 22))];

  return (
    <div className={`gate ${phase}`} role="status" aria-live="polite" aria-label={`Loading ${pct} percent`}>
      <div className="door dl"><i className="seam" /></div>
      <div className="door dr"><i className="seam" /></div>
      <div className="beam" aria-hidden="true" />
      <div className="gate-core">
        <svg className="gate-mark" viewBox="0 0 120 120" aria-hidden="true">
          <g className="gm-lines">
            <path d="M22 34L60 60L22 86" /><path d="M22 60L60 34M22 60L60 86" /><path d="M60 34L98 60M60 86L98 60M60 60H98" />
          </g>
          {[[22, 34, "#22d3ee"], [22, 60, "#22d3ee"], [22, 86, "#22d3ee"], [60, 34, "#2f6bff"], [60, 60, "#6d5cff"], [60, 86, "#2f6bff"], [98, 60, "#fff"]].map(([x, y, c], i) => (
            <circle key={i} className="gm-dot" cx={x} cy={y} r="6.5" fill={c} style={{ "--i": i }} />
          ))}
        </svg>
        <p className="gate-name">Redwan Ahmed Utsab</p>
        <p className="gate-role">AI Engineer</p>
        <div className="gate-bar" aria-hidden="true"><b style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <p className="gate-meta"><span>{status}</span><span className="gate-pct">{String(pct).padStart(3, "0")}%</span></p>
      </div>
    </div>
  );
}
