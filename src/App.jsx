import { useEffect, useRef, useState } from "react";
import Neural from "./Neural.jsx";
import Trainer from "./Trainer.jsx";
import { Learn, Meaning, Predict, CareerArt, PropArt, CampArt, Ring, Bars, Growth } from "./Visuals.jsx";
import { Reveal, CountUp, Wave, reduced } from "./hooks.jsx";
import { profile, projects, research, experience, wins } from "./data.js";

const NAVY = "#0b1437", MID = "#070b1f", SOFT = "#f4f6fb", WHITE = "#ffffff";

const EXPLAIN = [
  { Viz: Learn, title: "It learns from examples", text: "Show an AI thousands of examples and it spots the patterns on its own, like a child learning to tell cats from dogs.", used: "Used in my circuit-design language model, which reads plain-English commands with 94% accuracy." },
  { Viz: Meaning, title: "It understands meaning", text: "Words become numbers that capture what they mean, so a search can find answers that are close in meaning, not just matching letters.", used: "Used in CareerMind, which finds the right career knowledge before answering." },
  { Viz: Predict, title: "It predicts what comes next", text: "By learning how things relate, an AI can make a sensible estimate for something it has never seen before.", used: "Used in Proprietor, which estimates a fair property price in under 0.2 seconds." },
];
const HOW = {
  CareerMind: { art: CareerArt, tone: "a", how: ["You ask a career question in the chat.", "It searches a knowledge base of real career and job information.", "It writes a personal answer and scores how well roles fit you."], plain: "A chatbot career coach that looks things up before it advises you." },
  Proprietor: { art: PropArt, tone: "b", how: ["You browse, list or rent property.", "An AI model estimates a fair price in under 0.2 seconds.", "Accounts and payments are secured and tested end to end."], plain: "A property marketplace with an AI price estimator built in." },
  Campusor: { art: CampArt, tone: "c", how: ["Students sign in once.", "Four connected apps share that single login: marketplace, events, lost and found, and profiles."], plain: "One app for campus life, from selling a textbook to finding a lost wallet." },
};
const STEPS = [
  ["01", "Prepare the data", "Good AI starts with clean, organised information.", ["Python", "PostgreSQL", "ChromaDB", "Qdrant"]],
  ["02", "Teach the model", "Train or fine-tune models, or let them search and reason.", ["BERT / DistilBERT", "Scikit-Learn", "LangGraph", "RAG"]],
  ["03", "Build the product", "Wrap the intelligence in an app people can actually use.", ["FastAPI", "Django REST", "React", "Next.js"]],
  ["04", "Ship it and keep it healthy", "Automatic tests and deployments make updates safe.", ["Docker", "GitHub Actions", "AWS EC2", "Vercel"]],
];

function Tilt({ children, className = "" }) {
  const ref = useRef(null);
  const move = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const b = ref.current.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
    ref.current.style.setProperty("--ry", `${x * 8}deg`); ref.current.style.setProperty("--rx", `${-y * 8}deg`);
  };
  const leave = () => { ref.current.style.setProperty("--ry", "0deg"); ref.current.style.setProperty("--rx", "0deg"); };
  return <article ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={leave}>{children}</article>;
}

export default function App() {
  const [solid, setSolid] = useState(false);
  const hero = useRef(null);
  useEffect(() => {
    const f = () => setSolid(scrollY > 40);
    f(); addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  const orbs = (e) => {
    if (reduced) return;
    const b = hero.current.getBoundingClientRect();
    hero.current.style.setProperty("--mx", ((e.clientX - b.left) / b.width - 0.5).toFixed(3));
    hero.current.style.setProperty("--my", ((e.clientY - b.top) / b.height - 0.5).toFixed(3));
  };

  return (
    <>
      <a className="skip" href="#work">Skip to projects</a>
      <header className={`nav${solid ? " solid" : ""}`}>
        <a href="#top" className="brand">
          <svg viewBox="0 0 40 40" aria-hidden="true"><g stroke="#22d3ee" strokeWidth="2.5"><path d="M9 11L20 20L9 29M20 20H33" /></g><circle cx="9" cy="11" r="4.5" fill="#22d3ee" /><circle cx="9" cy="29" r="4.5" fill="#2f6bff" /><circle cx="20" cy="20" r="4.5" fill="#7c5cff" /><circle cx="33" cy="20" r="4.5" fill="#fff" /></svg>
          Redwan Ahmed Utsab
        </a>
        <nav aria-label="Primary"><a href="#learn">How AI works</a><a href="#train">Watch it learn</a><a href="#work">Projects</a><a href="#results">Results</a></nav>
        <a className="btn small" href="#contact">Say hello</a>
      </header>

      <main id="top">
        <section className="hero" ref={hero} onPointerMove={orbs}>
          <div className="orb o1" aria-hidden="true" /><div className="orb o2" aria-hidden="true" />
          <Neural />
          <div className="hero-copy">
            <p className="pill"><i /> AI Engineer · Dhaka, Bangladesh</p>
            <h1>Turning <span className="grad">intelligence</span> into products people use.</h1>
            <p className="lead">I'm Redwan Ahmed Utsab. I build AI systems that read, search and reason, from the model to the app to the servers behind it. Let me show you how it all works, no jargon required.</p>
            <div className="cta"><a className="btn primary" href="#work">Explore my work</a><a className="btn ghost" href="#train">Watch an AI learn</a></div>
            <ul className="hstats">
              <li><b><CountUp to={450} suffix="+" /></b><span>coding problems solved</span></li>
              <li><b><CountUp to={94} suffix="%" /></b><span>language-model accuracy</span></li>
              <li><b><CountUp to={3} /></b><span>live AI products</span></li>
            </ul>
          </div>
          <p className="hint" aria-hidden="true">Move over the network, or click it to send a signal through.</p>
        </section>
        <Wave from={MID} to={SOFT} />

        <section id="learn" className="sec soft">
          <Reveal className="head"><p className="kicker">AI in one minute</p><h2>Three ideas behind almost every AI you meet</h2><p className="sub">You don't need a technical background. Here is what's really going on, and where I've used it.</p></Reveal>
          <div className="grid3">
            {EXPLAIN.map(({ Viz, title, text, used }, i) => (
              <Reveal key={title} delay={i * 0.12} className="card ex"><Viz /><h3>{title}</h3><p>{text}</p><p className="used">{used}</p></Reveal>
            ))}
          </div>
        </section>
        <Wave from={SOFT} to={NAVY} />

        <section id="train" className="sec navy">
          <Reveal className="head"><p className="kicker cy">Try it yourself</p><h2>Watch an AI learn, live</h2><p className="sub">This is a real neural network, small enough to train inside your browser. It starts out guessing. Press Train and watch it find the pattern.</p></Reveal>
          <Reveal><Trainer /></Reveal>
        </section>
        <Wave from={NAVY} to={WHITE} />

        <section id="work" className="sec white">
          <Reveal className="head"><p className="kicker">Shipped, not just prototyped</p><h2>AI products you can open right now</h2><p className="sub">Each one pairs a smart model with an app, a secure backend and automatic deployment.</p></Reveal>
          <div className="grid3 proj">
            {projects.map((p, i) => {
              const h = HOW[p.title], Art = h.art;
              return (
                <Reveal key={p.title} delay={i * 0.12}>
                  <Tilt className="card pc">
                    <div className={`pc-art tone-${h.tone}`}><Art /></div>
                    <div className="pc-body">
                      <h3>{p.title}</h3><p className="pl">{h.plain}</p>
                      <ol className="how">{h.how.map((t) => <li key={t}>{t}</li>)}</ol>
                      <div className="links">{p.links.map((l) => <a key={l.href} className="btn small dark" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}</div>
                      <details><summary>Under the hood, for engineers</summary>
                        <ul>{p.points.map((t) => <li key={t}>{t}</li>)}</ul>
                        <ul className="chips">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                      </details>
                    </div>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </section>
        <Wave from={WHITE} to={SOFT} />

        <section className="sec soft">
          <Reveal className="head"><p className="kicker">How I build</p><h2>From raw data to a product that stays online</h2></Reveal>
          <ol className="steps">
            {STEPS.map(([n, t, d, chips], i) => (
              <Reveal as="li" key={n} delay={i * 0.12}>
                <span className="sn">{n}</span><h3>{t}</h3><p>{d}</p>
                <ul className="chips">{chips.map((c) => <li key={c}>{c}</li>)}</ul>
              </Reveal>
            ))}
          </ol>
        </section>
        <Wave from={SOFT} to={NAVY} />

        <section id="results" className="sec navy">
          <Reveal className="head"><p className="kicker cy">Results and research</p><h2>The numbers behind the work</h2><p className="sub">Measured improvements, and the research that makes AI cheaper to run.</p></Reveal>
          <div className="res">
            <Reveal className="glass"><Growth /><h3>{research[0].title}</h3><p className="m">{research[0].meta}</p><p>My thesis teaches a Transformer (the design behind tools like ChatGPT) to read long texts without comparing every word with every other word, cutting the work per layer from O(n²) to O(n log n) at comparable accuracy.</p></Reveal>
            <div className="stack">
              <Reveal className="glass row2" delay={0.1}><Ring value={94} label="of circuit commands understood correctly" /><div><h3>{research[1].title}</h3><p className="m">{research[1].meta}</p><p>Type the circuit you want in plain English. The system draws the diagram in under 2 seconds.</p></div></Reveal>
              <Reveal className="glass" delay={0.2}><Bars title="Property search time" before={100} after={40} note="60% faster after redesigning how the database is organised." /></Reveal>
              <Reveal className="glass" delay={0.3}><Bars title="Data sent per request" before={100} after={30} note="70% less, by filtering on the server instead of in the browser." /></Reveal>
            </div>
          </div>
        </section>
        <Wave from={NAVY} to={WHITE} />

        <section className="sec white">
          <Reveal className="head"><p className="kicker">Beyond code</p><h2>Building teams and teaching others</h2></Reveal>
          <div className="grid3 exp">
            {experience.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.1} className="card"><h3>{e.role}</h3><p className="m">{e.org}, {e.when}</p><p>{e.text}</p></Reveal>
            ))}
            <Reveal delay={0.2} className="card"><h3>Competitions</h3><ul className="wins">{wins.map((w) => <li key={w}>{w}</li>)}</ul></Reveal>
          </div>
        </section>
        <Wave from={WHITE} to={MID} />

        <section id="contact" className="sec end">
          <div className="orb o3" aria-hidden="true" />
          <Reveal className="end-in">
            <p className="kicker cy">Open to AI engineering roles and collaborations</p>
            <h2>Let's build something intelligent.</h2>
            <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
            <div className="cta">{profile.links.map((l) => <a key={l.href} className="btn ghost" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}</div>
          </Reveal>
        </section>
      </main>
      <footer className="foot">Redwan Ahmed Utsab · Dhaka, Bangladesh</footer>
    </>
  );
}
