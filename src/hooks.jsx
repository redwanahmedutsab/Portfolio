import { useEffect, useRef, useState } from "react";

export const reduced = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// True once the element has scrolled into view (never goes back to false).
export function useSeen(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(reduced);
  useEffect(() => {
    if (reduced || !ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

// Fades and lifts its children in when scrolled to. `delay` staggers siblings.
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, seen] = useSeen(0.15);
  return <Tag ref={ref} className={`rv${seen ? " in" : ""} ${className}`} style={{ "--d": `${delay}s` }} {...rest}>{children}</Tag>;
}

export function CountUp({ to, suffix = "" }) {
  const [ref, seen] = useSeen(0.6);
  const [n, setN] = useState(reduced ? to : 0);
  useEffect(() => {
    if (!seen || reduced) return;
    const t0 = performance.now();
    const tick = (t) => { const p = Math.min(1, (t - t0) / 1400); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [seen, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export const Wave = ({ from, to }) => (
  <div className="wave" style={{ background: from }} aria-hidden="true">
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M0 60C260 5 640 100 960 50C1160 20 1320 28 1440 52V90H0Z" fill={to} /></svg>
  </div>
);
