const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offer");
const { auth } = require("../middlewares/auth");

// Create an offer
router.post("/create", auth, offerController.createOffer);

// Get offers for a specific listing
router.get("/listing/:listingId", offerController.getOffersByListing);

// Update the status of an offer
router.put("/update/:offerId", auth, offerController.updateOfferStatus);

module.exports = router;
