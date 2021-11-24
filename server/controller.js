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
                insert into users (id, username, password)
                values ('${user.id}', '${user.username}', '${user.password}');
            `
        )
        .then(dbRes => {
            req.session.user = user;
            res.status(200).send(req.session)
        })
        .catch(err => res.status(400).send(err))
    },
    login: (req, res) => res.status(200).sendFile(path.join(__dirname, "../public/login.html")),
    loginUser: (req, res) => {
        // login user here
    },
    auth: (req, res) => {
        console.log(req.session)
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(200).send("No one is logged in")
        }
    },
    logout: (req, res) => {
        console.log(req.session)
        // res.clearCookie('connect.sid', {path: '/'}).status(200).send('Ok.')
        req.session.destroy();
        console.log(req.session)
        res.status(200).send("user logged out");
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