/*
audio crud
Create new audio chunk (needs to upload audio)... 
1.1. upload a wav file to somewhere. run transforms  
1.2. get the live recording on clientside. use the returned result.   
2.0. POST on Database

Read the text chunk
update - patch the chunk. then the chunk will update the bigger text
delete.. hmmm maybe delete it with the notes
*/

import express from "express";

import { urlAudio } from "../ai_services/asr.js";
import { AudioModel } from "../schemas/audioSchema.js";

const router = express.Router();

//nested routes
const audioCRUD = express.Router();

audioCRUD.post("/audio", async (req, res) => {
  // getting the audio from the given link... (should probably use MULTER for uploading)
  let { url } = req.body;
  // check if the url is already in the database
  try {
    const validator = await AudioModel.findOne({ url });
    if (validator) return res.status(400).send("Audio already in Database.");
  } catch (err) {
    res.status(400).send("Error checking the database for audio");
    console.log(err);
  }

  let audioToDB = {};

  try {
    let data = await urlAudio(url);
    audioToDB = data;
    audioToDB.url = url;

    // pushing the audio to the database
    const audio = new AudioModel(audioToDB);
    await audio.save();

    res.status(201).json({
      status: "success",
      data: audio,
    });
  } catch (err) {
    res.status(400).send("Error creating audio");
    console.log(err);
  }
  //   Backup code, much worse to read
  //     asyncUrlAudio(url)
  //       .then((data) => {
  //         audioToDB = data;
  //         audioToDB.url = url;
  //         res.status(201).json({
  //           status: "success",
  //           data: audioToDB,
  //         });
  //         // pushing the audio to the database
  //         let audio = new AudioModel(audioToDB);
  //         asyncAudio(audio).then(() => {
  //           console.log("New audio saved to the database");
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
});

/*
async function asyncUrlAudio(url) {
  return await urlAudio(url);
}
async function asyncAudio(a) {
  return await a.save();
}
*/
audioCRUD.get("/audio", async (req, res) => {
  try {
    const data = await AudioModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send("Error getting audio");
    console.log(err);
  }
});

audioCRUD.patch("/edit-audio/:id", async (req, res) => {
  const id = req.params.id;
  const { index, text } = req.body;
  const audio = await AudioModel.findById(id);
  audio.chunks[index].text = text;
  res.status(200).json(audio);
  await audio.save();
});
audioCRUD.delete("/delete-audio/:id", async (req, res) => {
  const id = req.params.id;
  await AudioModel.findOneAndDelete(id).exec();
  res.status(204).send("Deleted");
});
export { audioCRUD };
