const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const patchEvent = require('./patchEventUtils');

router.use(verifyToken);

router.patch('/', async (req, res) => {
  const { eventId, ...updateData } = req.body;
  
  const response = await patchEvent(req.user.uid, eventId, {
    ...updateData,
    updatedAt: new Date().toISOString(),
  });

  if (response){
    res.status(200).send('Event updated successfully.');
  } else {
    res.status(404).send('Event update failed.');
  }
})

module.exports = router;
