const projects = [
  {
    title: "電商平台",
    description: "使用 Next.js 與 Stripe 打造的全功能電商網站，支援購物車、金流與會員系統",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    link: "#",
  },
  {
    title: "任務管理 App",
    description: "拖曳式任務管理工具，支援即時協作與多種視圖切換（看板、列表、日曆）",
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    title: "AI 內容生成器",
    description: "整合 Claude API 的智慧內容生成工具，協助用戶快速產出高品質文案",
    tags: ["Next.js", "Claude API", "Tailwind", "Vercel"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--bg-dark)",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            className="font-mono-label"
            style={{
              fontSize: "0.56rem",
              letterSpacing: "0.32em",
              color: "var(--text-3)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            My Work
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem,6vw,4rem)",
              color: "var(--text)",
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            精選作品
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              style={{
                display: "block",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                textDecoration: "none",
                transition: "border-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--border-2)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--border)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Color block placeholder */}
              <div
                style={{
                  width: "100%",
                  height: "9rem",
                  borderRadius: "0.375rem",
                  background: "var(--bg-raised)",
                  marginBottom: "1.5rem",
                  border: "1px solid var(--border)",
                }}
              />

              <h3
                className="font-display"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text)",
                  letterSpacing: "0.02em",
                  marginBottom: "0.5rem",
                  transition: "color 0.3s ease",
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "var(--text-2)",
                  marginBottom: "1rem",
                }}
              >
                {project.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono-label"
                    style={{
                      fontSize: "0.5rem",
                      letterSpacing: "0.18em",
                      padding: "3px 8px",
                      background: "var(--bg-raised)",
                      color: "var(--text-3)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.125rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
