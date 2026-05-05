const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function createTask(userId, taskData){
  try {
    const userRef = db.collection('users').doc(userId);
    const tasksRef = userRef.collection('tasks');

    const docRef = await tasksRef.add(taskData);

    return docRef.id;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}