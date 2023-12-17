const express = require("express");
const imageUpload = require("../controllers/imageUpload");
const upload = require("../middlewares/imageUpload");

const router = express.Router();

router.post(
  "/",
  auth,
  upload.array("images", 5),
  listingController.createListing
); // Allow up to 5 images for creating a listing
router.put(
  "/:id",
  auth,
  upload.array("images", 5),
  listingController.updateListing
); // Allow up to 5 images for updating a listing

module.exports = router;
