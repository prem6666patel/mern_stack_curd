const express = require("express");
const router = express.Router();
const getAllservice = require("../controllers/service-controllers");

router.route("/service").get(getAllservice);

module.exports = router;
