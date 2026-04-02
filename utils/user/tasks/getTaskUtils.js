const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function getUserTasks(userId){
  try {
    const userRef = db.collection('users').doc(userId);
    const tasksRef = userRef.collection('tasks');

    const tasks = await tasksRef.get();

    return tasks;
  } catch (error) {
    console.error("Firestore error: ", error);
    return false;
  }
}