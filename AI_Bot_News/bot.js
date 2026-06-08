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

    news.sort(
      (a, b) =>
        new Date(b.pubDate || b.isoDate) -
        new Date(a.pubDate || a.isoDate)
    );

    let insertedCount = 0;

    for (let i = 0; i < news.length; i += CONCURRENCY) {
      const batch = news.slice(i, i + CONCURRENCY);

      const results = await Promise.all(
        batch.map(processItem)
      );

      insertedCount += results.filter(Boolean).length;

      if (insertedCount >= 5) break;
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