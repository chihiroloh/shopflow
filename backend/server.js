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

// mongoose.connect("mongodb://127.0.0.1:27017/Carousell");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/Images");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// app.post("/upload", upload.single("file"), (req, res) => {
//   console.log(req.file);
// });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
