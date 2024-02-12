import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
  text: { type: String, required: true },

  chunks: [
    {
      timestamp: [Number],
      text: String,
    },
  ],

  url: {
    type: String,
    // unique: true,
    required: [true, "url required"],
  },
});

const AudioModel = mongoose.model("Audio", audioSchema);

export { audioSchema, AudioModel };
