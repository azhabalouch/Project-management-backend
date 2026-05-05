const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function deleteProject(userId, projectId){
  try {
    const userRef = db.collection('users').doc(userId);
    const projectRef = userRef.collection('projects').doc(projectId);

    await projectRef.delete();

    return true;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
