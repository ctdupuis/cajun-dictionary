const path = require("path");
const User = require("../models/User");

require('dotenv').config();

const { DATABASE_URL } = process.env;
const Sequelize = require('sequelize');
const { dirname } = require("path");

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
let session;

module.exports = {
    home: (req, res) => res.status(200).sendFile(path.join(__dirname, "../public/index.html")),
    register: (req, res) => res.status(200).sendFile(path.join(__dirname, "../public/register.html")),
    createAccount: (req, res) => {
        // create account here
        let { username, password } = req.body;
        let user = new User(username, password);
        sequelize.query(
            `
                insert into users (user_id, username, password)
                values ('${user.id}', '${user.username}', '${user.password}');
            `
        )
        .then(dbRes => {
            req.session.user = user;
            delete req.session.user.password;
            res.status(200).send(req.session)
        })
        .catch(err => res.status(400).send(err))
    },
    login: (req, res) => res.status(200).sendFile(path.join(__dirname, "../public/login.html")),
    loginUser: (req, res) => {
        // login user here
        let { username, password } = req.body;
        let user = new User(username, password);
        if (user.authenticate(password)) {
            req.session.user = user
            delete req.session.user.password
            res.status(200).send("Login success")
        } else {
            res.status(400).send("Invalid username or password")
        }
    },
    auth: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(200).send("No one is logged in")
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send("Log out success");
    },
    about: (req, res) => res.sendFile(path.join(__dirname, "../public/about.html")),
    addPage: (req, res) => res.sendFile(path.join(__dirname, "../public/add.html")),
    listPage: (req, res) => res.sendFile(path.join(__dirname, "../public/list.html")),
    showWord: (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "../public/show.html"))
        // grab word ID from params
        // query database, send response to show for population
    }
}