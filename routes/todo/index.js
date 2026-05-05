const express = require('express');
const router = express.Router();

const todoCreate = require('./todo/create');
const todoGet = require('./todo/get');
const todoPatch = require('./todo/patch');
const todoDelete = require('./todo/delete');

router.use('/todo/create', todoCreate);
router.use('/todo/get', todoGet);
router.use('/todo/patch', todoPatch);
router.use('/todo/delete', todoDelete);

module.exports = router;
