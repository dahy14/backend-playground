const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello bitch");
});

app.get("/data", (req, res) => {
  res.json({
    name: "Dahy14",
    hobby: "Bopping to twice",
  });
});

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
