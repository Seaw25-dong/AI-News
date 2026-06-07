const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  titleEn: String,      // optional
  summary: String,
  link: { type: String, unique: true },
  publishedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});