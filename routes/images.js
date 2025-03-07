const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

// GET all images
router.get("/", imageController.getAllImages);

// GET single image by ID
router.get("/:id", imageController.getImageById);

// POST new image
router.post("/", imageController.createImage);

// PUT update image
router.put("/:id", imageController.updateImage);

// DELETE image
router.delete("/:id", imageController.deleteImage);

module.exports = router;