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

module.exports = async function patchTask(userId, taskId, updateData){
  try {
    const userRef = db.collection('users').doc(userId);
    const tasksRef = userRef.collection('tasks').doc(taskId);

    const cleanedData = stripUndefined(updateData);
    await tasksRef.update(cleanedData);

    return true;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}