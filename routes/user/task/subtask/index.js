const express = require('express');
const router = express.Router();

const subtaskAdd = require('./subtask/add');
const subtaskUpdate = require('./subtask/update');
const subtaskDelete = require('./subtask/delete');

router.use('/subtask/add', subtaskAdd);
router.use('/subtask/update', subtaskUpdate);
router.use('/subtask/delete', subtaskDelete);

module.exports = router;
