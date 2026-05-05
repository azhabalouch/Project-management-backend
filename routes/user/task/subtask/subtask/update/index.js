const express = require('express');
const verifyToken = require('../../../../../../middleware/auth/validateTokenMiddleware');
const router = express.Router();
const updateSubtask = require('./updateSubtaskUtils');

router.use(verifyToken);

router.patch('/', async (req, res) => {
  const { taskId, subtaskId, completed } = req.body;
  
  const response = await updateSubtask(req.user.uid, taskId, subtaskId, completed);

  if (response){
    res.status(200).send('Subtask updated successfully.');
  } else {
    res.status(404).send('Subtask update failed.');
  }
})

module.exports = router;
