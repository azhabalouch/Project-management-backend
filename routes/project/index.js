const express = require('express');
const router = express.Router();

const projectCreate = require('./project/create');
const projectGet = require('./project/get');
const projectPatch = require('./project/patch');
const projectDelete = require('./project/delete');

router.use('/project/create', projectCreate);
router.use('/project/get', projectGet);
router.use('/project/patch', projectPatch);
router.use('/project/delete', projectDelete);

module.exports = router;
