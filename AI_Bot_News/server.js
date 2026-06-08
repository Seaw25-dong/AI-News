require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const connectDB = require("./db");
const News = require("./models/News");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

global.io = io;

// ⬇️ QUAN TRỌNG: start server sau khi connect DB
async function start() {
  await connectDB();

app.get(
  "/news",
  async (req, res) => {

    try {

      const news =
        await News.find()
          .sort({
            publishedAt: -1
          });

      res.json(news);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);

  server.listen(3001, () => {
    console.log("Server running on port 3001");
  });
}

start();