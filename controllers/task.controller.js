const TaskService = require('../services/task.service');
const { getFirestore } = require('firebase-admin/firestore');

// Instantiate service with the DB
const taskService = new TaskService(getFirestore());

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user.uid, req.body);
    res.status(201).json({ status: 'success', data: { task } });
  } catch (error) {
    next(error); // Passes to global error handler
  }
};

// Get all tasks for the user
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks(req.user.uid);
    res.status(200).json({ status: 'success', data: { tasks } });
  } catch (error) {
    next(error);
  }
};

// Get a single task by ID
exports.getTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await taskService.getTaskById(req.user.uid, taskId);
    res.status(200).json({ status: 'success', data: { task } });
  } catch (error) {
    next(error);
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params; // Sourced from URL, not body
    const task = await taskService.updateTask(req.user.uid, taskId, req.body);
    res.status(200).json({ status: 'success', data: { task } });
  } catch (error) {
    next(error);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const result = await taskService.deleteTask(req.user.uid, taskId);
    res.status(200).json({ status: 'success', message: 'Task deleted successfully', data: result });
  } catch (error) {
    next(error);
  }
};

// Add a subtask
exports.addSubtask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const subtask = await taskService.addSubtask(req.user.uid, taskId, req.body);
    res.status(201).json({ status: 'success', data: { subtask } });
  } catch (error) {
    next(error);
  }
};

// Delete a subtask
exports.deleteSubtask = async (req, res, next) => {
  try {
    const { taskId, subtaskId } = req.params;
    const result = await taskService.deleteSubtask(req.user.uid, taskId, subtaskId);
    res.status(200).json({ status: 'success', message: 'Subtask deleted successfully', data: result });
  } catch (error) {
    next(error);
  }
};

// Update a subtask
exports.updateSubtask = async (req, res, next) => {
  try {
    const { taskId, subtaskId } = req.params;
    const subtask = await taskService.updateSubtask(req.user.uid, taskId, subtaskId, req.body);
    res.status(200).json({ status: 'success', data: { subtask } });
  } catch (error) {
    next(error);
  }
};

// Get task history (completed tasks)
exports.getTaskHistory = async (req, res, next) => {
  try {
    const history = await taskService.getTaskHistory(req.user.uid);
    res.status(200).json({ status: 'success', data: { history } });
  } catch (error) {
    next(error);
  }
};
