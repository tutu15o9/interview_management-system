const express = require("express");
const router = express.Router();

const controller = require("../controller/index");

router.use("/api", controller);

module.exports = router;
