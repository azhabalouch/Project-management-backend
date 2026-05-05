const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const patchTodo = require('./patchTodoUtils');

router.use(verifyToken);

router.patch('/', async (req, res) => {
  const { todoId, ...updateData } = req.body;
  
  const response = await patchTodo(req.user.uid, todoId, {
    ...updateData,
    updatedAt: new Date().toISOString(),
  });

  if (response){
    res.status(200).send('Todo updated successfully.');
  } else {
    res.status(404).send('Todo update failed.');
  }
})

module.exports = router;
