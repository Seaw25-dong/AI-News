const cron = require("node-cron");
const fetchNews = require("./rss");
const summarize = require("./summarize");
const News = require("./models/News");

let isRunning = false;
const CONCURRENCY = 3;

async function runBot() {
  if (isRunning) return;

  isRunning = true;

  try {
    console.log("Checking news...");

    const news = await fetchNews();
    if (!news?.length) return;

    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    // =========================
    // 1. FILTER 24h
    // =========================
    const last24h = news.filter((item) => {
      const time = new Date(item.pubDate || item.isoDate).getTime();
      return now - time <= ONE_DAY;
    });

    // =========================
    // 2. GROUP BY SOURCE
    // =========================
    const grouped = {};

    for (const item of last24h) {
      const key = item.source || "unknown";

      if (!grouped[key]) grouped[key] = [];

      grouped[key].push(item);
    }

    // =========================
    // 3. SORT + LIMIT 2–3 mỗi source
    // =========================
    const finalNews = [];

    Object.keys(grouped).forEach((source) => {
      const sorted = grouped[source].sort(
        (a, b) =>
          new Date(b.pubDate || b.isoDate) -
          new Date(a.pubDate || a.isoDate)
      );

      finalNews.push(...sorted.slice(0, 3)); // 2–3 bài mỗi source
    });

    // =========================
    // 4. PROCESS
    // =========================
    let insertedCount = 0;

    for (let i = 0; i < finalNews.length; i += CONCURRENCY) {
      const batch = finalNews.slice(i, i + CONCURRENCY);

      const results = await Promise.all(
        batch.map(processItem)
      );

      insertedCount += results.filter(Boolean).length;

      if (insertedCount >= 10) break; // optional limit
    }

  } catch (err) {
    console.error("Bot error:", err.message);
  } finally {
    isRunning = false;
  }
}

async function processItem(item) {
  if (!item?.title || !item?.link) return null;

  const exists = await News.findOne({ link: item.link });
  if (exists) return null;

  const summary = await summarizeSafe(
    item.contentSnippet || item.title
  );

  const article = await News.create({
    title: item.title,
    summary,
    link: item.link,
    publishedAt: new Date(item.pubDate || item.isoDate || Date.now()),
    createdAt: new Date(),
  });

  if (global.io) {
    global.io.emit("new-news", article);
  }

  return article;
}

async function summarizeSafe(text) {
  try {
    return await summarize(text);
  } catch {
    return text;
  }
}

function startBot() {
  console.log("Bot started");

  runBot(); // chạy ngay

  cron.schedule("*/2 * * * *", runBot);
}

module.exports = { startBot };