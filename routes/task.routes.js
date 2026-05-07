const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const validate = require('../middleware/validateMiddleware');
const { createTaskSchema, updateTaskSchema } = require('../schemas/task.schema');
const verifyToken = require('../middleware/auth/validateTokenMiddleware');

router.use(verifyToken); // Protect all routes

// Clean, standard REST endpoints
router.post('/', validate(createTaskSchema), taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/history', taskController.getTaskHistory);
router.get('/:taskId', taskController.getTask);
router.patch('/:taskId', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

// Subtasks belong inside the task route parameter
router.post('/:taskId/subtasks', taskController.addSubtask);
router.patch('/:taskId/subtasks/:subtaskId', taskController.updateSubtask);
router.delete('/:taskId/subtasks/:subtaskId', taskController.deleteSubtask);

module.exports = router;
