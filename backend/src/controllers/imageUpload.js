const imageUpload = (req, res) => {
  // Extract the paths of all uploaded files
  const imagePaths = req.files.map((file) => file.path);

  res.json({
    status: "ok",
    msg: "Images uploaded successfully",
    paths: imagePaths,
  });
};
