const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const getUserEvents = require('./getEventUtils');

router.use(verifyToken);

router.get('/', async (req, res) => {
  const { month, year } = req.query;
  const response = await getUserEvents(req.user.uid, month, year);

  if (response){
    res.status(200).send(response);
  } else {
    res.status(404).send({error: 'Retrieving events failed.'});
  }
})

module.exports = router;
