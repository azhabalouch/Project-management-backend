const express = require('express');
const signInWithPassword = require('./loginUtils');
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const returnSecureToken = true;

  try {
    const response = await signInWithPassword({ email, password, returnSecureToken });

    const idToken = response.idToken;
    const refreshToken = response.refreshToken;

    res.cookie('idToken', idToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 3600000 
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 604800000 
    });

    res.status(200).json({
      displayName: response.displayName,
      email: response.email,
      localId: response.localId 
    });
  } catch (error) {
    console.error("Sign-in Error:", error.message);
    const statusCode = error.status || 500;
    res.status(statusCode).send(error.message);
  }
});

module.exports = router;
