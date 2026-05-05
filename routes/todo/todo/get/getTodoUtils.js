const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

module.exports = async function getUserTodos(userId, date){
  try {
    const userRef = db.collection('users').doc(userId);
    const todosRef = userRef.collection('todos');

    let snapshot;
    
    if (date) {
      snapshot = await todosRef.where('date', '==', date).get();
    } else {
      snapshot = await todosRef.get();
    }

    const todos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return todos;
  } catch (error) {
    console.error('Firestore error: ', error);
    return false;
  }
}
