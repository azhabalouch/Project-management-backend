const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const validate = require('../middleware/validateMiddleware');
const { createTodoSchema, updateTodoSchema } = require('../schemas/todo.schema');
const verifyToken = require('../middleware/auth/validateTokenMiddleware');

router.use(verifyToken); // Protect all routes

// Clean, standard REST endpoints
router.post('/', validate(createTodoSchema), todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:todoId', todoController.getTodo);
router.patch('/:todoId', validate(updateTodoSchema), todoController.updateTodo);
router.delete('/:todoId', todoController.deleteTodo);

module.exports = router;
