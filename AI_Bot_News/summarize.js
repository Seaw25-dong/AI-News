require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function summarize(text) {

  try {

    const response = await Promise.race([

      client.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [
          {
            role: "user",
            content:
              `Summarize this AI news in 2 short sentences:\n${text}`
          }
        ]

      }),

      // timeout 15s
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Timeout")),
          15000
        )
      )

    ]);

    return response
      .choices[0]
      .message
      .content;

  } catch (err) {

    console.log("Summarize error:", err.message);

    return text;
  }
}

module.exports = summarize;