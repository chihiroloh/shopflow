const multer = require("multer");

const imageUpload = (req, res) => {
  const imagePaths = req.files.map((file) => file.path);

  res.json({
    status: "ok",
    msg: "Images uploaded successfully",
    paths: imagePaths,
  });
};

module.exports = imageUpload;
