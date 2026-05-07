const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const validate = require('../middleware/validateMiddleware');
const { createProjectSchema, updateProjectSchema } = require('../schemas/project.schema');
const verifyToken = require('../middleware/auth/validateTokenMiddleware');

router.use(verifyToken); // Protect all routes

// Clean, standard REST endpoints
router.post('/', validate(createProjectSchema), projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:projectId', projectController.getProject);
router.patch('/:projectId', validate(updateProjectSchema), projectController.updateProject);
router.delete('/:projectId', projectController.deleteProject);

module.exports = router;
