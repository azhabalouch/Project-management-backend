const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const getUserTasks = require('../../../../utils/user/tasks/getTaskUtils');

router.use(verifyToken);

router.get("/tasks", async (req, res) => {
  const response = await getUserTasks(req.user.uid);

  if (response){
    res.status(200).send(response);
  } else {
    res.status(404).send("Retrieving tasks failed.");
  }
})

module.exports = router;