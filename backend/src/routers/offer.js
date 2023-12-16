const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offer");
const { auth } = require("../middlewares/auth");

// Create an offer
router.post("/create/:listingId", auth, offerController.createOffer);

// Get offers for a specific listing
router.get("/listing/:listingId", offerController.getOffersByListing);

// Route to get offers by user
router.get("/user/:userId", offerController.getOffersByUser);

// Update the status of an offer
router.put("/update/:offerId", auth, offerController.updateOfferStatus);

//Delete offer, using patch because it is updating status rather than delete
router.patch("/cancel/:offerId", auth, offerController.deleteOffer);

module.exports = router;
