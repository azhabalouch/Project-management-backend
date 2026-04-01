const express = require('express');
const verifyToken = require('../../../middleware/validateTokenMiddleware');
const router = express.Router();
const createTask = require('./createTaskUtils');

router.use(verifyToken);

router.post("/task", async (req, res) => {
  const response = await createTask({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    isCompleted: req.body.isCompleted,
    // parentTaskId: req.parentTaskId,
    assigneeId: req.user.uid,
    createdAt: new Date().toISOString(),
    dueDate: req.body.dueDate,
  });

  if (response){
    res.status(200).send("Task created successfully.");
  } else {
    res.status(404).send("Task creation failed.");
  }
})

module.exports = router;