const axios = require("axios");

async function test() {

  await axios.post(
    process.env.DISCORD_WEBHOOK,
    {
      content: "Bot hoạt động rồi 🚀"
    }
  );

  console.log("Sent");
}

require("dotenv").config();

test();