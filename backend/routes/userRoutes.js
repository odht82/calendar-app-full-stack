const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
} = require("../controllers/userController");

const { verify } = require("../middleware/authMiddleware");

router.post("/signup", registerUser);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.get("/me", verify, getMe);

module.exports = router;
