const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

function stripUndefined(obj) {
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

module.exports = async function patchTodo(userId, todoId, updateData){
  try {
    const userRef = db.collection('users').doc(userId);
    const todoRef = userRef.collection('todos').doc(todoId);

    const cleanedData = stripUndefined(updateData);
    await todoRef.update(cleanedData);

    return true;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
