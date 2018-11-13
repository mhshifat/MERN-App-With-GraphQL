const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Author", authorSchema);
