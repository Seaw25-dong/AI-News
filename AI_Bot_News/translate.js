const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function translateToVI(text) {
  if (!text) return "";

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Translate to natural Vietnamese, keep meaning, no extra explanation.",
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return res.choices[0].message.content.trim();
}

module.exports = translateToVI;