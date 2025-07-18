const express = require("express");
const router = express.Router();
const apiKeyAuth = require("../middleware/apiKeyMiddleware");
const { getCountry } = require("../controllers/countryController");

//creating api endpoints related to the countryinfo
router.get("/country", apiKeyAuth, getCountry);

module.exports = router;
