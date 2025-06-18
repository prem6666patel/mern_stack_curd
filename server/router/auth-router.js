const express = require("express");
const router = express.Router();
const auth_controllers = require("../controllers/auth-controllers");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/").get(auth_controllers.home);

router.route("/register").post(auth_controllers.register);

router.route("/login").post(auth_controllers.login);

router.route("/user").get(authMiddleware, auth_controllers.user);

module.exports = router;
