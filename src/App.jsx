import { useEffect, useRef, useState } from "react";
import Neural from "./Neural.jsx";
import Loader from "./Loader.jsx";
import { CareerArt, PropArt, CampArt, Icon, Ring, Bars, Growth } from "./Visuals.jsx";
import { Reveal, CountUp, Typed, Wave, reduced, useScrollProgress, useActiveSection, useClickEffects } from "./hooks.jsx";
import { profile, stats, about, facts, skills, marquee, timeline, projects, research, wins } from "./data.js";

const HERO_END = "#0a1233", NAVY = "#0b1437", MID = "#070b1f", SOFT = "#f4f6fb", WHITE = "#ffffff";
const ART = { career: CareerArt, property: PropArt, campus: CampArt };
const TONE = { career: "a", property: "b", campus: "c" };
const NAV = [["about", "About"], ["skills", "Skills"], ["experience", "Experience"], ["work", "Projects"], ["research", "Research"], ["contact", "Contact"]];
const SECTION_IDS = ["about", "skills", "experience", "work", "research", "achievements", "contact"]; // document order

function Tilt({ children, className = "" }) {
  const ref = useRef(null);
  const move = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const b = ref.current.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
    ref.current.style.setProperty("--ry", `${x * 6}deg`); ref.current.style.setProperty("--rx", `${-y * 6}deg`);
  };
  const leave = () => { ref.current.style.setProperty("--ry", "0deg"); ref.current.style.setProperty("--rx", "0deg"); };
  return <article ref={ref} className={`tilt rip ${className}`} onPointerMove={move} onPointerLeave={leave}>{children}</article>;
}

// A vertical timeline whose line fills in as you scroll past it.
function Timeline({ items }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const f = () => {
      const b = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (innerHeight * 0.65 - b.top) / b.height));
      el.style.setProperty("--p", reduced ? 1 : p.toFixed(3));
    };
    f(); addEventListener("scroll", f, { passive: true }); addEventListener("resize", f);
    return () => { removeEventListener("scroll", f); removeEventListener("resize", f); };
  }, []);
  return (
    <ol className="tl" ref={ref}>
      <span className="tl-rail" aria-hidden="true"><i /></span>
      {items.map((t, i) => (
        <Reveal as="li" key={t.role} from={i % 2 ? "right" : "left"} delay={0.05} className={`tl-item ${t.kind}`}>
          <span className="tl-dot" aria-hidden="true"><Icon name={t.kind === "edu" ? "cap" : "brief"} size={16} /></span>
          <div className="card tl-card rip">
            <p className="tl-when">{t.when}</p>
            <h3>{t.role}</h3>
            <p className="m">{t.org} · {t.where}</p>
            <ul>{t.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

function CopyEmail() {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); } catch { /* clipboard may be blocked; still show feedback */ }
    setDone(true); setTimeout(() => setDone(false), 1800);
  };
  return (
    <button type="button" className={`btn ghost copy${done ? " ok" : ""}`} onClick={copy} aria-live="polite">
      <Icon name={done ? "check" : "copy"} size={18} />{done ? "Copied!" : "Copy email"}
    </button>
  );
}

export default function App() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false); // gate has opened
  const [menu, setMenu] = useState(false);
  const hero = useRef(null);
  const progress = useScrollProgress();
  const active = useActiveSection(SECTION_IDS);
  useClickEffects();

  useEffect(() => {
    const f = () => setSolid(scrollY > 40);
    f(); addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("opened", open); }, [open]);
  useEffect(() => {
    if (!menu) return;
    const esc = (e) => e.key === "Escape" && setMenu(false);
    addEventListener("keydown", esc); return () => removeEventListener("keydown", esc);
  }, [menu]);

  const orbs = (e) => {
    if (reduced) return;
    const b = hero.current.getBoundingClientRect();
    hero.current.style.setProperty("--mx", ((e.clientX - b.left) / b.width - 0.5).toFixed(3));
    hero.current.style.setProperty("--my", ((e.clientY - b.top) / b.height - 0.5).toFixed(3));
  };

  return (
    <>
      <Loader onOpen={() => setOpen(true)} />
      <div className="progress" aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></div>
      <a className="skip" href="#about">Skip to content</a>
      <header className={`nav${solid || menu ? " solid" : ""}${menu ? " menu-open" : ""}`}>
        <a href="#top" className="brand">
          <svg viewBox="0 0 40 40" aria-hidden="true"><g stroke="#22d3ee" strokeWidth="2.5"><path d="M9 11L20 20L9 29M20 20H33" /></g><circle cx="9" cy="11" r="4.5" fill="#22d3ee" /><circle cx="9" cy="29" r="4.5" fill="#2f6bff" /><circle cx="20" cy="20" r="4.5" fill="#7c5cff" /><circle cx="33" cy="20" r="4.5" fill="#fff" /></svg>
          Redwan Ahmed Utsab
        </a>
        <nav aria-label="Primary">{NAV.slice(0, 5).map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? "on" : ""} aria-current={active === id ? "true" : undefined}>{label}</a>)}</nav>
        <a className="btn small rip" href="#contact">Get in touch</a>
        <button type="button" className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}><i /><i /><i /></button>
        <div className="mnav" aria-hidden={!menu}>
          {NAV.map(([id, label], i) => <a key={id} href={`#${id}`} tabIndex={menu ? 0 : -1} style={{ "--i": i }} onClick={() => setMenu(false)}>{label}</a>)}
        </div>
      </header>

      <main id="top">
        <section className="hero" ref={hero} onPointerMove={orbs}>
          <div className="orb o1" aria-hidden="true" /><div className="orb o2" aria-hidden="true" />
          <Neural run={open || reduced} />
          <div className="hero-copy">
            <p className="pill hin" style={{ "--h": 0 }}><i /> Open to AI Engineer roles · {profile.location}</p>
            <p className="hello hin" style={{ "--h": 1 }}>Hi, I'm</p>
            <h1 className="hin" style={{ "--h": 2 }}><span className="grad">Redwan Ahmed Utsab</span></h1>
            <p className="role hin" style={{ "--h": 3 }}>AI Engineer <span>|</span> {profile.tagline}</p>
            <p className="typing hin" style={{ "--h": 4 }}>I build <Typed words={profile.typed} start={open} /></p>
            <p className="lead hin" style={{ "--h": 5 }}>{profile.summary}</p>
            <div className="cta hin" style={{ "--h": 6 }}>
              <a className="btn primary" href="#work">View my work <Icon name="arrow" size={18} /></a>
              <a className="btn ghost" href="#contact">Contact me</a>
              <span className="soc">
                {profile.links.slice(0, 2).map((l) => <a key={l.href} className="icon-btn" href={l.href} target="_blank" rel="noreferrer" aria-label={l.label}><Icon name={l.label.toLowerCase()} size={20} fill /></a>)}
              </span>
            </div>
            <ul className="hstats hin" style={{ "--h": 7 }}>
              {stats.map((s) => <li key={s.label}><b><CountUp to={s.to} suffix={s.suffix} start={open} /></b><span>{s.label}</span></li>)}
            </ul>
          </div>
          <p className="hint hin" style={{ "--h": 9 }} aria-hidden="true">Move over the network, or click it to send a signal through.</p>
        </section>
        <div className="marquee" aria-hidden="true">
          <div className="mq-track">{[0, 1].map((k) => <ul key={k}>{marquee.map((m) => <li key={m + k}>{m}</li>)}</ul>)}</div>
        </div>
        <Wave from={HERO_END} to={SOFT} />

        <section id="about" className="sec soft">
          <Reveal className="head"><p className="kicker">About me</p><h2>Engineer, researcher, founder</h2></Reveal>
          <div className="about">
            <Reveal from="left" className="about-copy">
              {about.map((t) => <p key={t.slice(0, 20)}>{t}</p>)}
              <div className="cta"><a className="btn small dark rip" href="#work">See my projects</a><a className="btn small dark rip" href="#contact">Work with me</a></div>
            </Reveal>
            <Reveal from="right" delay={0.1} className="card facts rip">
              <div className="avatar" aria-hidden="true"><span>RU</span></div>
              <h3>{profile.name}</h3>
              <p className="m">{profile.role} · {profile.location}</p>
              <dl>{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </Reveal>
          </div>
        </section>
        <Wave from={SOFT} to={NAVY} />

        <section id="skills" className="sec navy">
          <Reveal className="head"><p className="kicker cy">Technical skills</p><h2>The stack I build with</h2><p className="sub">From retrieval and fine-tuning to APIs, databases and deployment.</p></Reveal>
          <div className="skills">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={(i % 3) * 0.1} from={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"} className="glass sk rip">
                <h3><span className="sk-ico"><Icon name={s.icon} size={20} /></span>{s.group}</h3>
                <ul className="chips dk">{s.items.map((c, j) => <li key={c} style={{ "--j": j }}>{c}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </section>
        <Wave from={NAVY} to={WHITE} />

        <section id="experience" className="sec white">
          <Reveal className="head"><p className="kicker">Experience & education</p><h2>Where I've built and taught</h2></Reveal>
          <Timeline items={timeline} />
        </section>
        <Wave from={WHITE} to={SOFT} />

        <section id="work" className="sec soft">
          <Reveal className="head"><p className="kicker">Selected projects</p><h2>Products I've shipped</h2><p className="sub">Each one is live, deployed and built end to end: model, API, database and CI/CD.</p></Reveal>
          <div className="grid3 proj">
            {projects.map((p, i) => {
              const Art = ART[p.art];
              return (
                <Reveal key={p.title} delay={i * 0.12} from={i === 0 ? "left" : i === 2 ? "right" : "up"}>
                  <Tilt className="card pc">
                    <div className={`pc-art tone-${TONE[p.art]}`}><Art /></div>
                    <div className="pc-body">
                      <p className="pk">{p.kind}</p>
                      <h3>{p.title}</h3>
                      <ul className="mets">{p.metrics.map(([v, l]) => <li key={l}><b>{v}</b><span>{l}</span></li>)}</ul>
                      <ul className="pts">{p.points.map((t) => <li key={t}>{t}</li>)}</ul>
                      <ul className="chips">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                      <div className="links">{p.links.map((l) => <a key={l.href} className="btn small dark" href={l.href} target="_blank" rel="noreferrer">{l.label} <Icon name="arrow" size={15} /></a>)}</div>
                    </div>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </section>
        <Wave from={SOFT} to={NAVY} />

        <section id="research" className="sec navy">
          <Reveal className="head"><p className="kicker cy">Research & publications</p><h2>Making Transformers and NLP systems work better</h2><p className="sub">Two papers under review, plus measurable engineering results from the products above.</p></Reveal>
          <div className="res">
            <Reveal from="left" className="glass rip"><Growth /><h3>{research[0].title}</h3><p className="m">{research[0].meta}</p><p>{research[0].text}</p></Reveal>
            <div className="stack">
              <Reveal from="right" className="glass row2 rip" delay={0.1}><Ring value={94} label="classification accuracy" /><div><h3>{research[1].title}</h3><p className="m">{research[1].meta}</p><p>{research[1].text}</p></div></Reveal>
              <Reveal from="right" className="glass rip" delay={0.2}><Bars title="Listing query latency · Proprietor" before={100} after={40} note="60% lower after adding composite indexes across 8 PostgreSQL entities." /></Reveal>
              <Reveal from="right" className="glass rip" delay={0.3}><Bars title="Response payload · Campusor" before={100} after={30} note="70% smaller by moving filtering server-side with django-filter." /></Reveal>
            </div>
          </div>
        </section>
        <Wave from={NAVY} to={WHITE} />

        <section id="achievements" className="sec white">
          <Reveal className="head"><p className="kicker">Achievements</p><h2>Competitions and problem solving</h2></Reveal>
          <div className="wins">
            <Reveal from="left" className="card lc rip">
              <span className="w-ico"><Icon name="code2" size={26} /></span>
              <p className="lc-n"><CountUp to={450} suffix="+" /></p>
              <h3>LeetCode problems solved</h3>
              <p>Across dynamic programming, graphs, binary search and sliding window techniques.</p>
              <a className="btn small dark" href={profile.links[2].href} target="_blank" rel="noreferrer">View profile <Icon name="arrow" size={15} /></a>
            </Reveal>
            <div className="trophies">
              {wins.map((w, i) => (
                <Reveal key={w.text} delay={i * 0.1} from="zoom" className="card tr rip">
                  <span className="w-ico gold"><Icon name="trophy" size={22} /></span>
                  <div><p className="tr-t">{w.title}</p><h3>{w.text}</h3><p className="m">{w.meta}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <Wave from={WHITE} to={MID} />

        <section id="contact" className="sec end">
          <div className="orb o3" aria-hidden="true" />
          <Reveal className="end-in">
            <p className="kicker cy">Open to AI engineering roles and collaborations</p>
            <h2>Let's build something intelligent.</h2>
            <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
            <ul className="reach">
              <li><Icon name="phone" size={18} /><a href={`tel:${profile.phone}`}>{profile.phone}</a></li>
              <li><Icon name="pin" size={18} />{profile.location}</li>
            </ul>
            <div className="cta">
              <a className="btn primary" href={`mailto:${profile.email}`}><Icon name="mail" size={18} />Send an email</a>
              <CopyEmail />
              {profile.links.map((l) => <a key={l.href} className="btn ghost" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="foot">© 2026 Redwan Ahmed Utsab · AI Engineer · {profile.location}</footer>
    </>
  );
}
