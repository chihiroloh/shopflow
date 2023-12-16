const OfferModel = require("../models/offer");
const ListingModel = require("../models/Listing");
const UserModel = require("../models/User");

const offerController = {
  createOffer: async (req, res) => {
    try {
      const { price } = req.body;
      const buyerId = req.user.id; // Authenticated user's ID
      const buyer = req.user.username;
      const listingId = req.params.listingId; // Extract listingId from URL parameter

      if (!listingId) {
        return res.status(400).send("Listing ID is required.");
      }
      const listing = await ListingModel.findById(listingId);
      if (!listing) {
        return res.status(404).send("Listing not found.");
      }
      const offer = new OfferModel({
        buyerId,
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
      const { userId } = req.params; // Get the user ID from the URL parameter
      const offers = await OfferModel.find({ buyerId: userId }).populate(
        "listing"
      );

      if (!offers) {
        return res.status(404).send("Offers not found.");
      }

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

      // Use populate to retrieve the offer with the associated listing and its user
      const offer = await OfferModel.findById(offerId).populate("listing");

      if (!offer) {
        console.log("Offer not found");
        return res.status(404).send("Offer not found");
      }

      console.log("Before update:", offer);

      // Ensure that the offer has a valid listing associated with it
      if (!offer.listing) {
        console.log("Offer has no associated listing");
        return res.status(400).send("Offer has no associated listing");
      }

      // Log the user IDs for debugging
      console.log("User ID:", req.user.id);
      console.log("Listing Owner ID:", offer.listing.user);

      // Check if the user making the request is the owner of the listing associated with the offer
      if (
        offer.listing.user &&
        offer.listing.user.toString() !== req.user.id.toString()
      ) {
        console.log("Unauthorized to update this offer");
        return res.status(403).send("Unauthorized to update this offer");
      } else {
        console.log("User is authorized"); // Added console log here
      }

      console.log("After the 'if' condition check"); // Added console log here

      offer.status = status;

      await offer.save();

      const updatedOffer = await OfferModel.findById(offerId);
      console.log("After update:", updatedOffer);

      res.send("Offer status updated successfully");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Server Error: " + error.message);
    }
  },

  deleteOffer: async (req, res) => {
    try {
      const { offerId } = req.params;

      const offer = await OfferModel.findById(offerId);
      if (!offer) {
        return res.status(404).send("Offer not found");
      }

      // Debugging statements
      console.log("req.user:", req.user);
      console.log("offer.buyerId:", offer.buyerId);

      // Check if the request is made by the offer's owner or an authorized user
      if (req.user.id.toString() !== offer.buyerId.toString()) {
        console.log("Unauthorized to delete this offer");
        return res.status(403).send("Unauthorized to delete this offer");
      }

      offer.status = "cancelled";
      await offer.save();

      res.send({ message: "Offer cancelled successfully", offer });
    } catch (error) {
      res.status(500).send("Server Error: " + error.message);
    }
  },
};

module.exports = offerController;
