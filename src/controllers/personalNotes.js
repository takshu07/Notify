// controllers/personalNotesController.js
const Note = require("../models/personalNotes"); // adjust path if needed

const createPersonalNotes = async (req, res) => {
  try {
    const { title, description, body } = req.body;

    // validation
    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    const newNote = await Note.create({
      title,
      description,
      body,
      owner: req.user._id
    });

    return res.status(201).json({
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
      details: error.message,
    });
  }
};

const deletePersonalNotes = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id, 
    });

    if (!deletedNote) {
      return res.status(404).json({
        error: "Note not found or not yours",
      });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
      deletedNote,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
      details: error.message,
    });
  }
};

const updatePersonalNotes = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description, body } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, owner: req.user._id }, // find only user's own note
      { title, description, body }, // update data
      { new: true } // return updated note
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found or not yours" });
    }

    return res.json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
      details: error.message,
    });
  }
};

const getPersonalNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user._id });

    return res.json({
      count: notes.length,
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
      details: error.message,
    });
  }
};

module.exports = {
  createPersonalNotes,
  deletePersonalNotes,
  updatePersonalNotes,
  getPersonalNotes,
};
