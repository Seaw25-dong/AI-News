const Parser = require("rss-parser");

const parser = new Parser();

async function fetchNews() {

  const feed =
    await parser.parseURL(
      "https://openai.com/blog/rss.xml"
    );

  return feed.items;
}

module.exports = fetchNews;