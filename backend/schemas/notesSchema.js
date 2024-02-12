import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,

  tags: [String],
  audio: { type: mongoose.Schema.Types.ObjectId, ref: "Audio" },
});

const NoteModel = mongoose.model("Note", noteSchema);

export { NoteModel };
