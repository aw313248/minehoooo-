"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { CharReveal } from "@/components/WordReveal";
import { useLang } from "@/contexts/LangContext";

const IG_ACCOUNTS = [
  { handle: "@minehoooo",     href: "https://instagram.com/minehoooo",     desc: "Video · MV · Reels" },
  { handle: "@minehoooo.arw", href: "https://instagram.com/minehoooo.arw", desc: "Photography · ARW" },
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
        style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <span className="font-mono-label text-[9px] tracking-[0.35em]" style={{ color: "rgba(255,255,255,0.3)" }}>
          05 — CONTACT
        </span>
        <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.18)" }}>
          minehoooo.xyz
        </span>
      </div>

      {/* ── Main CTA ── */}
      <div ref={ref} className="flex-1 flex flex-col justify-center px-8 md:px-14 py-16 md:py-24 relative overflow-hidden">

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden">
          <span className="font-display select-none"
            style={{
              fontSize: "clamp(12rem, 40vw, 56rem)",
              color: "rgba(255,255,255,0.014)",
              letterSpacing: "0.02em",
              lineHeight: 1,
              paddingRight: "3%",
              userSelect: "none",
            }}>
            DM
          </span>
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 40% 55%, rgba(80,80,160,0.06) 0%, transparent 70%)",
        }} />

        {/* Content */}
        <div className="relative z-10 max-w-3xl">

          {/* Label */}
          <p className="font-mono-label text-[9px] tracking-[0.38em] mb-8"
            style={{
              color: "rgba(255,255,255,0.3)",
              opacity: inView ? 1 : 0,
              transition: "opacity .7s ease",
            }}>
            {t.subtitle}
          </p>

          {/* Heading */}
          <h2 className="font-display leading-none mb-6"
            style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", color: "var(--text)", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
            <CharReveal text="LET'S WORK" inView={inView} baseDelay={0.1} stagger={0.042} />
          </h2>

          <p className="font-mono-label text-[11px] md:text-[13px] tracking-[0.18em] mb-12 max-w-md leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.35)",
              opacity: inView ? 1 : 0,
              transition: "opacity .8s ease .2s",
            }}>
            Music video · Commercial · Photography · AIGC<br />
            Open for all creative collaborations
          </p>

          {/* Email + copy */}
          <div style={{
            opacity: inView ? 1 : 0,
            transition: "opacity .8s ease .26s",
            marginBottom: "1.2rem",
            display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
          }}>
            <a href="mailto:minehoooo@gmail.com"
              className="inline-flex items-center gap-2 font-mono-label text-[10px] tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.35)", transition: "color .3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
              <svg width="12" height="10" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="16" rx="2"/>
                <polyline points="2,2 12,11 22,2"/>
              </svg>
              minehoooo@gmail.com
            </a>
            <button onClick={copyEmail}
              className="font-mono-label text-[8px] tracking-[0.25em] px-2 py-0.5"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: copied ? "rgba(74,222,128,0.9)" : "rgba(255,255,255,0.28)",
                background: copied ? "rgba(74,222,128,0.06)" : "rgba(255,255,255,0.03)",
                cursor: "pointer", transition: "all .25s ease",
              }}>
              {copied ? "COPIED ✓" : "COPY"}
            </button>
            <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.18)" }}>
              {t.reply}
            </span>
          </div>

          {/* Primary CTA — IG DM */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity .8s ease .3s, transform .8s cubic-bezier(.16,1,.3,1) .3s",
          }}>
            <a href="https://instagram.com/minehoooo" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-4"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "14px 28px",
                transition: "all .35s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.11)";
                el.style.borderColor = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.06)";
                el.style.borderColor = "rgba(255,255,255,0.12)";
              }}>
              {/* IG icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="rgba(255,255,255,0.7)" stroke="none" />
              </svg>
              <div className="flex flex-col">
                <span className="font-mono-label text-[10px] tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  SEND A DM
                </span>
                <span className="font-mono-label text-[13px] tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.85)" }}>
                  @minehoooo
                </span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 18, marginLeft: 4 }}>↗</span>
            </a>

            {/* Toggle: show contact form */}
            <div style={{ marginTop: 16 }}>
              <button onClick={() => { setShowForm(v => !v); setFormState("idle"); }}
                className="font-mono-label text-[9px] tracking-[0.22em]"
                style={{
                  color: showForm ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.3)",
                  background: "none", border: "none", cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  paddingBottom: 2,
                  transition: "color .25s ease",
                }}>
                {showForm ? "↑ CLOSE" : `↓ ${t.formBtn}`}
              </button>
            </div>

            {/* Inline contact form */}
            {showForm && (
              <form onSubmit={handleSubmit} style={{ marginTop: 20, maxWidth: 420 }}>
                {formState === "sent" ? (
                  <p className="font-mono-label text-[10px] tracking-[0.18em]" style={{ color: "rgba(74,222,128,0.9)" }}>
                    {t.sent}
                  </p>
                ) : (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div>
                          <label className="font-mono-label text-[8px] tracking-[0.25em] block mb-1.5" style={{ color: "rgba(255,255,255,0.28)" }}>
                            {t.nameLabel}
                          </label>
                          <input type="text" required value={formData.name}
                            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                            placeholder={t.namePh}
                            className="w-full font-mono-label text-[10px] tracking-wide px-3 py-2"
                            style={{
                              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.8)", outline: "none",
                            }} />
                        </div>
                        <div>
                          <label className="font-mono-label text-[8px] tracking-[0.25em] block mb-1.5" style={{ color: "rgba(255,255,255,0.28)" }}>
                            {t.emailLabel}
                          </label>
                          <input type="email" required value={formData.email}
                            onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                            placeholder="email@example.com"
                            className="w-full font-mono-label text-[10px] tracking-wide px-3 py-2"
                            style={{
                              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.8)", outline: "none",
                            }} />
                        </div>
                      </div>
                      <div>
                        <label className="font-mono-label text-[8px] tracking-[0.25em] block mb-1.5" style={{ color: "rgba(255,255,255,0.28)" }}>
                          {t.msgLabel}
                        </label>
                        <textarea required rows={4} value={formData.message}
                          onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                          placeholder={t.msgPh}
                          className="w-full font-mono-label text-[10px] tracking-wide px-3 py-2 resize-none"
                          style={{
                            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.8)", outline: "none",
                          }} />
                      </div>
                    </div>
                    {formState === "error" && (
                      <p className="font-mono-label text-[8px] tracking-wide mt-2" style={{ color: "rgba(248,113,113,0.9)" }}>
                        {t.errMsg}
                      </p>
                    )}
                    <button type="submit" disabled={formState === "sending"}
                      className="font-mono-label text-[9px] tracking-[0.28em] mt-3 px-6 py-2.5"
                      style={{
                        background: formState === "sending" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        color: formState === "sending" ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.8)",
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
        </div>

        {/* IG account list — bottom right */}
        <div className="hidden md:flex flex-col items-end gap-3 absolute bottom-16 right-14"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity .8s ease .5s",
          }}>
          <p className="font-mono-label text-[8px] tracking-[0.3em] mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
            FOLLOW ALONG
          </p>
          {IG_ACCOUNTS.map(acc => (
            <a key={acc.handle} href={acc.href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 group">
              <span className="font-mono-label text-[8px] tracking-[0.18em]"
                style={{ color: "rgba(255,255,255,0.2)" }}>
                {acc.desc}
              </span>
              <span className="font-mono-label text-[10px] tracking-[0.14em] transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                {acc.handle}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Mobile IG list ── */}
      <div className="md:hidden px-8 pb-10 flex flex-col gap-3 border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <p className="font-mono-label text-[8px] tracking-[0.3em] pt-6 mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
          FOLLOW ALONG
        </p>
        {IG_ACCOUNTS.map(acc => (
          <a key={acc.handle} href={acc.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between">
            <span className="font-mono-label text-[11px] tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.5)" }}>
              {acc.handle}
            </span>
            <span className="font-mono-label text-[8px] tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.2)" }}>
              {acc.desc}
            </span>
          </a>
        ))}
      </div>

      {/* ── Footer strip ── */}
      <div className="border-t px-8 md:px-14 py-4 flex items-center justify-between flex-wrap gap-3"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.01)" }}>
        <span className="font-mono-label text-[8px] tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.2)" }}>
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
