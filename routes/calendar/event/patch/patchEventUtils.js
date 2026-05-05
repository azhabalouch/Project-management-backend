const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function patchEvent(userId, eventId, updateData){
  try {
    const userRef = db.collection('users').doc(userId);
    const eventRef = userRef.collection('events').doc(eventId);

    await eventRef.update(updateData);

    return true;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
