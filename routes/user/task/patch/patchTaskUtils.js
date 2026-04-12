const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function patchTask(taskId, data){
  try {
    const userRef = db.collection('users').doc(data.user.uid);
    const tasksRef = userRef.collection('tasks').doc(taskId);

    await tasksRef.update(data.body);

    return true;
  } catch (error) {
    console.error("Firestore error: ", error);
    return false;
  }
}