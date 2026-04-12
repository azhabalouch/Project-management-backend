const { getFirestore } = require('firebase-admin/firestore')

const db = getFirestore();

module.exports = async function getUserData(userId){
  try {
    const userRef = db.collection('users').doc(userId);
    const profileRef = userRef.collection('profile').doc('details');

    const userDetails = await profileRef.get();
    
    const { firstName, lastName } = userDetails.data();

    return { firstName, lastName };
  } catch (error) {
    console.error('Firestore Error:', error);
    return null;
  }
}