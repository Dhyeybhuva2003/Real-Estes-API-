// models/propertyModel.js

const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  images: [
    {
      type: String,
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  bhk: {
    type: String,
    required: true,
  },
  sqft: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brochure: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cityArea: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  propertySize: {
    type: String,
    required: true,
  },
  segment: {
    type: String,
    required: true,
  },
  categoryType: {
    type: String,
    required: true,
  },
  passionStatus: {
    type: String,
    required: true,
  },
  searchBudget: {
    type: String,
    required: true,
  },
  features: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Property", propertySchema);
