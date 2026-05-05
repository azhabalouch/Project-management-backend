const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function createProject(userId, projectData){
  try {
    const userRef = db.collection('users').doc(userId);
    const projectsRef = userRef.collection('projects');

    const docRef = await projectsRef.add(projectData);

    return docRef.id;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
