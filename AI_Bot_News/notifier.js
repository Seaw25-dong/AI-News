const axios = require("axios");
async function sendMessage(message) {
  await axios.post(process.env.DISCORD_WEBHOOK, { content: message });
}
module.exports = sendMessage;
