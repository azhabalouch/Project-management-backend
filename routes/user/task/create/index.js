const express = require('express');
const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const router = express.Router();
const createTask = require('./createTaskUtils');

router.use(verifyToken);

router.post('/', async (req, res) => {
  const response = await createTask(req.user.uid, {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    isCompleted: req.body.isCompleted,
    projectId: req.body.projectId,
    priority: req.body.priority,
    subtasks: req.body.subtasks || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: req.body.dueDate,
  });

  if (response){
    res.status(200).json({ id: response, message: 'Task created successfully.' });
  } else {
    res.status(404).send('Task creation failed.');
  }
})

module.exports = router;