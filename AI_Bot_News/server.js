require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const connectDB = require("./db");
const News = require("./models/News");
const { startBot } = require("./bot");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

global.io = io;

// API
app.get("/news", async (req, res) => {
  try {
    const news = await News.find().sort({
      publishedAt: -1,
    });

    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function start() {
  await connectDB();
  console.log("DB connected");

  // start bot trong cùng process
  startBot();

  server.listen(3001, () => {
    console.log("Server running on port 3001");
  });
}

start();