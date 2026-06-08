const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    console.log("Mongo already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;

    console.log("Mongo connected");
  } catch (err) {
    console.log("Mongo error:", err.message);
    throw err;
  }
};

module.exports = connectDB;