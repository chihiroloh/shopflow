const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offer");
const { auth } = require("../middlewares/auth");

router.post("/create/:listingId", auth, offerController.createOffer);

router.get("/listing/:listingId", offerController.getOffersByListing);

router.get("/user/:userId", offerController.getOffersByUser);

router.put("/update/:offerId", auth, offerController.updateOfferStatus);

router.patch("/cancel/:offerId", auth, offerController.deleteOffer);

module.exports = router;
