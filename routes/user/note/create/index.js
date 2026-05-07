const express = require('express');
const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const router = express.Router();
const createNote = require('./createNoteUtils');

router.use(verifyToken);

router.post('/', async (req, res) => {
  const response = await createNote(req.user.uid, {
    date: req.body.date,
    color: req.body.color,
    text: req.body.text,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  if (response){
    res.status(200).json({ id: response, message: 'Note created successfully.' });
  } else {
    res.status(404).send('Note creation failed.');
  }
})

module.exports = router;
