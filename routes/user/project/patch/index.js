const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const patchProject = require('./patchProjectUtils');

router.use(verifyToken);

router.patch('/', async (req, res) => {
  const { projectId, ...updateData } = req.body;
  
  const response = await patchProject(req.user.uid, projectId, {
    ...updateData,
    updatedAt: new Date().toISOString(),
  });

  if (response){
    res.status(200).send('Project updated successfully.');
  } else {
    res.status(404).send('Project update failed.');
  }
})

module.exports = router;
