const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({

  title: String,

  summary: String,

  link: {
    type: String,
    unique: true,
  },

  publishedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const News =
  mongoose.model(
    "News",
    newsSchema
  );

module.exports = News;