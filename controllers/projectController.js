const Project = require("../models/Project");

// Get all projects
exports.getAllProjects = async(req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching projects", error: error.message });
    }
};

// Get single project by ID
exports.getProjectById = async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching project", error: error.message });
    }
};

// Create new project
exports.createProject = async(req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res
            .status(400)
            .json({ message: "Error creating project", error: error.message });
    }
};

// Update project
exports.updateProject = async(req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        res
            .status(400)
            .json({ message: "Error updating project", error: error.message });
    }
};

// Delete project
exports.deleteProject = async(req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);

        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error deleting project", error: error.message });
    }
};