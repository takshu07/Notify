const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  body: {
    type: String,
    required: true
  },

    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

 


  //MongoDB already creates a unique _id for every note.
// You do NOT need to manually make noteId.
  // noteId:{
  // type:mongoose.Schema.Types.NoteId
  // }
  
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);
