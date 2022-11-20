const express = require("express");

// controller fn
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

// login
router.post("/login", loginUser);

// signup
router.post("/signup", signupUser);

module.exports = router;
