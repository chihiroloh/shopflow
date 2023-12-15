const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/api/listings", upload.array("images", 5), createListing); // if multiple images
