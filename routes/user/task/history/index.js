const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const { 
  moveCompletedUserTaskToHistory, 
  getUserTaskHistory 
} = require('./getTaskHistoryUtils');

router.use(verifyToken);

router.get('/', async (req, res) => {
  await moveCompletedUserTaskToHistory(req.user.uid);
  const taskHistory = await getUserTaskHistory(req.user.uid);

  if (taskHistory){
    res.status(200).send({ tasks: taskHistory });
  } else {
    res.status(404).send({error: 'Retrieving tasks failed.'});
  }
})

module.exports = router;