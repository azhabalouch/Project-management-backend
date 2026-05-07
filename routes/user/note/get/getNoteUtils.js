const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function getUserNotes(userId, month, year){
  try {
    const userRef = db.collection('users').doc(userId);
    const notesRef = userRef.collection('notes');

    let snapshot;

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

      snapshot = await notesRef
        .where('date', '>=', startDate.toISOString().split('T')[0])
        .where('date', '<=', endDate.toISOString().split('T')[0])
        .get();
    } else {
      snapshot = await notesRef.get();
    }

    const notes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return notes;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
