import Header from "../../components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      {/* HEADER */}
      <Header />
      {/* HERO */}
      <section className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-blue-400 font-semibold mb-4">ABOUT US</p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Building The Future Of AI News
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl leading-8">
            AI Daily News is a modern platform focused on delivering the latest
            updates about artificial intelligence, machine learning, startups,
            and technology innovations.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-8">
              We help people stay informed about the rapidly evolving AI
              industry by collecting and presenting high-quality news from
              trusted sources around the world.
            </p>

            <p className="text-gray-600 leading-8 mt-5">
              Our goal is to create a clean, modern, and fast platform where
              developers, students, engineers, and tech enthusiasts can easily
              explore the newest AI breakthroughs.
            </p>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What We Cover
            </h2>

            <ul className="space-y-5 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                Artificial Intelligence
              </li>

              <li className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                AI Startups & Innovation
              </li>

              <li className="flex items-center gap-3">
                <span className="text-2xl">🧠</span>
                Machine Learning
              </li>

              <li className="flex items-center gap-3">
                <span className="text-2xl">💻</span>
                Software & Technology
              </li>

              <li className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                Future Tech Trends
              </li>
            </ul>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border">
            <h3 className="text-4xl font-bold text-black">24/7</h3>
            <p className="text-gray-500 mt-2">News Updates</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border">
            <h3 className="text-4xl font-bold text-black">100+</h3>
            <p className="text-gray-500 mt-2">AI Articles</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border">
            <h3 className="text-4xl font-bold text-black">50+</h3>
            <p className="text-gray-500 mt-2">Trusted Sources</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border">
            <h3 className="text-4xl font-bold text-black">Global</h3>
            <p className="text-gray-500 mt-2">AI Community</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-gray-500 text-sm">
          © 2026 AI Daily News — Powered by Next.js & Tailwind CSS
        </div>
      </footer>
    </div>
  );
}
