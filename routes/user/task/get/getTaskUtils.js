const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function getUserTasks(userId){
  try {
    const userRef = db.collection('users').doc(userId);
    const taskRef = userRef.collection('tasks');

    const snapshot = await taskRef.get();

    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return tasks;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}