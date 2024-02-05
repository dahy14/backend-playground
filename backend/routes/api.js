import express from "express";
const router = express.Router();

// Nested Router
const nestedApi = express.Router();
nestedApi.get("/api1", (req, res) => {
  res.send(res.send("fasdhbfnjaskf gagi"));
});
nestedApi.get("/api2", (req, res) => {
  res.send("aaaa fuck, im here");
});

export { nestedApi };
