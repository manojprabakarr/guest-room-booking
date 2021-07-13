const mongoose = require("mongoose");

const rentschema = mongoose.Schema({
  location: {
    type: "String",
    required: true,
  },

  price_perday: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },

  postimage: {
    type: "String",
    required: true,
  },
  posteddate: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rentpost", rentschema);
