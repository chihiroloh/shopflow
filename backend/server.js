const express = require("express");
const connectDB = require("./src/db/db");
const authRouter = require("./src/routers/auth");
const listingRouter = require("./src/routers/listing");
const offerRouter = require("./src/routers/offer");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();

connectDB();
app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/listings", listingRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRouter);
app.use("/api", offerRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
