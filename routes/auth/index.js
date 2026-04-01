const express = require('express');
const router = express.Router();

const userLogin = require('./login');
const userRegister = require('./register');
const userVerify = require('./verify');
const userLogout = require('./logout');

router.use('/login', userLogin);
router.use('/register', userRegister);
router.use('/verify', userVerify);
router.use('/logout', userLogout);

module.exports = router;