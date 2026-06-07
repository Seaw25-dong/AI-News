require("dotenv").config();

const cron = require("node-cron");
const connectDB = require("./db");
const fetchNews = require("./rss");
const summarize = require("./summarize");
const translateToVI = require("./translate");
const News = require("./models/News");

let isRunning = false;

async function runBot() {
  if (isRunning) {
    console.log("⏳ Bot still running... skip this cycle");
    return;
  }

  isRunning = true;

  try {
    console.log("Checking news...");

    const news = await fetchNews();
    if (!news || news.length === 0) return;

    // sort mới nhất
    news.sort(
      (a, b) =>
        new Date(b.pubDate || b.isoDate) -
        new Date(a.pubDate || a.isoDate)
    );

    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    let insertedCount = 0;

    for (const item of news) {
      if (insertedCount >= 5) break;

      if (!item?.title || !item?.link) continue;

      const itemDate = new Date(item.pubDate || item.isoDate || Date.now());

      if (itemDate.getTime() < oneDayAgo) continue;

      // check duplicate nhanh
      const exists = await News.findOne({ link: item.link });
      if (exists) continue;

      console.log("New article:", item.title);

      // ⚡ xử lý song song 2 task chính
      const [titleVI, summaryRaw] = await Promise.all([
        translateSafe(item.title),
        summarizeSafe(item.contentSnippet || item.title),
      ]);

      const summaryVI = await translateSafe(summaryRaw);

      const article = await News.create({
        title: titleVI,
        summary: summaryVI,
        link: item.link,
        publishedAt: itemDate,
        createdAt: new Date(),
      });

      console.log("Saved:", article.title);

      if (global.io) {
        global.io.emit("new-news", article);
      }

      insertedCount++;
    }
  } catch (err) {
    console.error("Bot error:", err.message);
  } finally {
    isRunning = false;
  }
}

// helper: translate safe
async function translateSafe(text) {
  try {
    return await translateToVI(text);
  } catch {
    return text;
  }
}

// helper: summarize safe
async function summarizeSafe(text) {
  try {
    return await summarize(text);
  } catch {
    return text;
  }
}

async function start() {
  await connectDB();

  console.log("Mongo connected");
  console.log("Bot running...");

  await runBot();

  // chạy mỗi 2 phút
  cron.schedule("*/2 * * * *", runBot);
}

start();

/*RSS feed
  ↓
lọc bài < 24h
  ↓
check DB
  ↓
AI summary
  ↓
save Mongo
  ↓
stop khi đủ 5 bài*/

/*✔ chỉ lấy bài mới 24h
✔ tối đa 5 bài
✔ không spam lại bài cũ
✔ không chạy loop vô hạn*/
