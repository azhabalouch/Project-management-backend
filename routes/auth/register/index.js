const express = require('express');
const signUp = require('./registerUtils');
const createUserData = require('../../../utils/user/profile/createUserDataUtils');
const router = express.Router();

router.post('/', async (req, res) => {
  const { 
    email,
    password,
    firstName,
    lastName
  } = req.body;
  const returnSecureToken = true;

  try {
    const response = await signUp({ email, password, returnSecureToken });

    const dataEntry = await createUserData(response.localId, {firstName, lastName, email});

    if (!dataEntry) {
      throw new Error('User data creation failed');
    }

    const idToken = response.idToken;
    const refreshToken = response.refreshToken;

    res.cookie('idToken', idToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 3600000 
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 604800000 
    });

    res.status(200).json({
      firstName: firstName,
      lastName: lastName
    });
  } catch (error) {
    console.error('Sign-up Error:', error.message);
    const statusCode = error.status || 500;
    res.status(statusCode).send(error.message);
  }
});

module.exports = router;
