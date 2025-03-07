const mongoose = require("mongoose");
const { request } = require("./setup");
const Image = require("../models/Image");

describe("Image API Endpoints", () => {
    // Sample image data for testing
    const sampleImage = {
        title: "Test Image",
        artist: "Test Artist",
        year: 2023,
        medium: "Digital",
        dimensions: "1000x800 px",
        category: "Test Category",
        description: "This is a test image description",
        tags: ["test", "sample", "api"],
        image_url: "https://example.com/test-image.jpg",
    };

    // GET all images - empty response
    describe("GET /api/images", () => {
        it("should return an empty array when no images exist", async() => {
            const res = await request.get("/api/images");

            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(0);
        });
    });

    // POST create new image
    describe("POST /api/images", () => {
        it("should create a new image", async() => {
            const res = await request.post("/api/images").send(sampleImage);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("_id");
            expect(res.body.title).toBe(sampleImage.title);
            expect(res.body.artist).toBe(sampleImage.artist);
            expect(res.body.tags).toEqual(expect.arrayContaining(sampleImage.tags));
            expect(res.body).toHaveProperty("createdAt");
            expect(res.body).toHaveProperty("updatedAt");
        });

        it("should return 400 if required fields are missing", async() => {
            const incompleteImage = {
                title: "Incomplete Image",
                // Missing required artist and image_url
            };

            const res = await request.post("/api/images").send(incompleteImage);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Error creating image");
        });
    });

    // GET all images (with data)
    describe("GET /api/images (with data)", () => {
        beforeEach(async() => {
            // Create a few test images
            await Image.create(sampleImage);
            await Image.create({
                ...sampleImage,
                title: "Second Test Image",
                artist: "Second Artist",
            });
        });

        it("should retrieve all images", async() => {
            const res = await request.get("/api/images");

            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(2);
            expect(res.body[0]).toHaveProperty("_id");
            expect(res.body[0]).toHaveProperty("title");
            expect(res.body[0]).toHaveProperty("artist");
        });
    });

    // GET single image by ID
    describe("GET /api/images/:id", () => {
        let createdImage;

        beforeEach(async() => {
            // Create a test image
            createdImage = await Image.create(sampleImage);
        });

        it("should retrieve a single image by ID", async() => {
            const res = await request.get(`/api/images/${createdImage._id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("_id");
            expect(res.body._id).toBe(createdImage._id.toString());
            expect(res.body.title).toBe(sampleImage.title);
            expect(res.body.artist).toBe(sampleImage.artist);
        });

        it("should return 404 for non-existent image ID", async() => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const res = await request.get(`/api/images/${nonExistentId}`);

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Image not found");
        });

        it("should return 500 for invalid object ID format", async() => {
            const res = await request.get("/api/images/invalid-id-format");

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty("message");
        });
    });

    // PUT update image
    describe("PUT /api/images/:id", () => {
        let createdImage;

        beforeEach(async() => {
            // Create a test image
            createdImage = await Image.create(sampleImage);
        });

        it("should update an existing image", async() => {
            const updateData = {
                title: "Updated Title",
                year: 2022,
                tags: ["updated", "test"],
            };

            const res = await request
                .put(`/api/images/${createdImage._id}`)
                .send(updateData);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("_id");
            expect(res.body.title).toBe(updateData.title);
            expect(res.body.year).toBe(updateData.year);
            expect(res.body.tags).toEqual(expect.arrayContaining(updateData.tags));
            // Original fields should remain unchanged
            expect(res.body.artist).toBe(sampleImage.artist);
            expect(res.body.image_url).toBe(sampleImage.image_url);
        });

        it("should return 404 for updating non-existent image", async() => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const updateData = { title: "New Title" };

            const res = await request
                .put(`/api/images/${nonExistentId}`)
                .send(updateData);

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Image not found");
        });

        it("should return 400 if update violates validation", async() => {
            const invalidUpdate = {
                artist: "", // Empty string violates required field
            };

            const res = await request
                .put(`/api/images/${createdImage._id}`)
                .send(invalidUpdate);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });

    // DELETE image
    describe("DELETE /api/images/:id", () => {
        let createdImage;

        beforeEach(async() => {
            // Create a test image
            createdImage = await Image.create(sampleImage);
        });

        it("should delete an existing image", async() => {
            const res = await request.delete(`/api/images/${createdImage._id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Image deleted successfully");

            // Verify the image was actually deleted
            const findResult = await Image.findById(createdImage._id);
            expect(findResult).toBeNull();
        });

        it("should return 404 for deleting non-existent image", async() => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const res = await request.delete(`/api/images/${nonExistentId}`);

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Image not found");
        });
    });
});