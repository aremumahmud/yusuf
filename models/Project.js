const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    title_description: { type: String, required: true },
    tags: [String], // Array of tags
    cover_image: { type: String, required: true },
    image_urls: [String], // Array of URLs
    video_url: String,
    techniques: [String], // Array of techniques
    software_used: [String], // Array of software
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);