const mongoose = require("mongoose");
const { request } = require("./setup");
const Project = require("../models/Project");

describe("Project API Endpoints", () => {
    // Sample project data for testing
    const sampleProject = {
        title: "Test Project",
        title_description: "A test project for API testing",
        tags: ["test", "api", "portfolio"],
        cover_image: "https://example.com/test-cover.jpg",
        image_urls: [
            "https://example.com/test-image1.jpg",
            "https://example.com/test-image2.jpg",
        ],
        video_url: "https://example.com/test-video.mp4",
        techniques: ["digital", "photography"],
        software_used: ["Photoshop", "Lightroom"],
        description: "This is a test project for API endpoint testing",
    };

    // GET all projects - empty response
    describe("GET /api/projects", () => {
        it("should return an empty array when no projects exist", async() => {
            const res = await request.get("/api/projects");

            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(0);
        });
    });

    // POST create new project
    describe("POST /api/projects", () => {
        it("should create a new project", async() => {
            const res = await request.post("/api/projects").send(sampleProject);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("_id");
            expect(res.body.title).toBe(sampleProject.title);
            expect(res.body.title_description).toBe(sampleProject.title_description);
            expect(res.body.tags).toEqual(expect.arrayContaining(sampleProject.tags));
            expect(res.body.image_urls).toEqual(
                expect.arrayContaining(sampleProject.image_urls)
            );
            expect(res.body).toHaveProperty("createdAt");
            expect(res.body).toHaveProperty("updatedAt");
        });

        it("should return 400 if required fields are missing", async() => {
            const incompleteProject = {
                title: "Incomplete Project",
                // Missing required fields
            };

            const res = await request.post("/api/projects").send(incompleteProject);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toContain("Error creating project");
        });
    });

    // GET all projects (with data)
    describe("GET /api/projects (with data)", () => {
        beforeEach(async() => {
            // Create a few test projects
            await Project.create(sampleProject);
            await Project.create({
                ...sampleProject,
                title: "Second Test Project",
                title_description: "Another test project",
            });
        });

        it("should retrieve all projects", async() => {
            const res = await request.get("/api/projects");

            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(2);
            expect(res.body[0]).toHaveProperty("_id");
            expect(res.body[0]).toHaveProperty("title");
            expect(res.body[0]).toHaveProperty("description");
        });
    });

    // GET single project by ID
    describe("GET /api/projects/:id", () => {
        let createdProject;

        beforeEach(async() => {
            // Create a test project
            createdProject = await Project.create(sampleProject);
        });

        it("should retrieve a single project by ID", async() => {
            const res = await request.get(`/api/projects/${createdProject._id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("_id");
            expect(res.body._id).toBe(createdProject._id.toString());
            expect(res.body.title).toBe(sampleProject.title);
            expect(res.body.title_description).toBe(sampleProject.title_description);
            expect(res.body.cover_image).toBe(sampleProject.cover_image);
        });

        it("should return 404 for non-existent project ID", async() => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const res = await request.get(`/api/projects/${nonExistentId}`);

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Project not found");
        });

        it("should return 500 for invalid object ID format", async() => {
            const res = await request.get("/api/projects/invalid-id-format");

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty("message");
        });
    });

    // PUT update project
    describe("PUT /api/projects/:id", () => {
        let createdProject;

        beforeEach(async() => {
            // Create a test project
            createdProject = await Project.create(sampleProject);
        });

        it("should update an existing project", async() => {
            const updateData = {
                title: "Updated Project Title",
                title_description: "Updated project description",
                image_urls: [
                    "https://example.com/updated-image1.jpg",
                    "https://example.com/updated-image2.jpg",
                    "https://example.com/updated-image3.jpg",
                ],
            };

            const res = await request
                .put(`/api/projects/${createdProject._id}`)
                .send(updateData);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("_id");
            expect(res.body.title).toBe(updateData.title);
            expect(res.body.title_description).toBe(updateData.title_description);
            expect(res.body.image_urls).toEqual(
                expect.arrayContaining(updateData.image_urls)
            );
            expect(res.body.image_urls.length).toBe(updateData.image_urls.length);

            // Original fields should remain unchanged
            expect(res.body.cover_image).toBe(sampleProject.cover_image);
            expect(res.body.description).toBe(sampleProject.description);
        });

        it("should return 404 for updating non-existent project", async() => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const updateData = { title: "New Title" };

            const res = await request
                .put(`/api/projects/${nonExistentId}`)
                .send(updateData);

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Project not found");
        });

        it("should return 400 if update violates validation", async() => {
            const invalidUpdate = {
                title_description: "", // Empty string violates required field
            };

            const res = await request
                .put(`/api/projects/${createdProject._id}`)
                .send(invalidUpdate);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message");
        });
    });

    // DELETE project
    describe("DELETE /api/projects/:id", () => {
        let createdProject;

        beforeEach(async() => {
            // Create a test project
            createdProject = await Project.create(sampleProject);
        });

        it("should delete an existing project", async() => {
            const res = await request.delete(`/api/projects/${createdProject._id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Project deleted successfully");

            // Verify the project was actually deleted
            const findResult = await Project.findById(createdProject._id);
            expect(findResult).toBeNull();
        });

        it("should return 404 for deleting non-existent project", async() => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const res = await request.delete(`/api/projects/${nonExistentId}`);

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Project not found");
        });
    });
});