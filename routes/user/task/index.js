const express = require('express');
const verifyToken = require('../../../middleware/validateTokenMiddleware');
const router = express.Router();

router.use(verifyToken);

router.post("/task", (req, res) => {
  console.log(req.body);
  console.log("Created task: test");
})

module.exports = router;