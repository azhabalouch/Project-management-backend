const express = require('express');
const router = express.Router();
const verifyToken = require('../../../middleware/auth/validateTokenMiddleware');

router.use(verifyToken);

router.get('/', async (req, res) => {
  res.status(200).json({
    user: 'Verified'
  });
});

module.exports = router;
