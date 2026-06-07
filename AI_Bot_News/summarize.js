require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function summarize(text) {

  const response =
    await client.chat.completions.create({

      model: "gpt-4.1-mini",

      messages: [
        {
          role: "user",
          content:
            `Summarize this AI news:\n${text}`
        }
      ]
    });

  return response
    .choices[0]
    .message
    .content;
}

module.exports = summarize;