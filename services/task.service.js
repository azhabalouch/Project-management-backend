const AppError = require('../utils/AppError');

class TaskService {
  constructor(db) {
    this.db = db; // Injected dependency
  }

  async createTask(userId, taskData) {
    const tasksRef = this.db.collection('users').doc(userId).collection('tasks');
    
    const newTask = {
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await tasksRef.add(newTask);
    return { id: docRef.id, ...newTask };
  }

  async getTaskById(userId, taskId) {
    const taskRef = this.db.collection('users').doc(userId).collection('tasks').doc(taskId);
    
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      throw new AppError('Task not found', 404);
    }

    return { id: taskDoc.id, ...taskDoc.data() };
  }

  async getAllTasks(userId) {
    const tasksRef = this.db.collection('users').doc(userId).collection('tasks');
    
    const snapshot = await tasksRef.get();
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return tasks;
  }

  async updateTask(userId, taskId, updateData) {
    const taskRef = this.db.collection('users').doc(userId).collection('tasks').doc(taskId);
    
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      throw new AppError('Task not found', 404);
    }

    const updated = { ...updateData, updatedAt: new Date().toISOString() };
    await taskRef.update(updated);
    
    return { id: taskId, ...taskDoc.data(), ...updated };
  }

  async deleteTask(userId, taskId) {
    const taskRef = this.db.collection('users').doc(userId).collection('tasks').doc(taskId);
    
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      throw new AppError('Task not found', 404);
    }

    await taskRef.delete();
    return { id: taskId };
  }

  async addSubtask(userId, taskId, subtaskData) {
    const taskRef = this.db.collection('users').doc(userId).collection('tasks').doc(taskId);
    
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      throw new AppError('Task not found', 404);
    }

    const subtasksRef = taskRef.collection('subtasks');
    const subtaskId = this.db.collection('_').doc().id; // Generate ID
    
    const newSubtask = {
      ...subtaskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await subtasksRef.doc(subtaskId).set(newSubtask);
    return { id: subtaskId, ...newSubtask };
  }

  async deleteSubtask(userId, taskId, subtaskId) {
    const subtaskRef = this.db
      .collection('users').doc(userId)
      .collection('tasks').doc(taskId)
      .collection('subtasks').doc(subtaskId);
    
    const subtaskDoc = await subtaskRef.get();
    if (!subtaskDoc.exists) {
      throw new AppError('Subtask not found', 404);
    }

    await subtaskRef.delete();
    return { id: subtaskId };
  }

  async updateSubtask(userId, taskId, subtaskId, updateData) {
    const subtaskRef = this.db
      .collection('users').doc(userId)
      .collection('tasks').doc(taskId)
      .collection('subtasks').doc(subtaskId);
    
    const subtaskDoc = await subtaskRef.get();
    if (!subtaskDoc.exists) {
      throw new AppError('Subtask not found', 404);
    }

    const updated = { ...updateData, updatedAt: new Date().toISOString() };
    await subtaskRef.update(updated);
    return { id: subtaskId, ...subtaskDoc.data(), ...updated };
  }

  async getTaskHistory(userId) {
    const historyRef = this.db.collection('users').doc(userId).collection('history');
    
    const snapshot = await historyRef.get();
    const history = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return history;
  }
}

module.exports = TaskService;
