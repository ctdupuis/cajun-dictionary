const express = require('express');

const path = require("path");

const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors());

const {
    home,
    register,
    createAccount,
    login,
    loginUser
} = require("./controller.js")

// Production links for serving static files
app.get("/styles", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stylesheets"));
});

app.get("/js", (req, res) => {
    res.sendFile(path.join(__dirname, "public/js"));
});

app.use(express.static("public"));
// Production links fo serving static files



app.get("/", home);

app.get("/register", register);
app.post("/register", createAccount);

app.get("/login", login);
app.post("/login", loginUser);


const PORT = process.env.PORT || 3000



app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));