const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  authorId: String,
  name: String,
  genre: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Book", bookSchema);
