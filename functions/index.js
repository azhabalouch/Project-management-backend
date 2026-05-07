const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// This background worker listens for any updates to any task document
exports.archiveCompletedTasks = functions.firestore
  .document('users/{userId}/tasks/{taskId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    // Check if the task just transitioned to 'completed'
    if (newValue.isCompleted === true && previousValue.isCompleted !== true) {
      const { userId, taskId } = context.params;
      
      const historyRef = db.collection('users').doc(userId).collection('history').doc(taskId);
      
      // Move to history
      await historyRef.set({
        ...newValue,
        archivedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Delete from active tasks
      await change.after.ref.delete();
      
      console.log(`Task ${taskId} moved to history for user ${userId}`);
    }
  });
