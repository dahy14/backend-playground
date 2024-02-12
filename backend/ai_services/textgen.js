import { fileURLToPath } from "url";
import path from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

// ignore
// the ___dirname, ES module has no native __dirname calls
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ignore most of the time
// locate and instanciate the gguf file and use the magic of path.join to correctly address forward or back slash.

async function summarize(userInput) {
  const model = new LlamaModel({
    modelPath: path.join(
      __dirname,
      "..",
      "ai_models",
      "openhermes-2.5-mistral-7b.Q5_K_S.gguf"
    ),
  });

  const context = new LlamaContext({
    model,
    threads: 15,
    batchSize: 1024,
    contextSize: 1024,
  });

  //
  const session = new LlamaChatSession({
    context,
    // promptWrapper: new LlamaChatPromptWrapper() // use to format the End of Token string. not that important
  });

  const prompt1 =
    "You are an AI Assistant that only replies in markdown format. Use only the information within the given context and keep each answer concise.  The user input may sometimes contain typos, misspelled words in it, so take that into account. You need to outline the whole passage in this format. FOLLOW THE FORMAT.";

  const format = ` 
  ~~ format ~~ [exclude this line]
#  Title 
1. create ONLY ONE title
#  tags 
1. create ORDERED list of tags per 30 words.
## Summary 
summarized context in less than 20 words. 
## Highlight
Highest point of the speech with supporting evidences. 
### Supporting Ideas 
1 ordered list of supporting evidence
## Counter Arguments 
1. ordered list of counter arguments
`;

  const q1 = prompt1.concat(format, "\n", "User Input: ", userInput);
  const start = performance.now();
  // console.log("Q1: ", q1);
  // session.prompt's second param is for stream
  const a1 = await session.prompt(q1, {
    onToken(chunk) {
      // this is the stream part. Put the code inside to get the stream of data.
      const chunk_now = context.decode(chunk);
      console.log(chunk_now);
    },
    // temperature, increase for more creative liberties but it may become more and more random or unhinge
    temperature: 0.5,
    topK: 40,
    topP: 0.8,
    trimWhitespaceSuffix: true,
    repeatPenalty: true,
  });
  // DO NOT CALL a1 FROM OUTSIDE THE DATA STREAM BECAUSE IT WILL BE SLOW.
  const end = performance.now();
  console.log(`Text gen execution duration: ${(end - start) / 1000} seconds`);
  // console.log("AI: " + a1);

  // needs to create a JSON for structured response
  return Promise.resolve(a1);
}

export { summarize };
