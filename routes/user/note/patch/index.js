const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const patchNote = require('./patchNoteUtils');

router.use(verifyToken);

router.patch('/', async (req, res) => {
  const { noteId, ...updateData } = req.body;

  const response = await patchNote(req.user.uid, noteId, {
    ...updateData,
    updatedAt: new Date().toISOString(),
  });

  if (response){
    res.status(200).send('Note updated successfully.');
  } else {
    res.status(404).send('Note update failed.');
  }
})

module.exports = router;
