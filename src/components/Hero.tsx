export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-950 to-gray-950" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          歡迎來到我的作品集
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Hi, 我是
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            {" "}你的名字
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 leading-relaxed">
          全端開發者 · UI/UX 設計師 · 創造有溫度的數位體驗
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-colors"
          >
            查看作品
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-full font-medium transition-colors"
          >
            聯絡我
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-gray-600 to-transparent" />
      </div>
    </section>
  );
}
