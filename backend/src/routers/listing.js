const express = require("express");
const router = express.Router();
const ListingModel = require("../models/Listing"); // Import your Listing model
const { createListing } = require("../controllers/listing");
const { auth } = require("../middlewares/auth"); // Import the authentication middleware
const OfferModel = require("../models/Offer"); // Import your Offer model

// Create a new listing
router.post("/", auth, createListing);

// Get all listings
router.get("/", async (req, res) => {
  try {
    // Fetch all listings from the database
    const listings = await ListingModel.find();

    // Send the listings as a JSON response
    res.json(listings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get a single listing by ID
router.get("/:id", async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    // Send the listing as a JSON response
    res.json(listing);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update a listing by ID
router.put("/:id", auth, async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    // Extract and update the fields you want to modify from the request body
    if (req.body.title) {
      listing.title = req.body.title;
    }
    if (req.body.description) {
      listing.description = req.body.description;
    }
    if (req.body.price) {
      listing.price = req.body.price;
    }
    if (req.body.category) {
      listing.category = req.body.category;
    }

    // Save the updated listing
    await listing.save();

    // Send a success response
    res.json({ msg: "Listing updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete a listing by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    // Delete the listing from the database using deleteOne()
    await ListingModel.deleteOne({ _id: req.params.id });

    // Send a success response
    res.json({ msg: "Listing deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Create an offer on a listing
router.post("/:id/offers", auth, async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    const { price } = req.body; // Assuming you want to use 'price' instead of 'amount'
    const buyer = req.user.id;

    // Create a new offer
    const offer = new OfferModel({
      buyer,
      listing: listing._id,
      price, // Use 'price' here
    });

    await offer.save();

    res.json(offer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get offers on a specific listing
router.get("/:id/offers", auth, async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    // Ensure that the user requesting the offers is the seller of the listing
    if (listing.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    // Get all offers for the listing
    const offers = await OfferModel.find({ listing: listing._id });

    res.json(offers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Accept or decline an offer
router.put("/offers/:id/:status", auth, async (req, res) => {
  try {
    const offer = await OfferModel.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ msg: "Offer not found" });
    }

    // Ensure that the user accepting/declining the offer is the seller
    const listing = await ListingModel.findById(offer.listing);
    if (listing.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    // Update the offer status
    offer.status = req.params.status;

    await offer.save();

    res.json({ msg: "Offer updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
