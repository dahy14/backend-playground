import mongoose from "mongoose";

// Using database
/*
  1. get the uri
  2. use mongoose.connect
  3. create a callback when done
*/

async function dbConnect(uri = "mongodb://127.0.0.1:27017/test") {
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
  });
}

export { dbConnect };
