const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const listingController = require("../controllers/listing");

router.post("/", auth, listingController.createListing);
router.get("/", listingController.getAllListings);
router.get("/:id", listingController.getSingleListing);
router.get("/category/:category", listingController.getListingsByCategory);
router.put("/:id", auth, listingController.updateListing);
router.delete("/:id", auth, listingController.deleteListing);

module.exports = router;
