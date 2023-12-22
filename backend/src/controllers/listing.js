const ListingModel = require("../models/Listing");

const createListing = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const userId = req.user.id;

    if (!req.user.username) {
      return res.status(400).send("User name is required");
    }
    const username = req.user.username;

    const newListing = new ListingModel({
      title,
      category,
      description,
      price,
      user: userId,
      username,
    });

    await newListing.save();
    res.json({ listing: newListing, seller: username });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getAllListings = async (req, res) => {
  try {
    const listings = await ListingModel.find().populate("user", "username");

    const formattedListings = listings.map((listing) => ({
      _id: listing._id,
      title: listing.title,
      category: listing.category,
      description: listing.description,
      price: listing.price,
      username: listing.username,
      userId: listing.user,
      createdAt: listing.createdAt,
    }));

    res.json(formattedListings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getSingleListing = async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
const getListingsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const listings = await ListingModel.find({ category: category });

    res.json(listings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const updateListing = async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    if (req.body.title) listing.title = req.body.title;
    if (req.body.description) listing.description = req.body.description;
    if (req.body.price) listing.price = req.body.price;
    if (req.body.category) listing.category = req.body.category;

    await listing.save();
    res.json({ msg: "Listing updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deleteListing = async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    await ListingModel.deleteOne({ _id: req.params.id }); //deletebyid
    res.json({ msg: "Listing deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createListing,
  getAllListings,
  getSingleListing,
  updateListing,
  deleteListing,
  getListingsByCategory,
};
