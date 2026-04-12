const { getFirestore } = require('firebase-admin/firestore')

const db = getFirestore();

module.exports = async function createUserData(userId, userData){
  try {
    const userRef = db.collection('users').doc(userId);

    const profileRef = userRef.collection('profile').doc('details');

    await profileRef.set({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      userId: userId
    });

    return true;
  } catch (error) {
    console.error('Firestore Error:', error);
    return false;
  }
}