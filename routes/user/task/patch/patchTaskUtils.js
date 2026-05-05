const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function patchTask(userId, taskId, updateData){
  try {
    const userRef = db.collection('users').doc(userId);
    const tasksRef = userRef.collection('tasks').doc(taskId);

    await tasksRef.update(updateData);

    return true;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}