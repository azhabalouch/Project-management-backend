const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function createTask(taskData){
  try {
    const userRef = db.collection('users').doc(taskData.assigneeId);
    const tasksRef = userRef.collection('tasks');

    await tasksRef.add(taskData);

    return true;
  } catch (error) {
    console.error("Firestore error: ", error);
    return false;
  }
}