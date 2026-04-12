const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function deleteTask(userId, taskId){
  try {
    const userRef = db.collection('users').doc(userId);
    
    userRef.collection('tasks').doc(taskId).delete();

    return true;
  } catch (error) {
    console.error("Firestore error: ", error);
    return false;
  }
}