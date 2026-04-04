const express = require('express');
const router = express.Router();

const taskCreate = require('./create/task');
const taskGet = require('./get/tasks');
const taskPatch = require('./patch/task');

router.use('/create', taskCreate);
router.use('/get', taskGet);
router.use('/patch', taskPatch);

module.exports = router;