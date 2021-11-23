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

                select id, username from users where id='${user.id}';
            `
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
        if (req.session.userId) {
            sequelize.query(
                `
                    select id, username from users where id='${req.session.userId}'
                `
            )
            .then(dbRes => res.status(200).send(dbRes[0]))
        } else {
            res.send(req.session)
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect("/");
    }
}