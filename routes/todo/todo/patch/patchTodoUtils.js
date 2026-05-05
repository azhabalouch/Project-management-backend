const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function patchTodo(userId, todoId, updateData){
  try {
    const userRef = db.collection('users').doc(userId);
    const todoRef = userRef.collection('todos').doc(todoId);

    await todoRef.update(updateData);

    return true;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
