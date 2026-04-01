const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.cookie('idToken', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.cookie('refreshToken', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ message: 'User logged out' });
})

module.exports = router;