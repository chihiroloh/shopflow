const ListingModel = require("../models/Listing");

const createListing = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const userId = req.user.id; // Ensure that this is the correct path to the user ID

    // Validate the category
    if (!["Electronics", "Fashion"].includes(category)) {
      return res.status(400).json({
        msg: "Invalid category. Allowed categories are 'electronics' and 'fashion'.",
      });
    }

    if (!userId) {
      return res.status(400).json({ msg: "User ID is missing" });
    }

    // Get the array of uploaded image filenames
    const images = req.files.map((file) => file.filename);

    const newListing = new ListingModel({
      title,
      category,
      description,
      price,
      user: userId,
      images, // Store the image filenames in the Listing model
    });

    await newListing.save();
    res.json(newListing);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { createListing };
