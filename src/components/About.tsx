const skills = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Tailwind CSS", "PostgreSQL", "Figma", "Git",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
              About Me
            </p>
            <h2 className="text-4xl font-bold text-white mb-6">關於我</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                我是一名熱愛設計與技術的開發者，專注於打造兼具美感與功能性的網頁應用程式。
                擁有多年前後端開發經驗，喜歡將創意轉化為真實的產品。
              </p>
              <p>
                工作之餘，我持續學習新技術、探索設計趨勢，並樂於參與開源社群。
                我相信好的產品來自於對細節的堅持與對使用者的同理心。
              </p>
            </div>

            <a
              href="#contact"
              className="inline-block mt-8 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm font-medium transition-colors"
            >
              聯絡我合作 →
            </a>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">技術技能</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 text-gray-300 rounded-full text-sm hover:border-indigo-500/50 hover:text-indigo-300 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { number: "3+", label: "年經驗" },
                { number: "20+", label: "完成專案" },
                { number: "10+", label: "滿意客戶" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
