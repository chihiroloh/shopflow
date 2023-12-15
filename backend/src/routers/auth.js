const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { getUserInfo, updateUser, deleteUser } = require("../controllers/auth");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/users", authController.getAllUsers);
router.get("/userinfo", getUserInfo);
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);

module.exports = router;
