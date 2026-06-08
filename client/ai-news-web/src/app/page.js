"use client";

import NewsCard from "../components/NewsCard";
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Home() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  const pageSize = 6;

  useEffect(() => {
    fetch("http://localhost:3001/news")
      .then((res) => res.json())
      .then((data) => {
        console.log("API data:", data);

        if (Array.isArray(data)) {
          setNews(data);
        } else if (Array.isArray(data?.data)) {
          setNews(data.data);
        } else {
          setNews([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setNews([]);
      });
  }, []);

  const startIndex = (page - 1) * pageSize;
  const currentNews = news.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(news.length / pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden">

      {/* HEADER */}
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white overflow-hidden relative">

        {/* HERO GLOW */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-blob" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">

          <div className="animate-fadeInUp">

            <p className="text-blue-400 font-semibold tracking-[0.3em] uppercase">
              AI DAILY NEWS
            </p>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl mt-5">
              Stay Updated With The Future Of AI
            </h2>

            <p className="mt-6 text-lg text-gray-300 max-w-2xl leading-8">
              Discover the newest breakthroughs in artificial intelligence,
              machine learning, robotics, and modern technology.
            </p>

            <button
              className="
                mt-8
                bg-white
                text-black
                px-7 py-4
                rounded-2xl
                font-semibold
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-2xl
                hover:-translate-y-1
                active:scale-95
              "
            >
              Explore News
            </button>

          </div>

        </div>

      </section>

      {/* NEWS SECTION */}
      <main className="relative max-w-6xl mx-auto px-6 py-20 overflow-hidden">

        {/* BACKGROUND ANIMATION */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          <div
            className="
              absolute
              top-20
              left-0
              w-80
              h-80
              bg-purple-400/20
              rounded-full
              blur-3xl
              animate-blob
            "
          />

          <div
            className="
              absolute
              top-[500px]
              right-0
              w-[450px]
              h-[450px]
              bg-blue-400/20
              rounded-full
              blur-3xl
              animate-blob
              animation-delay-2000
            "
          />

          <div
            className="
              absolute
              bottom-20
              left-1/3
              w-[400px]
              h-[400px]
              bg-pink-400/10
              rounded-full
              blur-3xl
              animate-blob
              animation-delay-4000
            "
          />

        </div>

        {/* TITLE */}
        <div className="relative z-10 flex items-center justify-between mb-14">

          <div>
            <h3 className="text-4xl font-bold text-gray-900">
              Latest Articles
            </h3>

            <p className="text-gray-500 mt-3 text-lg">
              Explore the newest AI and technology news
            </p>
          </div>

          <div
            className="
              text-sm
              text-gray-600
              bg-white/80
              backdrop-blur-xl
              px-5
              py-3
              rounded-2xl
              shadow-lg
              border
              border-white/50
            "
          >
            {news.length} Articles
          </div>

        </div>

        {/* GRID */}
        <div
          key={page}
          className="
            relative
            z-10
            flex
            flex-col
            gap-12
            animate-fadeIn
          "
        >
          {currentNews.map((item, index) => (
            <div
              key={index}
              className={`
                transition-all
                duration-500
                ${index % 2 === 0 ? "self-start" : "self-end"}
              `}
            >
              <NewsCard
                index={index}
                title={item.title}
                summary={item.summary}
                link={item.link}
                createdAt={item.createdAt}
              />
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {news.length === 0 && (
          <div className="text-center py-20 text-gray-500 relative z-10">
            No news available.
          </div>
        )}

        {/* PAGINATION */}
        <div className="relative z-10 flex items-center justify-center gap-5 mt-20">

          {/* PREV */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="
              group
              px-6 py-3
              rounded-2xl
              bg-white/80
              backdrop-blur-xl
              border
              border-white/50
              shadow-lg
              font-semibold
              transition-all
              duration-300
              hover:bg-black
              hover:text-white
              hover:shadow-2xl
              hover:-translate-y-1
              active:scale-95
              disabled:opacity-30
              disabled:hover:translate-y-0
            "
          >
            <span className="inline-flex items-center gap-2">
              ← Prev
            </span>
          </button>

          {/* PAGE */}
          <div
            className="
              px-6 py-3
              bg-black
              text-white
              rounded-2xl
              font-bold
              shadow-2xl
              animate-pulse
            "
          >
            {page} / {totalPages || 1}
          </div>

          {/* NEXT */}
          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
            className="
              group
              px-6 py-3
              rounded-2xl
              bg-white/80
              backdrop-blur-xl
              border
              border-white/50
              shadow-lg
              font-semibold
              transition-all
              duration-300
              hover:bg-black
              hover:text-white
              hover:shadow-2xl
              hover:-translate-y-1
              active:scale-95
              disabled:opacity-30
              disabled:hover:translate-y-0
            "
          >
            <span className="inline-flex items-center gap-2">
              Next →
            </span>
          </button>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-white/70 backdrop-blur-xl border-t border-white/50 mt-24">

        <div className="max-w-6xl mx-auto px-6 py-10 text-center">

          <h4 className="font-bold text-gray-900 text-xl">
            AI Daily News
          </h4>

          <p className="text-gray-500 mt-2 text-sm">
            Built with Next.js & Tailwind CSS
          </p>

          <p className="text-gray-400 text-sm mt-4">
            © 2026 All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}