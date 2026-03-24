const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  const headerNames = res.getHeaderNames();

  if (headerNames.Authorization == "bearer: ") {
    console.log('pass');
    next();
  }
});

router.post("/", (req, res) => {
  console.log('Test');
});

module.exports = router;
