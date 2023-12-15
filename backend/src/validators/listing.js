const { body, param, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const createListingValidator = [
  body("title").trim().isLength({ min: 1 }).withMessage("Title is required."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description is required."),
  body("price").isNumeric().withMessage("Price must be a number."),
  body("category")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category is required."),
];

const listingIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid listing ID."),
];

const offerValidator = [
  body("price").isNumeric().withMessage("Price must be a number."),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createListingValidator,
  listingIdValidator,
  offerValidator,
  validate,
};
