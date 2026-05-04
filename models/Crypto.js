const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide cryptocurrency name"],
    },
    symbol: {
      type: String,
      required: [true, "Please provide symbol"],
      uppercase: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
    image: {
      type: String,
      required: [true, "Please provide image URL"],
    },
    change24h: {
      type: Number,
      required: [true, "Please provide 24h change percentage"],
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crypto", cryptoSchema);
