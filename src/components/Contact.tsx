"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { CharReveal } from "@/components/WordReveal";
import { useLang } from "@/contexts/LangContext";

const IG_ACCOUNTS = [
  { handle: "@minehoooo.arw", href: "https://instagram.com/minehoooo.arw", desc: "Main · Director / DP / Photo" },
  { handle: "@minehoooo",     href: "https://instagram.com/minehoooo",     desc: "Video · MV · Reels" },
  { handle: "@mlpon6",        href: "https://instagram.com/mlpon6",         desc: "Personal" },
];

type FormState = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const { ref, inView } = useInView(0.06);
  const [year, setYear] = useState("2026");
  const [copied, setCopied] = useState(false);
  const { lang } = useLang();
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  function copyEmail() {
    navigator.clipboard.writeText("minehoooo@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch("https://formspree.io/f/xvgaeqby", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  const t = {
    subtitle: lang === "zh" ? "有合作提案 · 歡迎聯繫" : "Open for collaboration · Get in touch",
    reply:    lang === "zh" ? "GMT+8 · 24h 內回覆" : "GMT+8 · Reply within 24h",
    sendDm:   lang === "zh" ? "SEND A DM" : "SEND A DM",
    formBtn:  lang === "zh" ? "直接留言" : "SEND A MESSAGE",
    nameLabel:    lang === "zh" ? "名稱 / NAME" : "NAME",
    emailLabel:   lang === "zh" ? "Email" : "EMAIL",
    msgLabel:     lang === "zh" ? "訊息內容 / MESSAGE" : "MESSAGE",
    namePh:       lang === "zh" ? "你的名字或品牌名稱" : "Your name or brand",
    msgPh:        lang === "zh" ? "合作類型、時間、預算⋯" : "Project type, timeline, budget…",
    submit:       lang === "zh" ? "送出" : "SEND",
    sending:      lang === "zh" ? "送出中⋯" : "SENDING…",
    sent:         lang === "zh" ? "已送出 ✓ 我會盡快回覆！" : "Sent ✓ I'll get back to you soon!",
    errMsg:       lang === "zh" ? "發生錯誤，請直接寄信至 minehoooo@gmail.com" : "Something went wrong. Email me directly at minehoooo@gmail.com",
  };

  return (
    <section id="contact" style={{ background: "#000", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── Top label ── */}
      <div className="border-b px-8 md:px-14 py-3 flex items-center justify-between"
        style={{ borderColor: "var(--white-ghost)" }}>
        <span className="font-mono-label text-[9px] tracking-[0.35em]" style={{ color: "var(--white-muted)" }}>
          05 — CONTACT
        </span>
        <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: "var(--white-dim)" }}>
          minehoooo.xyz
        </span>
      </div>

      {/* ── Main CTA — fully centered ── */}
      <div ref={ref} className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-14 py-16 md:py-24 relative overflow-hidden">

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="font-display select-none"
            style={{
              fontSize: "clamp(14rem, 44vw, 60rem)",
              color: "rgba(255,255,255,0.018)",
              letterSpacing: "0.02em",
              lineHeight: 1,
              userSelect: "none",
            }}>
            DM
          </span>
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(80,80,160,0.07) 0%, transparent 70%)",
        }} />

        {/* Content — center column */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">

          {/* Label */}
          <p className="font-mono-label text-[10px] md:text-[11px] tracking-[0.4em] mb-8"
            style={{
              color: "var(--white-muted)",
              opacity: inView ? 1 : 0,
              transition: "opacity .7s ease",
            }}>
            {t.subtitle}
          </p>

          {/* Heading — bigger, centered */}
          <h2 className="font-display leading-none mb-8 text-center"
            style={{ fontSize: "clamp(4rem, 14vw, 16rem)", color: "var(--text)", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
            <CharReveal text="LET'S WORK" inView={inView} baseDelay={0.1} stagger={0.042} />
          </h2>

          <p className="font-mono-label text-[12px] md:text-[14px] tracking-[0.2em] mb-12 leading-relaxed text-center"
            style={{
              color: "var(--white-soft)",
              opacity: inView ? 1 : 0,
              transition: "opacity .8s ease .2s",
              maxWidth: 560,
            }}>
            Music Video · Commercial · Photography · AIGC<br />
            Open for all creative collaborations
          </p>

          {/* Email — bigger, centered */}
          <div style={{
            opacity: inView ? 1 : 0,
            transition: "opacity .8s ease .26s",
            marginBottom: "1.6rem",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap",
          }}>
            <a href="mailto:minehoooo@gmail.com"
              className="inline-flex items-center gap-3 font-mono-label text-[13px] md:text-[15px] tracking-[0.18em]"
              style={{ color: "var(--white-secondary)", transition: "color .3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--white-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--white-secondary)")}>
              <svg width="16" height="14" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="16" rx="2"/>
                <polyline points="2,2 12,11 22,2"/>
              </svg>
              minehoooo@gmail.com
            </a>
            <button onClick={copyEmail}
              aria-label="複製在地影像工作者 MINEH4O 的聯繫信箱"
              className="font-mono-label text-[9px] tracking-[0.25em] px-3 py-1.5"
              style={{
                border: "1px solid var(--white-dim)",
                borderRadius: 999,
                color: copied ? "rgba(74,222,128,0.9)" : "var(--white-soft)",
                background: copied ? "rgba(74,222,128,0.06)" : "var(--white-ghost)",
                cursor: "pointer", transition: "all .25s ease",
              }}>
              {copied ? "COPIED ✓" : "COPY"}
            </button>
          </div>

          {/* Reply note */}
          <p className="font-mono-label text-[9px] md:text-[10px] tracking-[0.25em] mb-10"
            style={{ color: "var(--white-dim)", opacity: inView ? 1 : 0, transition: "opacity .8s ease .3s" }}>
            {t.reply}
          </p>

          {/* Primary CTA — IG DM, larger pill */}
          <div className="flex flex-col items-center" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity .8s ease .3s, transform .8s cubic-bezier(.16,1,.3,1) .3s",
          }}>
            <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-5"
              style={{
                background: "var(--white-ghost)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--white-dim)",
                borderRadius: 14,
                padding: "18px 36px",
                transition: "all .35s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--white-dim)";
                el.style.borderColor = "var(--white-muted)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--white-ghost)";
                el.style.borderColor = "rgba(255,255,255,0.12)";
                el.style.transform = "translateY(0)";
              }}>
              {/* IG icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--white-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="var(--white-primary)" stroke="none" />
              </svg>
              <div className="flex flex-col items-start">
                <span className="font-mono-label text-[10px] md:text-[11px] tracking-[0.32em]" style={{ color: "var(--white-soft)" }}>
                  SEND A DM
                </span>
                <span className="font-mono-label text-[15px] md:text-[17px] tracking-[0.1em]" style={{ color: "var(--white-primary)" }}>
                  @minehoooo.arw
                </span>
              </div>
              <span style={{ color: "var(--white-secondary)", fontSize: 22, marginLeft: 6 }}>↗</span>
            </a>

            {/* Toggle: show contact form */}
            <div style={{ marginTop: 24 }}>
              <button onClick={() => { setShowForm(v => !v); setFormState("idle"); }}
                className="font-mono-label text-[10px] md:text-[11px] tracking-[0.28em] px-4 py-2"
                style={{
                  color: showForm ? "var(--white-primary)" : "var(--white-soft)",
                  background: showForm ? "var(--white-ghost)" : "transparent",
                  borderRadius: 10,
                  border: "1px solid var(--white-ghost)",
                  cursor: "pointer",
                  transition: "all .25s ease",
                }}
                onMouseEnter={e => { if (!showForm) (e.currentTarget as HTMLButtonElement).style.background = "var(--white-ghost)"; }}
                onMouseLeave={e => { if (!showForm) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                {showForm ? "↑ CLOSE" : `↓ ${t.formBtn}`}
              </button>
            </div>

            {/* Inline contact form */}
            {showForm && (
              <form onSubmit={handleSubmit} style={{ marginTop: 24, width: "100%", maxWidth: 480 }}>
                {formState === "sent" ? (
                  <p className="font-mono-label text-[11px] tracking-[0.18em] text-center" style={{ color: "rgba(74,222,128,0.95)" }}>
                    {t.sent}
                  </p>
                ) : (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div className="text-left">
                          <label className="font-mono-label text-[8px] tracking-[0.25em] block mb-1.5" style={{ color: "var(--white-muted)" }}>
                            {t.nameLabel}
                          </label>
                          <input type="text" required value={formData.name}
                            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                            placeholder={t.namePh}
                            className="w-full font-mono-label text-[11px] tracking-wide px-3 py-2.5"
                            style={{
                              background: "var(--white-ghost)", border: "1px solid var(--white-ghost)",
                              borderRadius: 8,
                              color: "var(--white-primary)", outline: "none",
                            }} />
                        </div>
                        <div className="text-left">
                          <label className="font-mono-label text-[8px] tracking-[0.25em] block mb-1.5" style={{ color: "var(--white-muted)" }}>
                            {t.emailLabel}
                          </label>
                          <input type="email" required value={formData.email}
                            onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                            placeholder="email@example.com"
                            className="w-full font-mono-label text-[11px] tracking-wide px-3 py-2.5"
                            style={{
                              background: "var(--white-ghost)", border: "1px solid var(--white-ghost)",
                              borderRadius: 8,
                              color: "var(--white-primary)", outline: "none",
                            }} />
                        </div>
                      </div>
                      <div className="text-left">
                        <label className="font-mono-label text-[8px] tracking-[0.25em] block mb-1.5" style={{ color: "var(--white-muted)" }}>
                          {t.msgLabel}
                        </label>
                        <textarea required rows={4} value={formData.message}
                          onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                          placeholder={t.msgPh}
                          className="w-full font-mono-label text-[11px] tracking-wide px-3 py-2.5 resize-none"
                          style={{
                            background: "var(--white-ghost)", border: "1px solid var(--white-ghost)",
                            borderRadius: 8,
                            color: "var(--white-primary)", outline: "none",
                          }} />
                      </div>
                    </div>
                    {formState === "error" && (
                      <p className="font-mono-label text-[9px] tracking-wide mt-2 text-left" style={{ color: "rgba(248,113,113,0.9)" }}>
                        {t.errMsg}
                      </p>
                    )}
                    <button type="submit" disabled={formState === "sending"}
                      className="font-mono-label text-[10px] tracking-[0.3em] mt-4 px-7 py-3"
                      style={{
                        background: "var(--white-dim)",
                        border: "1px solid var(--white-muted)",
                        borderRadius: 10,
                        color: formState === "sending" ? "var(--white-soft)" : "var(--white-primary)",
                        cursor: formState === "sending" ? "default" : "pointer",
                        transition: "all .25s ease",
                      }}>
                      {formState === "sending" ? t.sending : t.submit}
                    </button>
                  </>
                )}
              </form>
            )}
          </div>

          {/* ── FOLLOW ALONG — centered below CTA ── */}
          <div className="w-full flex flex-col items-center mt-16 md:mt-20"
            style={{ opacity: inView ? 1 : 0, transition: "opacity .8s ease .5s" }}>
            <p className="font-mono-label text-[9px] md:text-[10px] tracking-[0.4em] mb-5" style={{ color: "var(--white-dim)" }}>
              FOLLOW ALONG
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 flex-wrap justify-center">
              {IG_ACCOUNTS.map(acc => (
                <a key={acc.handle} href={acc.href} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-4 py-2"
                  style={{
                    background: "var(--white-ghost)",
                    border: "1px solid var(--white-ghost)",
                    borderRadius: 999,
                    transition: "all .25s ease",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "var(--white-dim)";
                    el.style.borderColor = "var(--white-muted)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "var(--white-ghost)";
                    el.style.borderColor = "var(--white-ghost)";
                  }}>
                  <span className="font-mono-label text-[11px] md:text-[12px] tracking-[0.12em]" style={{ color: "var(--white-primary)" }}>
                    {acc.handle}
                  </span>
                  <span className="font-mono-label text-[8px] md:text-[9px] tracking-[0.22em]" style={{ color: "var(--white-muted)" }}>
                    {acc.desc}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer strip ── */}
      <div className="border-t px-8 md:px-14 py-4 flex items-center justify-between flex-wrap gap-3"
        style={{ borderColor: "var(--white-ghost)", background: "var(--white-ghost)" }}>
        <span className="font-mono-label text-[8px] tracking-[0.22em]" style={{ color: "var(--white-dim)" }}>
          © {year} MINEH4O · 賴明宏 Oscar Lai
        </span>
        <div className="flex items-center gap-6">
          <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.14)" }}>
            Taiwan · Taichung
          </span>
          <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.14)" }}>
            Director · DP · Visual Producer
          </span>
        </div>
      </div>

    </section>
  );
}
