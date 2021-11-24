const path = require("path");
const bcrypt = require('bcryptjs');

require('dotenv').config();

const { DATABASE_URL } = process.env;
const Sequelize = require('sequelize');
const uniqid = require('uniqid');

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
        let { username, password } = req.body;
        let id = uniqid();
        const salt = bcrypt.genSaltSync(6);
        password = bcrypt.hashSync(password, salt);
        sequelize.query(
            `
                insert into users (user_id, username, password)
                values ('${id}', '${username}', '${password}');
            `
        )
        .then(dbRes => {
            req.session.user = {id: id, username: username}
            res.status(200).send(req.session)
        })
        .catch(err => console.log("error: ", err))
    },
    login: (req, res) => res.status(200).sendFile(path.join(__dirname, "../public/login.html")),
    loginUser: (req, res) => {
        let { username, password } = req.body;

        sequelize.query(
            `
                select * from users where username='${username}';
            `
        )
        .then(dbRes => {
            const existingUser = dbRes[0].pop();
            const authenticated = bcrypt.compareSync(password, existingUser.password);
            if (authenticated) {
                req.session.user = existingUser;
                delete req.session.user.password;
                res.status(200).send("Login success");
            } else {
                res.status(400).send("Invalid username or password");
            }
        })
    },
    auth: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user);
        } else {
            res.status(200).send("No one is logged in");
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send("Log out success");
    },
    about: (req, res) => res.sendFile(path.join(__dirname, "../public/about.html")),
    addPage: (req, res) => res.sendFile(path.join(__dirname, "../public/add.html")),
    addTerm: (req, res) => {
        console.log("Sesh obj: ", req.session)
        let { name, pronunciation, definition, useCase } = req.body;
        sequelize.query(
            `
                insert into terms (name, pronunciation, definition, use_case, user_id)
                values ('${name}', '${pronunciation}', '${definition}', '${useCase}', '${req.session.user.user_id}');
            `
        )
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log("Error:", err))
    },
    listPage: (req, res) => res.sendFile(path.join(__dirname, "../public/list.html")),
    showWord: (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "../public/show.html"))
        // grab word ID from params
        // query database, send response to show for population
    }
}

// SQL query for getting term information:
// select t.term_id, t.name, t.pronunciation, t.definition, t.use_case, u.username from terms t 
// join users u on 
// t.user_id = u.user_id;