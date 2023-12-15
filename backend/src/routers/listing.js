const ListingModel = require("../models/Listing");
const UserModel = require("../models/User");
const { auth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

// Create a new listing with associated username
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const userId = req.user.id;

    // Fetch the user's username from MongoDB based on their userId
    const user = await UserModel.findById(userId);
    const username = user.username;

    // Create a new listing with the user's username
    const newListing = new ListingModel({
      title,
      category,
      description,
      price,
      user: userId,
      username,
    });

    await newListing.save();

    res.json(newListing);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get All listings with associated username
router.get("/", async (req, res) => {
  try {
    const listings = await ListingModel.find().populate("user", "username");

    const formattedListings = listings.map((listing) => {
      return {
        _id: listing._id,
        title: listing.title,
        category: listing.category,
        description: listing.description,
        price: listing.price,
        username: listing.username,
        createdAt: listing.createdAt,
        __v: listing.__v,
      };
    });

    // Send the populated listings as a JSON response
    res.json(formattedListings);
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

module.exports = router;
