const express = require("express");
const UserModel = require("../module/userModel");
const { createUser, logIn } = require("../controller/users/userController");
const router = express.Router();

router.post("/sign-in", createUser);
router.post("/log-in", logIn);

module.exports = router;
