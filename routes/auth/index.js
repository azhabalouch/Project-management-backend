const express = require('express');
const router = express.Router();

const userLogin = require('./login');
const userRegister = require('./register');

router.use('/login', userLogin);
router.use('/register', userRegister);

module.exports = router;