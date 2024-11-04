const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: "Location" } // Liên kết với địa điểm
});

module.exports = mongoose.model("Blog", blogSchema);

