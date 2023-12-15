const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  buyer: {
    type: String,
    required: true,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "listing",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Offer", OfferSchema);
