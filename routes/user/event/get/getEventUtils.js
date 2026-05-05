const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function getUserEvents(userId, month, year){
  try {
    const userRef = db.collection('users').doc(userId);
    const eventsRef = userRef.collection('events');

    let snapshot;
    
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      
      snapshot = await eventsRef
        .where('startDate', '>=', startDate.toISOString())
        .where('startDate', '<=', endDate.toISOString())
        .get();
    } else {
      snapshot = await eventsRef.get();
    }

    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return events;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
