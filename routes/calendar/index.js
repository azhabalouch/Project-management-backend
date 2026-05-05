const express = require('express');
const router = express.Router();

const eventCreate = require('./event/create');
const eventGet = require('./event/get');
const eventPatch = require('./event/patch');
const eventDelete = require('./event/delete');

router.use('/event/create', eventCreate);
router.use('/event/get', eventGet);
router.use('/event/patch', eventPatch);
router.use('/event/delete', eventDelete);

module.exports = router;
