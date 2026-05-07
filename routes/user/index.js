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

const todoCreate = require('./todo/create');
const todoGet = require('./todo/get');
const todoPatch = require('./todo/patch');
const todoDelete = require('./todo/delete');

router.use('/todo/create', todoCreate);
router.use('/todo/get', todoGet);
router.use('/todo/patch', todoPatch);
router.use('/todo/delete', todoDelete);

const projectCreate = require('../user/project/create');
const projectGet = require('../user/project/get');
const projectPatch = require('../user/project/patch');
const projectDelete = require('../user/project/delete');

router.use('/project/create', projectCreate);
router.use('/project/get', projectGet);
router.use('/project/patch', projectPatch);
router.use('/project/delete', projectDelete);

const eventCreate = require('./event/create');
const eventGet = require('./event/get');
const eventPatch = require('./event/patch');
const eventDelete = require('./event/delete');

router.use('/event/create', eventCreate);
router.use('/event/get', eventGet);
router.use('/event/patch', eventPatch);
router.use('/event/delete', eventDelete);

const noteCreate = require('./note/create');
const noteGet = require('./note/get');
const notePatch = require('./note/patch');
const noteDelete = require('./note/delete');

router.use('/note/create', noteCreate);
router.use('/note/get', noteGet);
router.use('/note/patch', notePatch);
router.use('/note/delete', noteDelete);

module.exports = router;