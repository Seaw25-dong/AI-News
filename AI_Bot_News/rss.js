const Parser = require("rss-parser");
const parser = new Parser();

const FEEDS = [
  { url: "https://openai.com/blog/rss.xml", source: "openai" },

  { url: "https://vnexpress.net/rss/tin-moi-nhat.rss", source: "vnexpress" },
  { url: "https://vnexpress.net/rss/so-hoa.rss", source: "vnexpress" },

  { url: "https://tuoitre.vn/rss/tin-moi-nhat.rss", source: "tuoitre" },
  { url: "https://thanhnien.vn/rss/home.rss", source: "thanhnien" },
  { url: "https://dantri.com.vn/rss/home.rss", source: "dantri" },
];

async function fetchNews() {
  const results = await Promise.all(
    FEEDS.map(async (feedObj) => {
      try {
        const feed = await parser.parseURL(feedObj.url);

        return (feed.items || []).map((item) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          isoDate: item.isoDate,
          contentSnippet: item.contentSnippet || item.content,
          source: feedObj.source,
        }));
      } catch (err) {
        console.log("RSS failed:", feedObj.url, err.message);
        return [];
      }
    })
  );

  return results.flat();
}

module.exports = fetchNews;