// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const imageUpload = require("./path/to/imageUpload");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/upload", upload.array("images", 5), imageUpload);

// module.exports = router;
