const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function deleteEvent(userId, eventId){
  try {
    const userRef = db.collection('users').doc(userId);
    const eventRef = userRef.collection('events').doc(eventId);

    await eventRef.delete();

    return true;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
