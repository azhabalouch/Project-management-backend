const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const deleteProject = require('./deleteProjectUtils');

router.use(verifyToken);

router.delete('/', async (req, res) => {
  const { projectId } = req.body;
  
  const response = await deleteProject(req.user.uid, projectId);

  if (response){
    res.status(200).send('Project deleted successfully.');
  } else {
    res.status(404).send('Project deletion failed.');
  }
})

module.exports = router;
