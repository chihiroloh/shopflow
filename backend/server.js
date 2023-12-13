const express = require("express");
const connectDB = require("./src/db/db");
const authRouter = require("./src/routers/auth");
const listingRouter = require("./src/routers/listing");

require("dotenv").config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/listings", listingRouter);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
