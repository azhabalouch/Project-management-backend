const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const deleteTask = require('./deleteTaskUtils');

router.use(verifyToken);

router.delete("/delete", async (req, res) => {
  const isDeleted = deleteTask(req.user.uid, req.body.id);

  if (isDeleted){
    res.status(200).send("Deleted task successfully.");
  } else {
    res.status(404).send({error: "Could not delete task."});
  }
})

module.exports = router;