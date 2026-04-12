const express = require('express');
const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware.js');
const router = express.Router();
const patchTask = require('./patchTaskUtils.js');

router.use(verifyToken);

router.patch('/', async (req, res) => {
  const response = await patchTask(req.body.id, req);

  if (response){
    res.status(200).send('Task created successfully.');
  } else {
    res.status(404).send('Task creation failed.');
  }
})

module.exports = router;