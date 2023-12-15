const ListingModel = require("../models/Listing");
const UserModel = require("../models/User");

const createListing = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const userId = req.user.id;

    // Check if the username is available in the request
    if (!req.user.username) {
      return res.status(400).send("User name is required");
    }
    const username = req.user.username;

    // Create a new listing with the user's username
    const newListing = new ListingModel({
      title,
      category,
      description,
      price,
      user: userId,
    });

    await newListing.save();

    res.json(newListing);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { createListing };
