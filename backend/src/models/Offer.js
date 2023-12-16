const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
  {
    buyer: {
      type: String,
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: "User",
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
      enum: ["pending", "accepted", "declined", "cancelled"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true }, // Enable virtuals in JSON output
    toObject: { virtuals: true },
  }
);

// Virtual for 'offerId' that returns the '_id' as a string
OfferSchema.virtual("offerId").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("Offer", OfferSchema);
