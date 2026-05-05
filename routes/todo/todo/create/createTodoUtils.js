const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function createTodo(userId, todoData){
  try {
    const userRef = db.collection('users').doc(userId);
    const todosRef = userRef.collection('todos');

    const docRef = await todosRef.add(todoData);

    return docRef.id;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
