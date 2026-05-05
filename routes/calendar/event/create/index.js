const express = require('express');
const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const router = express.Router();
const createEvent = require('./createEventUtils');

router.use(verifyToken);

router.post('/', async (req, res) => {
  const response = await createEvent(req.user.uid, {
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    allDay: req.body.allDay || false,
    location: req.body.location,
    color: req.body.color,
    recurrence: req.body.recurrence,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  if (response){
    res.status(200).json({ id: response, message: 'Event created successfully.' });
  } else {
    res.status(404).send('Event creation failed.');
  }
})

module.exports = router;
