const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  generateKey,
  getKeys,
  deleteKey,
} = require("../controllers/apiKeyController");

//creating api endpoints related to the generateapikeys
router.post("/apikeys", auth, generateKey);
router.get("/apikeys", auth, getKeys);
router.delete("/apikeys/:id", auth, deleteKey);

module.exports = router;
