const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MongoDB connection skipped: MONGO_URI is not configured.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message || error);
    console.error("The app will continue running, but database access may be unavailable.");
  }
};

module.exports = connectDB;
