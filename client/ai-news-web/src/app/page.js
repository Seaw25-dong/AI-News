"use client";
import NewsCard from "../components/NewsCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  const pageSize = 10;

 useEffect(() => {
  fetch("http://localhost:3001/news")
    .then(res => res.json())
    .then(data => {
      console.log("API data:", data);

      // FIX CỨNG
      if (Array.isArray(data)) {
        setNews(data);
      } else if (Array.isArray(data?.data)) {
        setNews(data.data);
      } else {
        setNews([]);
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setNews([]);
    });
}, []);

  const startIndex = (page - 1) * pageSize;
  const currentNews = news.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(news.length / pageSize);

  return (
    <div className="p-6">

      {currentNews.map((item, index) => (
        <NewsCard
          key={index}
          title={item.title}
          summary={item.summary}
          link={item.link}
          createdAt={item.createdAt}
        />
      ))}

      {/* PAGINATION */}
      <div className="flex gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>

        <span className="px-3 py-1">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>

    </div>
  );
}