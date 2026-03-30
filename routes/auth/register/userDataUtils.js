const { getFirestore } = require('firebase-admin/firestore')

const db = getFirestore();

module.exports = async function createUserData(userid, userData){
  try {
    const userRef = db.collection('users').doc(userid);

    const profileRef = userRef.collection('profile').doc('details');

    await profileRef.set({
      name: {
        firstName: userData.firstName,
        lastName: userData.lastName
      },
      email: userData.email,
      userId: userid
    });

    return true;
  } catch (error) {
    console.error("Firestore Error:", error);
    return false;
  }
}