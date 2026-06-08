require("dotenv").config();

const cron = require("node-cron");

const connectDB = require("./db");
const fetchNews = require("./rss");
const summarize = require("./summarize");
const News = require("./models/News");

let isRunning = false;

const CONCURRENCY = 3;

async function runBot() {

  if (isRunning) {
    console.log("⏳ Bot still running... skip");
    return;
  }

  isRunning = true;

  try {

    console.log("Checking news...");

    const news = await fetchNews();

    if (!news?.length) return;

    // sort mới nhất
    news.sort(
      (a, b) =>
        new Date(b.pubDate || b.isoDate) -
        new Date(a.pubDate || a.isoDate)
    );

    let insertedCount = 0;

    // batch processing
    for (
      let i = 0;
      i < news.length;
      i += CONCURRENCY
    ) {

      const batch =
        news.slice(i, i + CONCURRENCY);

      const results =
        await Promise.all(
          batch.map(processItem)
        );

      insertedCount +=
        results.filter(Boolean).length;

      // max 5 bài mỗi lần chạy
      if (insertedCount >= 5) {

        console.log(
          "Reached limit 5 articles"
        );

        break;
      }
    }

  } catch (err) {

    console.error(
      "Bot error:",
      err.message
    );

  } finally {

    isRunning = false;
  }
}

// =======================
// PROCESS ITEM
// =======================
async function processItem(item) {

  if (!item?.title || !item?.link) {
    return null;
  }

  // duplicate check
  const exists =
    await News.findOne({
      link: item.link,
    });

  if (exists) {
    return null;
  }

  console.log(
    "New article:",
    item.title
  );

  // summarize AI
  const summary =
    await summarizeSafe(
      item.contentSnippet ||
      item.title
    );

  const article =
    await News.create({

      title: item.title,

      summary,

      link: item.link,

      publishedAt: new Date(
        item.pubDate ||
        item.isoDate ||
        Date.now()
      ),

      createdAt: new Date(),
    });

  console.log(
    "Saved:",
    article.title
  );

  // realtime socket
  if (global.io) {

    global.io.emit(
      "new-news",
      article
    );
  }

  return article;
}

// =======================
// SAFE SUMMARY
// =======================
async function summarizeSafe(text) {

  try {

    return await summarize(text);

  } catch (err) {

    console.log(
      "Summarize failed:",
      err.message
    );

    return text;
  }
}

// =======================
// START
// =======================
async function start() {

  await connectDB();

  console.log("Bot running...");

  // chạy ngay lần đầu
  await runBot();

  // chạy mỗi 2 phút
  cron.schedule(
    "*0 * * * *",
    runBot
  );
}

start();