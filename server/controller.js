const path = require("path");
const bcrypt = require('bcryptjs');

require('dotenv').config();

const { DATABASE_URL } = process.env;
const Sequelize = require('sequelize');
const uniqid = require('uniqid');
const { ESRCH } = require("constants");

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
    getList: (req, res) => {
        sequelize.query(
            `
                select t.term_id, t.name, t.pronunciation, t.definition, use_case, u.username 
                from terms t
                join users u
                on t.user_id = u.user_id
                order by name asc;
            `
        )
        .then(dbRes => res.status(200).send(dbRes[0]));
        // SQL query for getting term information:
        // select t.term_id, t.name, t.pronunciation, t.definition, t.use_case, u.username from terms t 
        // join users u on 
        // t.user_id = u.user_id;
    },
    showTerm: (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "../public/show.html"))
        // grab word ID from params
        // query database, send response to show for population
    },
    recentTerm: (req, res) => {
        sequelize.query(
            `
                select t.term_id, t.name, t.pronunciation, t.definition, use_case, u.username 
                from terms t
                join users u
                on t.user_id = u.user_id
                order by term_id desc limit 1;
            `
        )
        .then(dbRes => res.status(200).send(dbRes[0]));
    },
    seed: (req, res) => {
        sequelize.query(
            `
                drop table if exists terms;

                create table terms (
                    term_id serial primary key,
                    name varchar,
                    pronunciation varchar,
                    definition text,
                    use_case text,
                    user_id varchar references users(user_id)
                );

                insert into terms (name, pronunciation, definition, use_case, user_id)
                values 

                ('meenoo', 'MEEnoo', 'A cat.', '"Cha meenoo, come here and get you a treat"', 'enw183x2okwe3onlc'),

                ('mais yeah', 'MAY yeh', 'Showing affirmation to a question that the person answering believes is an obvious answer', '"Hey man, did you see the Saints play yesterday?"\n"Mais yeah, I never miss a game."', 'enw183x2okwe3onlc'),

                ('boudin', 'BOOdah', 'Sausage casing stuffed with rice, meat and vegetables', '"Nothing beats a hot plate of boudin after a long day."', 'enw183x2okwe3onlc'),

                ('ahnvee', 'AHNvee', 'Hunger, craving', '"I got me a strong ahnvee for some étouffée right about now."', 'enw183x2okwe3onlc'),

                ('boude', 'booDAY', 'To whine our pout', '"I don\t wanna hear you boude, do your homework and do it right."', 'enw183x2okwe3onlc'),

                ('domion', 'dohMEEawn', 'A peeping tom', '"I hear Cherie say that Bubba down the road is a domion. She caught him staring outside her window the other night"', 'enw183x2okwe3onlc'),

                ('each a one', 'eech A wun', 'One each', '"There are plenty of snacks to go around, get you each a one."', 'enw183x2okwe3onlc'),

                ('drawz', 'DRAWZ', 'Underwear', '"Boy, pick ya damn drawz up off the floor! I been telling you this for a week now."', 'enw183x2okwe3onlc'),

                ('fais do-do', 'fay DOH-doh', 'Go to sleep', '"Hey, it\s 9pm, that means it\s fais do-do time."', 'enw183x2okwe3onlc'),

                ('ga lee', 'GAH lee', 'An expression of surprise or astonishment', '"I went to get me a new mower today but ga lee boy them mowers are expensive."', 'enw183x2okwe3onlc'),

                ('hont', 'HAWN', 'A feeling of embarassment', '"I ripped my pants at the family reunion. Imagine the hont I felt after that."', 'enw183x2okwe3onlc'),

                ('Nanan', 'nahNAHN', 'Term of endearment used to describe one\s godmother, synonymous with "Nanny"', '"Your Pa and I are going Zydeco dancing tonight, Nanan is gonna be watching you for til we get back"', 'enw183x2okwe3onlc'),

                ('étoufée', 'ayTOOfay', 'French-creole dish that is typically served with shellfish over rice', '"Make sure you\re home in time for dinner, yer mama\s makin\ crawfish étoufée tonight."', 'enw183x2okwe3onlc'),

                ('Parran', 'PARrah', 'Term of endearment used to describe one\s godfather', '"Hey Pa, Parran offered to take me fishing! Can I please go?"', 'enw183x2okwe3onlc')
                ;
            `
        )
        .then(dbRes => res.status(200).send('DB seeded'))
        .catch(err => console.log(err));
    }
}
