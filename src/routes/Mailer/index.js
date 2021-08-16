const express = require("express");
const router = express.Router();
const { postEmail } = require("./controller");

router.post("/contactEmail", postEmail)

module.exports = router;
