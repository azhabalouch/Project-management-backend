const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

function stripUndefined(obj) {
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

module.exports = async function createEvent(userId, eventData){
  try {
    const userRef = db.collection('users').doc(userId);
    const eventsRef = userRef.collection('events');

    const cleanedData = stripUndefined(eventData);
    const docRef = await eventsRef.add(cleanedData);

    return docRef.id;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
