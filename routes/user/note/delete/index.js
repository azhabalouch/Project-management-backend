const express = require('express');
const router = express.Router();

const verifyToken = require('../../../../middleware/auth/validateTokenMiddleware');
const deleteNote = require('./deleteNoteUtils');

router.use(verifyToken);

router.delete('/', async (req, res) => {
  const { noteId } = req.body;

  const response = await deleteNote(req.user.uid, noteId);

  if (response){
    res.status(200).send('Note deleted successfully.');
  } else {
    res.status(404).send('Note deletion failed.');
  }
})

module.exports = router;
