const express = require('express');
const router = express.Router();

const taskCreate = require('./task/create');
const taskGet = require('./task/get');
const taskPatch = require('./task/patch');
const taskDelete = require('./task/delete');
const taskHistory = require('./task/history');
const taskSubtask = require('./task/subtask');

router.use('/task/create', taskCreate);
router.use('/task/get', taskGet);
router.use('/task/patch', taskPatch);
router.use('/task/delete', taskDelete);
router.use('/task/history', taskHistory);
router.use('/task', taskSubtask);

module.exports = router;