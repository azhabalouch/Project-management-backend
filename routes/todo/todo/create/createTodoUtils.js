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

module.exports = async function createTodo(userId, todoData){
  try {
    const userRef = db.collection('users').doc(userId);
    const todosRef = userRef.collection('todos');

    const cleanedData = stripUndefined(todoData);
    const docRef = await todosRef.add(cleanedData);

    return docRef.id;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
