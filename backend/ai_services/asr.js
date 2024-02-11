import { pipeline } from "@xenova/transformers";
import wavefile from "wavefile";

async function urlAudio(url) {
  const transcriber = await pipeline(
    "automatic-speech-recognition",
    "Xenova/whisper-tiny.en"
  );
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
  console.log(
    `Speach to text Execution duration: ${(end - start) / 1000} seconds`
  );
  //console.log(output);
  return Promise.resolve(output);
}

export { urlAudio };
