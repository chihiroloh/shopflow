const OfferModel = require("../models/offer");
const ListingModel = require("../models/Listing");
const UserModel = require("../models/User");

const offerController = {
  createOffer: async (req, res) => {
    try {
      const { price } = req.body;
      const buyer = req.user.username;
      const listingId = req.params.listingId; // Extract listingId from URL parameter

      if (!listingId) {
        return res.status(400).send("Listing ID is required.");
      }

      const offer = new OfferModel({
        buyer,
        listing: listingId,
        price,
      });

      await offer.save();
      res.status(201).json(offer);
    } catch (error) {
      res.status(500).send("Server Error: " + error.message);
    }
  },

  getOffersByListing: async (req, res) => {
    try {
      const { listingId } = req.params;
      const offers = await OfferModel.find({ listing: listingId }).populate(
        "buyer",
        "username"
      );
      res.json(offers);
    } catch (error) {
      res.status(500).send("Server Error: " + error.message);
    }
  },

  getOffersByUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const offers = await OfferModel.find({ buyer: userId }).populate(
        "listing"
      );
      res.json(offers);
    } catch (error) {
      res.status(500).send("Server Error: " + error.message);
    }
  },

  updateOfferStatus: async (req, res) => {
    try {
      const { offerId } = req.params;
      const { status } = req.body; // 'accepted' or 'declined'

      console.log("Received status:", status);

      const offer = await OfferModel.findById(offerId);
      if (!offer) {
        return res.status(404).send("Offer not found");
      }

      console.log("Before update:", offer);

      offer.status = status;

      await offer.save();

      const updatedOffer = await OfferModel.findById(offerId);
      console.log("After update:", updatedOffer);

      res.send("Offer status updated successfully");
    } catch (error) {
      res.status(500).send("Server Error: " + error.message);
    }
  },
};

module.exports = offerController;
