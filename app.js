const cl = console.log;
const express = require("express");
const cors = require("cors");
const router = require("./Router/postRouter");

const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/posts", router);

module.exports = app;
