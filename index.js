const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const imageRoutes = require("./routes/images");
const projectRoutes = require("./routes/projects");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/images", imageRoutes);
app.use("/api/projects", projectRoutes);

// MongoDB connection
const MONGO_URI =
    process.env.MONGO_URI || "mongodb://localhost:27017/art-portfolio";
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
    res.send("Art Portfolio API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});