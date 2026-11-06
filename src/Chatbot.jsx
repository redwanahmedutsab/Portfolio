import { useEffect, useRef, useState } from "react";

const GREETING = "Hi! I'm Redwan's AI assistant. Ask me about his projects, skills, research or experience.";
const SUGGESTIONS = ["What has Redwan built?", "What's his tech stack?", "Is he open to work?", "How can I contact him?"];

// Turns plain URLs and emails in the bot's reply into clickable links (no HTML injection: we build React nodes).
function linkify(text) {
  return text.split(/(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g).map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      const url = part.replace(/[.,;:!?)]+$/, ""), tail = part.slice(url.length);
      return <span key={i}><a href={url} target="_blank" rel="noreferrer">{url}</a>{tail}</span>;
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part)) return <a key={i} href={`mailto:${part}`}>{part}</a>;
    return part;
  });
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, busy, open]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => {
    if (!open) return;
    const esc = (e) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc); return () => removeEventListener("keydown", esc);
  }, [open]);

  const send = async (text) => {
    const content = text.trim();
    if (!content || busy) return;
    const next = [...msgs, { role: "user", content }];
    setMsgs(next); setInput(""); setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI-only, so we don't send it to the model.
        body: JSON.stringify({ messages: next.filter((m, i) => !(i === 0 && m.role === "assistant")) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(data.error || "Request failed");
      setMsgs((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setMsgs((m) => [...m, { role: "assistant", content: e.message || "Sorry, something went wrong. Please try again.", error: true }]);
    } finally { setBusy(false); }
  };

  return (
    <>
      <button type="button" className={`chat-fab${open ? " hide" : ""}`} onClick={() => setOpen(true)} aria-label="Chat with Redwan's AI assistant" aria-expanded={open}>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /><path d="M9 11h.01M12 11h.01M15 11h.01" /></svg>
        <span>Ask my AI</span>
      </button>

      <section className={`chat${open ? " open" : ""}`} role="dialog" aria-label="AI assistant" aria-hidden={!open}>
        <header className="chat-head">
          <span className="chat-dot" aria-hidden="true" />
          <div><b>Redwan's AI assistant</b><small>Powered by Gemini</small></div>
          <button type="button" className="chat-x" onClick={() => setOpen(false)} aria-label="Close chat" tabIndex={open ? 0 : -1}>×</button>
        </header>

        <div className="chat-log" aria-live="polite">
          {msgs.map((m, i) => <p key={i} className={`bub ${m.role === "user" ? "me" : "bot"}${m.error ? " err" : ""}`}>{m.role === "user" ? m.content : linkify(m.content)}</p>)}
          {busy && <p className="bub bot typing-dots" aria-label="Assistant is typing"><i /><i /><i /></p>}
          {msgs.length === 1 && !busy && (
            <div className="chat-sugg">{SUGGESTIONS.map((s) => <button type="button" key={s} onClick={() => send(s)} tabIndex={open ? 0 : -1}>{s}</button>)}</div>
          )}
          <div ref={endRef} />
        </div>

        <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Redwan…" maxLength={800} aria-label="Your message" tabIndex={open ? 0 : -1} />
          <button type="submit" disabled={busy || !input.trim()} aria-label="Send" tabIndex={open ? 0 : -1}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </form>
      </section>
    </>
  );
}
