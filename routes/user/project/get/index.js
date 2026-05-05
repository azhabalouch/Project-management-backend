const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const getUserProjects = require('./getProjectUtils');

router.use(verifyToken);

router.get('/', async (req, res) => {
  const response = await getUserProjects(req.user.uid);

  if (response){
    res.status(200).send(response);
  } else {
    res.status(404).send({error: 'Retrieving projects failed.'});
  }
})

module.exports = router;
