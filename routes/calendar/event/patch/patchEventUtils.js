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

module.exports = async function patchEvent(userId, eventId, updateData){
  try {
    const userRef = db.collection('users').doc(userId);
    const eventRef = userRef.collection('events').doc(eventId);

    const cleanedData = stripUndefined(updateData);
    await eventRef.update(cleanedData);

    return true;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
