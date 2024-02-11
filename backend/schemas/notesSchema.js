import mongoose from "mongoose";
import { audioSchema } from "./audioSchema";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: String,
  tags: [String],
  audio: [audioSchema],
});

const Note = mongoose.model("Note", noteSchema);

export { Note };
