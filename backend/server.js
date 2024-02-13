import express from "express";
import cors from "cors";

// Modules, put it in ecmascript format

import { dbConnect } from "./models/mongooseConnect.js";
import { audioCRUD } from "./routes/audioCRUD.js";
import { noteCRUD } from "./routes/noteCRUD.js";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// find this later
dbConnect()
  .then(() => console.log("Conencted to the Database"))
  .catch((err) => console.log(err));

// Modularize Requests
/*
 1. make the reqeusts as MIDDLEWARE
 2. add a second parameter of where to get the MIDDLEWARE.
 3. on the routes. instanciate a router object
*/
app.use("/service", [audioCRUD, noteCRUD]);
// app.use("/service", audioCRUD);
// app.use("/service", noteCRUD);

// run Server
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server running at port http://127.0.0.1:${PORT}`);
});
