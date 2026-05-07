const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const { 
  moveCompletedUserTaskToHistory, 
  getUserTaskHistory,
  deleteUserTaskHistory
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

router.delete('/', async (req, res) => {
  const isDeleted = await deleteUserTaskHistory(req.user.uid);

  if (isDeleted) {
    res.status(200).send({ message: 'History deleted successfully.' });
  } else {
    res.status(404).send({ error: 'Could not delete history.' });
  }
})

module.exports = router;