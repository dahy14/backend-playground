import { fileURLToPath } from "url";
import path from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

// ignore
// the ___dirname, ES module has no native __dirname calls
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ignore most of the time
// locate and instanciate the gguf file and use the magic of path.join to correctly address forward or back slash.
const model = new LlamaModel({
  modelPath: path.join(
    __dirname,
    "ai_models",
    "openhermes-2.5-mistral-7b.Q5_K_S.gguf"
  ),
});

//
const context = new LlamaContext({ model });

//
const session = new LlamaChatSession({
  context,
  // promptWrapper: new LlamaChatPromptWrapper() // use to format the End of Token string. not that important
});

const prompt =
  "You are an AI Assistant that only replies in markdown file. Use only the information within the given context and keep each summary to a maximum of 50 words, while for the heading a maximum of 10 words and a minimum of one word. You are to outline a the whole passage in this format. \n";

const format = ` 
# ++ **Title** ++
## ++ Summary ++
summarized context
### ++ Write about Sentence about topic 1 ++
Write at least 2 supporting arguments in > bullets
## ++ Counter Arguments ++ 
Write atleast 2 supporting arguments in > bullets 
`;

const userInput =
  "Oh my, look at that magnificent creature! It's like a fish with legs, swimming through the air! I've never seen anything quite so wondrous in all my life. How does it stay afloat? And what is that sound it makes? It's almost as if it's laughing! This is truly a magical moment for me";

// const a3 = await session.prompt(q1);

const q1 = prompt.concat(format, "\n", "User Input: ", userInput);

console.log("Q1: ", q1);
// session.prompt's second param is for stream
const a1 = await session.prompt(q1, {
  onToken(chunk) {
    // this is the stream part. Put the code inside to get the stream of data.
    const chunk_now = context.decode(chunk);
    console.log(chunk_now);
  },
  // temperature, increase for more creative liberties but it may become more and more random or unhinge
  temperature: 0.4,
  topK: 40,
  topP: 0.4,
});
// DO NOT CALL a1 FROM OUTSIDE THE DATA STREAM BECAUSE IT WILL BE SLOW.

console.log("AI: " + a1);
// needs to create a JSON for structured response

// 0.8 40 .02 Oh my, look at that magnificent creature! It's like a fish with legs, swimming through the air! I've never seen anything quite so wondrous in all my life. How does it stay afloat? And what is that sound it makes? It's almost as if it's laughing! This is truly a magical moment for me

// 1.5 40 0.7 My, what a marvelous creature! It seems to glide through the water effortlessly, almost as if it's dancing. The way its body moves...it's mesmerizing. I've never seen anything like it before. How fascinating life can be!

// 0.8 40 .7 Oh my goodness, look at that beautiful creature! It's like a mermaid from one of our fairy tales, gliding through the water with such grace and ease. Its playful nature reminds me of how we would frolic in the woods back home. I never thought I would see something so magical in this world. How wondrous life can be!
