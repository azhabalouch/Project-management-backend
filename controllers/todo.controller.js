const TodoService = require('../services/todo.service');
const { getFirestore } = require('firebase-admin/firestore');

// Instantiate service with the DB
const todoService = new TodoService(getFirestore());

// Create a new todo
exports.createTodo = async (req, res, next) => {
  try {
    const todo = await todoService.createTodo(req.user.uid, req.body);
    res.status(201).json({ status: 'success', data: { todo } });
  } catch (error) {
    next(error);
  }
};

// Get all todos for the user
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getAllTodos(req.user.uid);
    res.status(200).json({ status: 'success', data: { todos } });
  } catch (error) {
    next(error);
  }
};

// Get a single todo by ID
exports.getTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await todoService.getTodoById(req.user.uid, todoId);
    res.status(200).json({ status: 'success', data: { todo } });
  } catch (error) {
    next(error);
  }
};

// Update a todo
exports.updateTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await todoService.updateTodo(req.user.uid, todoId, req.body);
    res.status(200).json({ status: 'success', data: { todo } });
  } catch (error) {
    next(error);
  }
};

// Delete a todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const result = await todoService.deleteTodo(req.user.uid, todoId);
    res.status(200).json({ status: 'success', message: 'Todo deleted successfully', data: result });
  } catch (error) {
    next(error);
  }
};
