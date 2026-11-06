import { useEffect, useRef, useState } from "react";

export const reduced = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// True once the element has scrolled into view (never goes back to false).
export function useSeen(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(reduced);
  useEffect(() => {
    if (reduced || !ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold, rootMargin: "0px 0px -6% 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

// Animates its children in when scrolled to. `from` picks the direction (up, left, right, zoom);
// `delay` staggers siblings.
export function Reveal({ as: Tag = "div", from = "up", delay = 0, className = "", children, ...rest }) {
  const [ref, seen] = useSeen(0.12);
  return <Tag ref={ref} className={`rv rv-${from}${seen ? " in" : ""} ${className}`} style={{ "--d": `${delay}s` }} {...rest}>{children}</Tag>;
}

export function CountUp({ to, suffix = "", start = true }) {
  const [ref, seen] = useSeen(0.6);
  const [n, setN] = useState(reduced ? to : 0);
  useEffect(() => {
    if (!seen || !start || reduced) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => { const p = Math.min(1, (t - t0) / 1600); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, start, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// Types each phrase, pauses, deletes it, then moves to the next.
export function Typed({ words, start = true }) {
  const [text, setText] = useState(reduced ? words[0] : "");
  useEffect(() => {
    if (reduced || !start) return;
    let i = 0, k = 0, del = false, timer;
    const tick = () => {
      const word = words[i];
      k += del ? -1 : 1; setText(word.slice(0, k));
      let wait = del ? 28 : 62;
      if (!del && k === word.length) { del = true; wait = 1500; }
      else if (del && k === 0) { del = false; i = (i + 1) % words.length; wait = 350; }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 200);
    return () => clearTimeout(timer);
  }, [words, start]);
  return <span className="typed">{text}<i className="caret" aria-hidden="true" /></span>;
}

// 0..1 progress of the page scroll, for the top progress bar.
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => { const max = document.documentElement.scrollHeight - innerHeight; setP(max > 0 ? Math.min(1, scrollY / max) : 0); };
    f(); addEventListener("scroll", f, { passive: true }); addEventListener("resize", f);
    return () => { removeEventListener("scroll", f); removeEventListener("resize", f); };
  }, []);
  return p;
}

// Name of the section currently in the middle of the viewport (for the nav highlight).
export function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const f = () => {
      let cur = "";
      for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) cur = id; }
      setActive(cur);
    };
    f(); addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, [ids]);
  return active;
}

// Draws a ripple where a button or card was pressed, and a small ring wherever the page is clicked.
export function useClickEffects() {
  useEffect(() => {
    if (reduced) return;
    const down = (e) => {
      if (e.target.closest("canvas")) return;
      const host = e.target.closest(".btn, .rip");
      if (host) {
        const b = host.getBoundingClientRect(), s = Math.max(b.width, b.height) * 2;
        const el = document.createElement("span");
        el.className = "ripple"; el.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - b.left - s / 2}px;top:${e.clientY - b.top - s / 2}px`;
        host.appendChild(el); setTimeout(() => el.remove(), 700);
      }
      const ring = document.createElement("span");
      ring.className = "clickring"; ring.style.cssText = `left:${e.clientX}px;top:${e.clientY}px`;
      document.body.appendChild(ring); setTimeout(() => ring.remove(), 600);
    };
    addEventListener("pointerdown", down);
    return () => removeEventListener("pointerdown", down);
  }, []);
}

export const Wave = ({ from, to }) => (
  <div className="wave" style={{ background: from }} aria-hidden="true">
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M0 60C260 5 640 100 960 50C1160 20 1320 28 1440 52V90H0Z" fill={to} /></svg>
  </div>
);
