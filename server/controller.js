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

                select * from users where id='${user.id}';
            `
        )
        .then(dbRes => {
            let copy = {
                ...dbRes[0]
            }
            delete copy[0].password;
            res.status(200).send(copy)
        })
        .catch(err => res.status(400).send(err))
        // res.status(200).send(user);
    },
    login: (req, res) => res.status(200).sendFile(path.join(__dirname, "../public/login.html")),
    loginUser: (req, res) => {
        // login user here
    }
}