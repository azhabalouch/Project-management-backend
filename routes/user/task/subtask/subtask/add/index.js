const express = require('express');
const verifyToken = require('../../../../../../middleware/auth/validateTokenMiddleware');
const router = express.Router();
const addSubtask = require('./addSubtaskUtils');

router.use(verifyToken);

router.post('/', async (req, res) => {
  const { taskId, subtask } = req.body;
  
  const response = await addSubtask(req.user.uid, taskId, subtask);

  if (response){
    res.status(200).send('Subtask added successfully.');
  } else {
    res.status(404).send('Subtask addition failed.');
  }
})

module.exports = router;
