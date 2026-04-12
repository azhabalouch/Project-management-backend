const express = require('express');
const router = express.Router();

const taskCreate = require('./task/create');
const taskGet = require('./task/get');
const taskPatch = require('./task/patch');
const taskDelete = require('./task/delete');

router.use('/', taskCreate);
router.use('/', taskGet);
router.use('/', taskPatch);
router.use('/', taskDelete);

module.exports = router;