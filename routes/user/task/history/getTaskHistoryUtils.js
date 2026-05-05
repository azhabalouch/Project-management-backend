const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

async function moveCompletedUserTaskToHistory(userId) {
  const tasksCollectionRef = db.collection('users').doc(userId).collection('tasks');
  const historyCollectionRef = db.collection('users').doc(userId).collection('history');

  try {
    const completedTasksSnapshot = await tasksCollectionRef.where('isCompleted', '==', true).get();

    if (completedTasksSnapshot.empty) {
      console.log('No completed tasks found to move.');
      return;
    }

    let batch = db.batch();
    const movedTasks = [];
    let operationCount = 0;

    completedTasksSnapshot.forEach((docSnap) => {
      const taskId = docSnap.id;
      const data = docSnap.data();

      // Create references for this specific task
      const sourceRef = tasksCollectionRef.doc(taskId);
      const destRef = historyCollectionRef.doc(taskId);

      // Strip undefined values before writing to Firestore
      const cleanedData = {};
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          cleanedData[key] = value;
        }
      }

      // Add the Set and Delete operations to our batch
      batch.set(destRef, cleanedData);
      batch.delete(sourceRef);
      
      // Save the data to return later
      movedTasks.push({ id: taskId, ...data });
      operationCount++;
    });

    await batch.commit();
    console.log(`Successfully moved ${operationCount} tasks to history.`);

    return;
  } catch (error) {
    console.error('Error moving completed tasks:', error);
    throw error;
  }
}

async function getUserTaskHistory(userId) {
  try {
    const userRef = db.collection('users').doc(userId);
    const taskHistoryRef = userRef.collection('history');

    const snapshot = await taskHistoryRef.get();

    const taskHistory = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return taskHistory;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}

module.exports = {
  moveCompletedUserTaskToHistory,
  getUserTaskHistory
};