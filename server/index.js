const express = require('express');

const path = require("path");

const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors());

const {
    home
} = require("./controller.js")

app.get("/styles", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.css"));
});

app.get("/js", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.js"));
});


app.get("/", home);

app.use(express.static("public"));

const PORT = process.env.PORT || 3000



app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));