const express = require('express');
const router = express.Router();

const taskCreate = require('./create/task');
const taskGet = require('./get/tasks');

router.use('/create', taskCreate);
router.use('/get', taskGet);

module.exports = router;