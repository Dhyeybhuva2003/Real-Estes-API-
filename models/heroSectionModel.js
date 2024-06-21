const mongoose = require("mongoose");

const heroSectionSchema = new mongoose.Schema({
  media: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Staring",
  },
});

module.exports = mongoose.model("HeroSection", heroSectionSchema);
