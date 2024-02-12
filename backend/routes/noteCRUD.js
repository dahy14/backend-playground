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
  let { audioId, title } = req.body;

  // check audio_id exist in the Database
  try {
    const validator = await NoteModel.findOne({ audio: audioId });

    if (validator)
      return res.status(400).send("Note is available on that Audio.");
  } catch (err) {
    res.status(400).send("Error checking the database for audio");
  }

  // create a new note

  try {
    const audio = await AudioModel.findById(audioId);
    // run the AI
    const summarizedNote = await summarize(audio.text);
    //const sometext =
    //  "In the modern world of technology and innovation, our lives are constantly evolving, shaped by the rapid pace of change. From the advent of artificial intelligence to the proliferation of social media, we find ourselves navigating a complex landscape where information is abundant and boundaries are blurred. In this dynamic environment, it's essential to cultivate adaptability and resilience, embracing new ideas and embracing uncertainty. By embracing a growth mindset and fostering a spirit of curiosity, we can navigate the challenges of the modern era with confidence and purpose. As we embark on this journey of discovery, let us embrace the opportunities that lie ahead and harness the power of knowledge to shape a brighter future for generations to come.";
    // const summarizedNote = await summarize(sometext);
    /*
     */
    console.log(summarizedNote, "\nSummarized notes");
    // Json formatter for easier data search

    // const noteToDB = await formatToDB(summarizedNote)
    title = typeof title !== "undefined" ? title : "Untitled Note";

    // const noteToDB = await formatToDB
    const noteToDB = {
      title,
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
    await NoteModel.findByIdAndDelete({ _id: note._id });
  } catch (err) {
    console.log(err);
  }
});

noteCRUD.get("/note", async (req, res) => {});

export { noteCRUD };
