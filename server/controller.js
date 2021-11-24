const path = require("path");
const User = require("../models/User");

require('dotenv').config();

const { DATABASE_URL } = process.env;
const Sequelize = require('sequelize');

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
                // select id, username from users where id='${user.id}';
        )
        .then(dbRes => {
            req.session.userId = user.id;
            res.status(200).send(dbRes[0])
            res.redirect("/")
        })
        .catch(err => res.status(400).send(err))
    },
    login: (req, res) => res.status(200).sendFile(path.join(__dirname, "../public/login.html")),
    loginUser: (req, res) => {
        // login user here
    },
    auth: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.send(req.session)
        }
    },
    logout: (req, res) => {
        console.log(req.session)
        // res.clearCookie('connect.sid', {path: '/'}).status(200).send('Ok.')
        req.session.destroy();
        console.log(req.session)
        res.status(200).send("user logged out");
    },
    about: (req, res) => res.sendFile(path.join(__dirname, "../public/about.html"))
}