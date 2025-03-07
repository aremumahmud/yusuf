const Image = require("../models/Image");

// Get all images
exports.getAllImages = async(req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching images", error: error.message });
    }
};

// Get single image by ID
exports.getImageById = async(req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json(image);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching image", error: error.message });
    }
};

// Create new image
exports.createImage = async(req, res) => {
    try {
        const newImage = new Image(req.body);
        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (error) {
        res
            .status(400)
            .json({ message: "Error creating image", error: error.message });
    }
};

// Update image
exports.updateImage = async(req, res) => {
    try {
        const updatedImage = await Image.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true, runValidators: true }
        );

        if (!updatedImage) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.status(200).json(updatedImage);
    } catch (error) {
        res
            .status(400)
            .json({ message: "Error updating image", error: error.message });
    }
};

// Delete image
exports.deleteImage = async(req, res) => {
    try {
        const deletedImage = await Image.findByIdAndDelete(req.params.id);

        if (!deletedImage) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error deleting image", error: error.message });
    }
};