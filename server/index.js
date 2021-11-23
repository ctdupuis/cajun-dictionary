const express = require('express');

const path = require("path");

const app = express();

const cors = require('cors');

const sessions = require("express-session");
const cookieParser = require("cookie-parser");

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

let session = {
    secret: process.env.SESSION_SECRET,
    cookie: { secure: true },
    saveUninitialized: true,
    resave: false
};

app.use(sessions(session));


const {
    home,
    register,
    createAccount,
    login,
    loginUser,
    auth,
    logout
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
app.get("/auth", auth);

app.get("/register", register);
app.post("/register", createAccount);

app.get("/login", login);
app.post("/login", loginUser);

app.get("/logout", logout);


const PORT = process.env.PORT || 3000



app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));