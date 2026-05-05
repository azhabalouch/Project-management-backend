const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function createEvent(userId, eventData){
  try {
    const userRef = db.collection('users').doc(userId);
    const eventsRef = userRef.collection('events');

    const docRef = await eventsRef.add(eventData);

    return docRef.id;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
