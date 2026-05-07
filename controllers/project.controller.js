const ProjectService = require('../services/project.service');
const { getFirestore } = require('firebase-admin/firestore');

// Instantiate service with the DB
const projectService = new ProjectService(getFirestore());

// Create a new project
exports.createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.user.uid, req.body);
    res.status(201).json({ status: 'success', data: { project } });
  } catch (error) {
    next(error); // Passes to global error handler
  }
};

// Get all projects for the user
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects(req.user.uid);
    res.status(200).json({ status: 'success', data: { projects } });
  } catch (error) {
    next(error);
  }
};

// Get a single project by ID
exports.getProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await projectService.getProjectById(req.user.uid, projectId);
    res.status(200).json({ status: 'success', data: { project } });
  } catch (error) {
    next(error);
  }
};

// Update a project
exports.updateProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await projectService.updateProject(req.user.uid, projectId, req.body);
    res.status(200).json({ status: 'success', data: { project } });
  } catch (error) {
    next(error);
  }
};

// Delete a project
exports.deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const result = await projectService.deleteProject(req.user.uid, projectId);
    res.status(200).json({ status: 'success', message: 'Project deleted successfully', data: result });
  } catch (error) {
    next(error);
  }
};
