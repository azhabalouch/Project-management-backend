const express = require('express');
const verifyToken = require('../../../../../../middleware/auth/validateTokenMiddleware');
const router = express.Router();
const deleteSubtask = require('./deleteSubtaskUtils');

router.use(verifyToken);

router.delete('/', async (req, res) => {
  const { taskId, subtaskId } = req.body;
  
  const response = await deleteSubtask(req.user.uid, taskId, subtaskId);

  if (response){
    res.status(200).send('Subtask deleted successfully.');
  } else {
    res.status(404).send('Subtask deletion failed.');
  }
})

module.exports = router;
