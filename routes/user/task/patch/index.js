const express = require('express');
const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware.js');
const router = express.Router();
const patchTask = require('./patchTaskUtils.js');

router.use(verifyToken);

router.patch('/', async (req, res) => {
  const { taskId, ...updateData } = req.body;
  const response = await patchTask(req.user.uid, taskId, {
    ...updateData,
    updatedAt: new Date().toISOString(),
  });

  if (response){
    res.status(200).send('Task updated successfully.');
  } else {
    res.status(404).send('Task update failed.');
  }
})

module.exports = router;