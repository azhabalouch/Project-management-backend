const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function deleteNote(userId, noteId){
  try {
    const userRef = db.collection('users').doc(userId);
    const noteRef = userRef.collection('notes').doc(noteId);

    await noteRef.delete();

    return true;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
