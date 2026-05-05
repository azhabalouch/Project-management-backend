const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const deleteEvent = require('./deleteEventUtils');

router.use(verifyToken);

router.delete('/', async (req, res) => {
  const { eventId } = req.body;
  
  const response = await deleteEvent(req.user.uid, eventId);

  if (response){
    res.status(200).send('Event deleted successfully.');
  } else {
    res.status(404).send('Event deletion failed.');
  }
})

module.exports = router;
