const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();
// Router 1: to get all notes using :GET "/api/notes/fetchallnotes"  r
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
})
// Router 2: to Add a new notes using: POST"/api/notes/addnote
router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be atleast five charactors').isLength({ min: 5 }),
], async (req, res) => {

  try {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title, description, tag, user: req.user.id
    })
    const saveNote = await note.save();
    res.json(saveNote);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
  // Status for bad request
})


// ROUTE 3  Update an existing note using :PUT "/api/notes/updatenote" .Login required
// fetchuser is to check weather updation is from the existing user or not
router.put('/updatenote/:id', fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // Create a newnote object
      const newnote = {};
      if (title) { newnote.title = title };
      if (tag) { newnote.tag = tag };
      if (description) { newnote.description = description };
      // Find the note and update it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not found") }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }

      note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
      res.json({ note })
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
)

// ROUTE 4  To delete an existing note using :DELETE "/api/notes/deletenote" .Login required

router.delete('/deletenote/:id', fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      
      // Find the note and delete it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not found") }
 // allow deletion if  user owns this
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({ "Success":"Note has been deleted",note:note})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
)
module.exports = router
