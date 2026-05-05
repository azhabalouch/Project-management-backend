const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const deleteTodo = require('./deleteTodoUtils');

router.use(verifyToken);

router.delete('/', async (req, res) => {
  const { todoId } = req.body;
  
  const response = await deleteTodo(req.user.uid, todoId);

  if (response){
    res.status(200).send('Todo deleted successfully.');
  } else {
    res.status(404).send('Todo deletion failed.');
  }
})

module.exports = router;
