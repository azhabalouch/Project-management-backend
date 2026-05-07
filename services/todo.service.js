const AppError = require('../utils/AppError');

class TodoService {
  constructor(db) {
    this.db = db; // Injected dependency
  }

  async createTodo(userId, todoData) {
    const todosRef = this.db.collection('users').doc(userId).collection('todos');
    
    const newTodo = {
      ...todoData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await todosRef.add(newTodo);
    return { id: docRef.id, ...newTodo };
  }

  async getTodoById(userId, todoId) {
    const todoRef = this.db.collection('users').doc(userId).collection('todos').doc(todoId);
    
    const todoDoc = await todoRef.get();
    if (!todoDoc.exists) {
      throw new AppError('Todo not found', 404);
    }

    return { id: todoDoc.id, ...todoDoc.data() };
  }

  async getAllTodos(userId) {
    const todosRef = this.db.collection('users').doc(userId).collection('todos');
    
    const snapshot = await todosRef.get();
    const todos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return todos;
  }

  async updateTodo(userId, todoId, updateData) {
    const todoRef = this.db.collection('users').doc(userId).collection('todos').doc(todoId);
    
    const todoDoc = await todoRef.get();
    if (!todoDoc.exists) {
      throw new AppError('Todo not found', 404);
    }

    const updated = { ...updateData, updatedAt: new Date().toISOString() };
    await todoRef.update(updated);
    
    return { id: todoId, ...todoDoc.data(), ...updated };
  }

  async deleteTodo(userId, todoId) {
    const todoRef = this.db.collection('users').doc(userId).collection('todos').doc(todoId);
    
    const todoDoc = await todoRef.get();
    if (!todoDoc.exists) {
      throw new AppError('Todo not found', 404);
    }

    await todoRef.delete();
    return { id: todoId };
  }
}

module.exports = TodoService;
