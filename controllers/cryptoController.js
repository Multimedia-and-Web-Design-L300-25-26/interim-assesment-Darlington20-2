const Crypto = require("../models/Crypto");

// Get all cryptocurrencies
exports.getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: cryptos.length,
      data: cryptos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get top gainers (highest 24h change)
exports.getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find().sort({ change24h: -1 }).limit(10);
    
    res.json({
      success: true,
      count: gainers.length,
      data: gainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get new listings (most recently added)
exports.getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    
    res.json({
      success: true,
      count: newListings.length,
      data: newListings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add new cryptocurrency
exports.addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    // Validate input
    if (!name || !symbol || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, symbol, price, and image",
      });
    }

    // Create new crypto
    const crypto = await Crypto.create({
      name,
      symbol,
      price,
      image,
      change24h: change24h || 0,
    });

    res.status(201).json({
      success: true,
      message: "Cryptocurrency added successfully",
      data: crypto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update cryptocurrency
exports.updateCrypto = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, symbol, price, image, change24h } = req.body;

    const crypto = await Crypto.findByIdAndUpdate(
      id,
      { name, symbol, price, image, change24h },
      { new: true, runValidators: true }
    );

    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: "Cryptocurrency not found",
      });
    }

    res.json({
      success: true,
      message: "Cryptocurrency updated successfully",
      data: crypto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete cryptocurrency
exports.deleteCrypto = async (req, res) => {
  try {
    const { id } = req.params;

    const crypto = await Crypto.findByIdAndDelete(id);

    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: "Cryptocurrency not found",
      });
    }

    res.json({
      success: true,
      message: "Cryptocurrency deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
