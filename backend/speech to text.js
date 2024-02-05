import { pipeline } from "@xenova/transformers";
import wavefile from "wavefile";

const transcriber = await pipeline(
  "automatic-speech-recognition",
  "Xenova/whisper-tiny.en"
);

// Load audio data
// make sure that a file is uploaded on a file server
// const url = "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav";

const url =
  "https://s78-hzde.freeconvert.com/task/65c0aa5b6f1fd5df9c46fe4a/Notable%20by%20kers.wav";
const buffer = Buffer.from(await fetch(url).then((x) => x.arrayBuffer()));

// Read .wav file and convert it to required format
const wav = new wavefile.WaveFile(buffer);
wav.toBitDepth("32f"); // Pipeline expects input as a Float32Array
wav.toSampleRate(16000); // Whisper expects audio with a sampling rate of 16000
const audioData = wav.getSamples();
if (Array.isArray(audioData)) {
  if (audioData.length > 1) {
    const SCALING_FACTOR = Math.sqrt(2);

    // Merge channels (into first channel to save memory)
    for (const i = 0; i < audioData[0].length; ++i) {
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
