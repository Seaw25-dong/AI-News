const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.PASTE_URI_FULL;

mongoose.connect(uri)
  .then(() => {
    console.log("CONNECTED");
    process.exit();
  })
  .catch(err => {
    console.log(err);
  });