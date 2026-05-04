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

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// New hello route
app.post("/hello", (req, res) => {
  res.json({ msg: "Hello world" });
});

// Debug test route
app.post("/test", (req, res) => {
  console.log("Test endpoint hit");
  console.log("Body:", req.body);
  res.json({ success: true, body: req.body });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/crypto", cryptoRoutes);

// Port
const PORT = 5050;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
