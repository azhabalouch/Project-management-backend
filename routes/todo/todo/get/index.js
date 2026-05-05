const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const getUserTodos = require('./getTodoUtils');

router.use(verifyToken);

router.get('/', async (req, res) => {
  const { date } = req.query;
  const response = await getUserTodos(req.user.uid, date);

  if (response){
    res.status(200).send(response);
  } else {
    res.status(404).send({error: 'Retrieving todos failed.'});
  }
})

module.exports = router;
