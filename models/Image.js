const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    year: Number,
    medium: String,
    dimensions: String,
    category: String,
    description: String,
    tags: [String], // Array of tags
    image_url: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Image", ImageSchema);