const express = require('express');

const path = require("path");

const app = express();

const cors = require('cors');
require('dotenv').config();

const sessions = require("express-session");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

let session = {
    secret: process.env.SESSION_SECRET,
    cookie:  { maxAge: 1000 * 60 * 60 },
    saveUninitialized: false,
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
    logout,
    about,
    addPage,
    listPage,
    showTerm,
    addTerm,
    getList,
    seed,
    getTerm,
    addLike,
    checkLikes,
    removeLike,
    mostLikedTerm
} = require("./controller.js")

// Production links for serving static files
app.get("/styles", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stylesheets"));
});

app.get("/js", (req, res) => {
    res.sendFile(path.join(__dirname, "public/js"));
});

app.use(express.static("public"));
// Production links for serving static files



app.get("/seed", seed);
app.get("/mostliked", mostLikedTerm);

app.get("/", home);
app.get("/auth", auth);

app.get("/register", register);
app.post("/register", createAccount);

app.get("/login", login);
app.post("/login", loginUser);

app.get("/logout", logout);

app.get("/about", about);

app.get("/add", addPage);
app.post("/add", addTerm);

app.get("/list", listPage);
app.get("/list/all", getList);

app.get("/list/:id", showTerm);
app.get("/term/:id", getTerm);
app.put("/term/:id", addLike);

app.get("/likes/:term_id", checkLikes);
app.delete("/likes/:term_id", removeLike);





app.listen(process.env.PORT || 3000);