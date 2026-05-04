const express = require("express");
const {
  getAllCrypto,
  getGainers,
  getNewListings,
  addCrypto,
  updateCrypto,
  deleteCrypto,
} = require("../controllers/cryptoController");

const router = express.Router();

// Get all cryptocurrencies
router.get("/", getAllCrypto);

// Get top gainers
router.get("/gainers", getGainers);

// Get new listings
router.get("/new", getNewListings);

// Add new cryptocurrency
router.post("/", addCrypto);

// Update cryptocurrency
router.put("/:id", updateCrypto);

// Delete cryptocurrency
router.delete("/:id", deleteCrypto);

module.exports = router;
