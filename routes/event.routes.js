const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const validate = require('../middleware/validateMiddleware');
const { createEventSchema, updateEventSchema } = require('../schemas/event.schema');
const verifyToken = require('../middleware/auth/validateTokenMiddleware');

router.use(verifyToken); // Protect all routes

// Clean, standard REST endpoints
router.post('/', validate(createEventSchema), eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:eventId', eventController.getEvent);
router.patch('/:eventId', validate(updateEventSchema), eventController.updateEvent);
router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;
