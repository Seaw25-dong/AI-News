require("dotenv").config();

const cron = require("node-cron");

const connectDB = require("./db");
const fetchNews = require("./rss");
const summarize = require("./summarize");
const News = require("./models/News");
const translateToVI = require("./translate");
async function runBot() {
  try {
    console.log("Checking news...");

    const news = await fetchNews();

    if (!news || news.length === 0) return;

    // 🔥 SORT: mới nhất trước
    news.sort((a, b) => {
      return (
        new Date(b.pubDate || b.isoDate) - new Date(a.pubDate || a.isoDate)
      );
    });

    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

    let insertedCount = 0; // 🔥 chỉ đếm bài mới insert

    for (const item of news) {
      if (insertedCount >= 5) {
        console.log("Reached limit 5 NEW articles");
        break;
      }

      if (!item?.title || !item?.link) continue;

      const itemDate = new Date(item.pubDate || item.isoDate);

      // 🔥 chỉ lấy bài 24h
      if (itemDate.getTime() < oneDayAgo) continue;

      // check duplicate
      const exists = await News.findOne({ link: item.link });

      if (exists) {
        continue;
      }

      let titleVI = "";
      let summaryVI = "";

      try {
        titleVI = await translateToVI(item.title);
      } catch {
        titleVI = item.title;
      }

      try {
        summaryVI = await summarize(item.contentSnippet || item.title);
        summaryVI = await translateToVI(summaryVI);
      } catch {
        summaryVI = item.contentSnippet || item.title;
      }
      console.log("New article:", item.title);

      let summary = "";

      try {
        summary = await summarize(item.contentSnippet || item.title);
      } catch (err) {
        summary = item.title;
      }

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

      insertedCount++; // 🔥 chỉ tăng khi insert thành công
    }
  } catch (err) {
    console.error("Bot error:", err.message);
  }
}

// 🔥 START
async function start() {
  await connectDB();

  console.log("Mongo connected");
  console.log("Bot running...");

  await runBot();

  cron.schedule("0 * * * *", async () => {
    await runBot();
  });
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
