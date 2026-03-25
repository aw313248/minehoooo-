const projects = [
  {
    title: "電商平台",
    description: "使用 Next.js 與 Stripe 打造的全功能電商網站，支援購物車、金流與會員系統。",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    link: "#",
    color: "from-indigo-500/20 to-purple-500/20",
  },
  {
    title: "任務管理 App",
    description: "拖曳式任務管理工具，支援即時協作與多種視圖切換（看板、列表、日曆）。",
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    link: "#",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "AI 內容生成器",
    description: "整合 Claude API 的智慧內容生成工具，協助用戶快速產出高品質文案。",
    tags: ["Next.js", "Claude API", "Tailwind", "Vercel"],
    link: "#",
    color: "from-orange-500/20 to-rose-500/20",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
            My Work
          </p>
          <h2 className="text-4xl font-bold text-white">精選作品</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              className="group block bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all hover:-translate-y-1 duration-300"
            >
              {/* Color block */}
              <div className={`w-full h-36 rounded-xl bg-gradient-to-br ${project.color} mb-6`} />

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-md"
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
