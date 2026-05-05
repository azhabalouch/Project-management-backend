const express = require('express');
const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const router = express.Router();
const createTodo = require('./createTodoUtils');

router.use(verifyToken);

router.post('/', async (req, res) => {
  const response = await createTodo(req.user.uid, {
    text: req.body.text,
    completed: req.body.completed || false,
    priority: req.body.priority,
    date: req.body.date || new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  if (response){
    res.status(200).json({ id: response, message: 'Todo created successfully.' });
  } else {
    res.status(404).send('Todo creation failed.');
  }
})

module.exports = router;
