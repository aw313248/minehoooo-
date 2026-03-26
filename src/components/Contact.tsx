"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { WordReveal } from "@/components/WordReveal";

const socials = [
  { label: "Instagram", href: "https://instagram.com/minehoooo" },
  { label: "Behance",   href: "#" },
  { label: "LinkedIn",  href: "#" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const { ref, inView } = useInView(0.07);

  return (
    <section id="contact" style={{ background: "var(--bg)" }}>
      <div className="border-t border-b px-6 md:px-10 py-3 flex items-center justify-between"
        style={{ borderColor: "var(--border)" }}>
        <span className="font-mono-label text-[9px] tracking-[0.32em]" style={{ color: "var(--text-3)" }}>
          CONTACT / 聯絡
        </span>
      </div>

      <div ref={ref} className="grid md:grid-cols-2">
        {/* Left */}
        <div className="border-r p-8 md:p-16 flex flex-col justify-between min-h-[55vh]"
          style={{
            borderColor: "var(--border)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) scale(1)" : "translateY(48px) scale(0.97)",
            transition: "opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}>
          <div>
            <h2 className="font-display leading-tight mb-8" style={{ fontSize: "clamp(3rem, 8vw, 9rem)", color: "var(--text)" }}>
              <WordReveal text="Let's Work Together" inView={inView} baseDelay={0.1} stagger={0.05} />
            </h2>
            <p className="text-[15px] leading-relaxed max-w-xs" style={{ color: "var(--text-2)" }}>
              有合作提案或任何問題，歡迎聯繫
            </p>
            <p className="text-[13px] mt-1" style={{ color: "var(--text-3)" }}>
              Open for collaboration and inquiries
            </p>
          </div>
          <div>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-4" style={{ color: "var(--text-3)" }}>
              SOCIAL / 社群
            </p>
            <div className="flex gap-8">
              {socials.map(s => (
                <a key={s.label} href={s.href}
                  className="font-mono-label text-[10px] tracking-wider transition-colors"
                  style={{ color: "var(--text-3)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="p-8 md:p-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) scale(1)" : "translateY(48px) scale(0.97)",
            transition: "opacity 1s ease 0.15s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}>
          {sent ? (
            <div className="h-full flex flex-col justify-center">
              <p className="font-mono-label text-[9px] tracking-[0.3em] mb-4" style={{ color: "var(--text-3)" }}>
                MESSAGE SENT / 訊息已送出
              </p>
              <h3 className="text-xl font-medium mb-2" style={{ color: "var(--text)" }}>謝謝你的來信</h3>
              <p className="text-[13px]" style={{ color: "var(--text-3)" }}>
                I&apos;ll get back to you soon · 我會盡快回覆
              </p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-8">
              {[
                { label: "NAME / 姓名", key: "name",  type: "text",  ph: "Your name" },
                { label: "EMAIL",       key: "email", type: "email", ph: "your@email.com" },
              ].map(({ label, key, type, ph }) => (
                <div key={key}>
                  <label className="font-mono-label text-[9px] tracking-[0.3em] block mb-3" style={{ color: "var(--text-3)" }}>
                    {label}
                  </label>
                  <input type={type} required placeholder={ph}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-transparent border-b py-2 text-[14px] focus:outline-none transition-colors"
                    style={{ borderColor: "rgba(255,255,255,0.12)", color: "var(--text)" }}
                    onFocus={e   => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
                    onBlur={e    => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                </div>
              ))}
              <div>
                <label className="font-mono-label text-[9px] tracking-[0.3em] block mb-3" style={{ color: "var(--text-3)" }}>
                  MESSAGE / 訊息
                </label>
                <textarea required rows={4} placeholder="Tell me about your project"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b py-2 text-[14px] focus:outline-none transition-colors resize-none"
                  style={{ borderColor: "rgba(255,255,255,0.12)", color: "var(--text)" }}
                  onFocus={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
                  onBlur={e   => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                />
              </div>
              <button type="submit"
                className="font-mono-label text-[10px] tracking-[0.25em] border px-7 py-3.5 transition-all duration-300"
                style={{ color: "var(--text)", borderColor: "rgba(255,255,255,0.18)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                SEND MESSAGE →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
