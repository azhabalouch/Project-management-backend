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

module.exports = async function createProject(userId, projectData){
  try {
    const userRef = db.collection('users').doc(userId);
    const projectsRef = userRef.collection('projects');

    const cleanedData = stripUndefined(projectData);
    const docRef = await projectsRef.add(cleanedData);

    return docRef.id;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
