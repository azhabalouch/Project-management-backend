const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const getUserTasks = require('./getTaskUtils');

router.use(verifyToken);

router.get('/', async (req, res) => {
  const response = await getUserTasks(req.user.uid);

  if (response){
    res.status(200).send(response);
  } else {
    res.status(404).send({error: 'Retrieving tasks failed.'});
  }
})

module.exports = router;