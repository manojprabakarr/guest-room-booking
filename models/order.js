const mongoose = require("mongoose");

const orderschema = mongoose.Schema({
  product: { type: String, required: true },
  guestname: {
    type: String,
    required: true,
  },
  guestphno: {
    type: String,
    required: true,
  },
  startdate: {
    type: String,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("order", orderschema);
