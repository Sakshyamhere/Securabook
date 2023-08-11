const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();
const fetchUser = require("../middleware/FetchUser");
const { validationResult, body } = require("express-validator");

//Route : 1 Fetch all user notes from database. GET : api/notes/fetchnotes. Login required.
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    //Catch An Error.
    console.error(error.message);
    res.status(500).send("Intenal server error occured");
  }
});

//Route : 2 post  user notes from database. POST : api/notes/postnotes. Login required.
router.post(
  "/postnotes",
  fetchUser,
  [
    body("title", "Title shouldnot be empty.").isLength({ min: 3 }),
    body("description", "Description must be 10 letters.").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    //Error Hunter.Send 400 if error.

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Destructuring of title, description and tag.
    const { title, description, tag } = req.body;
    try {
      //Add notes in database.
      const notes = await Notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // const savedNotes = await notes.save();

      res.json(notes);
    } catch (error) {
      //Catch An Error.
      console.error(error.message);
      res.status(500).send("Intenal server error occured");
    }
  }
);

//Route : 3 Update all user notes from database. PUT : api/notes/updatenotes/:id. Login required.
router.put(
  "/updatenotes/:id",
  fetchUser,
  [
    body("title", "Title shouldnot be empty.").isLength({ min: 3 }),
    body("description", "Description must be 10 letters.").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    //Error Hunter.Send 400 if error.

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Destructuring of title, description and tag.
    const { title, description, tag } = req.body;

    try {
      const updatedNotes = {};
      if (title) {
        updatedNotes.title = title;
      }
      if (description) {
        updatedNotes.description = description;
      }
      if (tag) {
        updatedNotes.tag = tag;
      }
      //Find the note by given id.
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("404 Not Found");
      }
      //Verify the note by given id.

      if (note.user.toString() !== req.user.id) {
        return res.status(405).send("Not Allowed");
      }
      //Update the note calling the updateNotes.
      note = await Notes.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedNotes },
        { new: true }
      );

      res.json(note);
    } catch (error) {
      //Catch An Error.
      console.error(error.message);
      res.status(500).send("Intenal server error occured");
    }
  }
);

//Route : 4 Delete  user notes from database. PUT : api/notes/deletenote/:id. Login required.
router.delete("/deletenotes/:id", fetchUser, async (req, res) => {
  //Destructuring of title, description and tag.
  

  try {
    //Find the note by given id.
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("404 Not Found");
    }
    //Verify the note by given id.
    if (note.user.toString() !== req.user.id) {
      return res.status(405).send("Not Allowed");
    }

    //Find the note by given id and Delete.
    note = await Notes.findByIdAndDelete(
      { _id: req.params.id },
   
    );

 res.json({"Success" : "Note Sucessfully Deleted."});

  } catch (error) {
    //Catch An Error.
    console.error(error.message);
    res.status(500).send("Intenal server error occured");
  }
});

module.exports = router;
