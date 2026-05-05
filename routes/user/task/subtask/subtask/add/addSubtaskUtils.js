const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function addSubtask(userId, taskId, subtask){
  try {
    const userRef = db.collection('users').doc(userId);
    const taskRef = userRef.collection('tasks').doc(taskId);

    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      return false;
    }

    const taskData = taskDoc.data();
    const subtasks = taskData.subtasks || [];
    
    const newSubtask = {
      id: Date.now().toString(),
      text: subtask.text || subtask,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    subtasks.push(newSubtask);

    await taskRef.update({
      subtasks: subtasks,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
