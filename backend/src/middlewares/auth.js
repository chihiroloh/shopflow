const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  if (!token) {
    return res.status(403).json({ status: "error", msg: "missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    // Ensure the decoded token structure matches what you're expecting
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ status: "error", msg: "unauthorized" });
  }
};
const authAdmin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (decoded.user && decoded.user.role === "admin") {
        req.user = decoded.user;
        next();
      } else {
        throw new Error("Not an admin");
      }
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ status: "error", msg: "unauthorized" });
    }
  } else {
    return res.status(403).json({ status: "error", msg: "missing token" });
  }
};
module.exports = { auth, authAdmin };
