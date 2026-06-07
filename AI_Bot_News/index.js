require("dotenv").config();

const cron = require("node-cron");

const fetchNews = require("./rss");
const summarize = require("./summarize");
const sendMessage = require("./notifier");

async function runBot() {

  console.log("Checking news...");

  const news = await fetchNews();

  for (const item of news.slice(0, 3)) {

    const summary =
      await summarize(item.contentSnippet);

    const message = `
# ${item.title}

${summary}

${item.link}
`;

    await sendMessage(message);

    console.log("Sent:", item.title);
  }
}

cron.schedule("*/2 * * * *", () => {
  runBot();
});

console.log("Bot is running...");