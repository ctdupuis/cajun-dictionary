const express = require('express');

const path = require("path");

const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.get("/styles", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.css"));
});

app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.js"));
});


const PORT = process.env.PORT || 4005



app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));