// // //models/Location.js
// const mongoose = require('mongoose');

// const locationSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: false },
//   description: { type: String, required: true }
// });

// const Location = mongoose.model('Location', locationSchema);

// module.exports = Location;

const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  description: { type: String, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }] // Mảng ID của các blog liên kết
});

module.exports = mongoose.model("Location", locationSchema);


