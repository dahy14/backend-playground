import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Modules, put it in ecmascript format
import { nestedApi } from "./routes/api.js";

const app = express();
// Using database
/*
  1. get the uri
  2. use mongoose.connect
  3. create a callback when done
*/

const uri = "mongodb://127.0.0.1:27017/notable-backend";

dbConnect(uri)
  .then(() => console.log("Conencted to the Database"))
  .catch((err) => console.log(err));

async function dbConnect(uri) {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Global middleware
app.use(cors());

// Modularize Requests
/*
 1. make the reqeusts as MIDDLEWARE
 2. add a second parameter of where to get the MIDDLEWARE.
 3. on the routes. instanciate a router object
*/
app.use("/api", nestedApi);

// run Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at port http://localhost:${PORT}`);
});
