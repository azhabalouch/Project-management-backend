const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function deleteSubtask(userId, taskId, subtaskId){
  try {
    const userRef = db.collection('users').doc(userId);
    const taskRef = userRef.collection('tasks').doc(taskId);

    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      return false;
    }

    const taskData = taskDoc.data();
    const subtasks = taskData.subtasks || [];
    
    const updatedSubtasks = subtasks.filter(subtask => subtask.id !== subtaskId);

    await taskRef.update({
      subtasks: updatedSubtasks,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
