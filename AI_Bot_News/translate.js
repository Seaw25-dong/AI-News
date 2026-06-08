require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function translateToVI(text) {
  try {
    const response = await Promise.race([
      client.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "user",
            content: `Translate to Vietnamese:\n${text}`,
          },
        ],
      }),

      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Translate timeout")), 10000)
      ),
    ]);

    return response.choices[0].message.content;
  } catch (err) {
    console.log("Translate error:", err.message);

    return text;
  }
}

module.exports = translateToVI;