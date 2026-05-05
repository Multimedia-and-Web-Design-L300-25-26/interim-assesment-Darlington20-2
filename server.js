console.log("SERVER FILE LOADED AT", new Date());

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");

const app = express();

// Validate required environment variables
const requiredEnv = ["JWT_SECRET", "MONGO_URI"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`${key} is not set`);
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/crypto", cryptoRoutes);

// Start server ONLY after DB connects
const startServer = async () => {
  try {
    await connectDB();

    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 5050;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

startServer();

// Global error handling
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});