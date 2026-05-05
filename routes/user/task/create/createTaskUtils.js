const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

function stripUndefined(obj) {
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

module.exports = async function createTask(userId, taskData){
  try {
    const userRef = db.collection('users').doc(userId);
    const tasksRef = userRef.collection('tasks');

    const cleanedData = stripUndefined(taskData);
    const docRef = await tasksRef.add(cleanedData);

    return docRef.id;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}