import { pipeline } from "@xenova/transformers";
import wavefile from "wavefile";

const transcriber = await pipeline(
  "automatic-speech-recognition",
  "Xenova/whisper-tiny.en"
);

// Load audio data
// make sure that a file is uploaded on a file server
let url =
  "https://drive.usercontent.google.com/download?id=1TTTSgiWgB9TQqnZu2i3Gn40zGSWQ127s&export=download&authuser=2&confirm=t&uuid=6608679d-aa20-40a8-9ee4-721417fdf54e&at=APZUnTWbna-RPLBEH2q9pbpN0bGl:1707627002696"; // jfk small file

url =
  "https://drive.usercontent.google.com/download?id=14I77u-gPbtiojes8nM6Z1FpmqOM_sQvV&export=download&authuser=2&confirm=t&uuid=914027eb-9426-4bee-828a-a9e50201db52&at=APZUnTVxintJWooKaQm8BLTDQ1X0:1707617146651"; // kers huge file
const buffer = Buffer.from(await fetch(url).then((x) => x.arrayBuffer()));

// Read .wav file and convert it to required format
const wav = new wavefile.WaveFile(buffer);
wav.toBitDepth("32f"); // Pipeline expects input as a Float32Array
wav.toSampleRate(16000); // Whisper expects audio with a sampling rate of 16000
let audioData = wav.getSamples();
if (Array.isArray(audioData)) {
  if (audioData.length > 1) {
    const SCALING_FACTOR = Math.sqrt(2);

    // Merge channels (into first channel to save memory)
    for (let i = 0; i < audioData[0].length; ++i) {
      audioData[0][i] =
        (SCALING_FACTOR * (audioData[0][i] + audioData[1][i])) / 2;
    }
  }

  // Select first channel
  audioData = audioData[0];
}

const start = performance.now();
const output = await transcriber(audioData, {
  return_timestamps: true,
  chunk_length_s: 30,
  stride_length_s: 5,
});
const end = performance.now();
console.log(`Execution duration: ${(end - start) / 1000} seconds`);
console.log(output);
