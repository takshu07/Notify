const Note = require("../models/Note");
const mongoose = require("mongoose");

exports.createGroupNote = async (req, res) => {
  try {
    const { title, description = "", body = "", collaborators = [] } = req.body;
    // collaborators: array of { user: userId, role: 'editor'|'viewer' }
    const ownersId = req.user.id;

    const note = new Note({
      title,
      description,
      body,
      owner: ownersId,
      isGroup: true,
      collaborators: collaborators.map(c => ({ user: c.user, role: c.role || 'editor' })),
    });

    await note.save();
    return res.status(201).json({ note });
  } catch (err) {
    console.error("createGroupNote err", err);
    return res.status(500).json({ message: "Server error" });
  }
};