const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function getUserProjects(userId){
  try {
    const userRef = db.collection('users').doc(userId);
    const projectsRef = userRef.collection('projects');

    const snapshot = await projectsRef.get();

    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return projects;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
