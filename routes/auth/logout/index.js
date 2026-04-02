const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  };

  res.clearCookie('idToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);

  res.status(200).json({ message: 'User logged out' });
})

module.exports = router;