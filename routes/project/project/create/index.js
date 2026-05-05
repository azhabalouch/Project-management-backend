const express = require('express');
const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const router = express.Router();
const createProject = require('./createProjectUtils');

router.use(verifyToken);

router.post('/', async (req, res) => {
  const response = await createProject(req.user.uid, {
    name: req.body.name,
    description: req.body.description,
    color: req.body.color,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  if (response){
    res.status(200).json({ id: response, message: 'Project created successfully.' });
  } else {
    res.status(404).send('Project creation failed.');
  }
})

module.exports = router;
