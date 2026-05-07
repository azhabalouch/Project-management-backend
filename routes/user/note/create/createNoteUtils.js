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

module.exports = async function createNote(userId, noteData){
  try {
    const userRef = db.collection('users').doc(userId);
    const notesRef = userRef.collection('notes');

    const cleanedData = stripUndefined(noteData);
    const docRef = await notesRef.add(cleanedData);

    return docRef.id;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
