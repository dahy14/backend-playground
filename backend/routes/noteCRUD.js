/*
notes crud
Create a generative text from audiofile model 
Read the text chunk 
update - patch the chunk.
1. when user want to change the summarized text. then yeah update 
delete.. hmmm maybe delete both notes and audio
*/
import express from "express";
import { NoteModel } from "../schemas/notesSchema.js";
import { AudioModel } from "../schemas/audioSchema.js";
import { summarize } from "../ai_services/textgen.js";

import { formatToDB } from "../helper/textToDB.js";

const router = express.Router();

// nested routes
const noteCRUD = express.Router();

noteCRUD.post("/note", async (req, res) => {
  // get what they send to us
  let { audioId, title, content } = req.body;

  // create a new note without audio
  if (typeof audioId === "undefined") {
    try {
      const note = new NoteModel({ title, content });
      await note.save();
      res.status(201).json({
        status: "success",
        message: "Note created",
        data: note,
      });
    } catch (err) {
      res.status(400).send("Error creating note (without audio)");
      console.log(err);
    }
  }

  // create a new note from audio
  else {
    // check audio_id exist in the Database
    try {
      const validator = await NoteModel.findOne({ audio: audioId });

      if (validator)
        return res.status(400).send("Note is available on that Audio.");
    } catch (err) {
      res.status(400).send("Error checking the database for audio");
      console.log(err);
    }

    try {
      const audio = await AudioModel.findById(audioId);
      // run the AI
      const summarizedNote = await summarize(audio.text);

      // Json formatter for easier data search
      const {
        title: aiTitle,
        tags,
        content,
      } = await formatToDB(summarizedNote);

      // const noteToDB = await formatToDB(summarizedNote)
      title = typeof title !== "undefined" ? title : aiTitle;

      // const noteToDB = await formatToDB
      const noteToDB = {
        title,
        tags,
        content,
        audio: audioId,
      };

      const note = new NoteModel(noteToDB);
      await note.save();

      res.status(201).json({
        status: "success",
        message: "Note created",
        data: note,
      });

      console.log("Successful Note creation");
      // await NoteModel.findByIdAndDelete({ _id: note._id });
    } catch (err) {
      res.status(400).send("Error creating audio note ");
      console.log(err);
    }
  }
});

noteCRUD.get("/note", async (req, res) => {
  try {
    const notes = await NoteModel.find().populate("audio").exec();
    res.status(200).json({
      status: "success",
      message: "Notes retrieved",
      data: notes,
    });
  } catch (err) {
    res.status(400).send("Error retrieving notes");
  }
});

noteCRUD.patch("/edit-note/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content, tags } = req.body;

  try {
    const note = await NoteModel.findById(id);

    const noteToDB = {
      title: title,
      content: content,
      tags: tags,
    };
    await note.updateOne(noteToDB);
    res.status(200).json({
      status: "success",
      message: "Note updated",
    });
  } catch (err) {
    res.status(400).send("Error updating note ", err.message);
    console.log(err);
  }
});

noteCRUD.delete("/delete-note/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const note = await NoteModel.findById(id);
    console.log(note.title + " will be deleted");
    await note.deleteOne();
    if (!note) {
      return res.status(404).send("Note not found");
    }
    res.status(200).json({
      status: "success",
      message: "Note deleted",
    });
    console.log("Note deleted");
  } catch (err) {
    res.status(400).send("Error deleting note ", err.message);
  }
});

export { noteCRUD };
