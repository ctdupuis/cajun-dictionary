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
            req.session.user = { user_id: id, username: username }
            res.status(200).send(req.session)
        })
        .catch(err => res.status(400).send(err));
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
        .catch(err => res.status(404).send("That username could not be found"))
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
    },
    showTerm: (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "../public/show.html"))
        // grab word ID from params
        // query database, send response to show for population
    },
    getTerm: (req, res) => {
        let { id } = req.params;
        sequelize.query(
            `
                select t.term_id, t.name, t.pronunciation, t.definition, t.use_case, u.username, u.user_id 
                from terms t 
                join users u 
                on t.user_id = u.user_id
                where t.term_id=${id};

                select count(like_id) as likes from likes where term_id=${id};
            `
        )
        .then(dbRes => {
            let term = dbRes[0][0];
            let likes = dbRes[0][1];
            let termObj = Object.assign({}, term, likes);
            res.status(200).send(termObj);
        })
        .catch(err => console.log(err))
    },
    mostLikedTerm: (req, res) => {
        sequelize.query(
            `
                select count(*) as likes, t.name, t.pronunciation, t.definition, t.use_case
                from terms t
                join likes l
                on t.term_id = l.term_id
                group by t.name, t.pronunciation, t.definition, t.use_case
                limit 1;
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

                create table if not exists likes (
                    like_id serial primary key,
                    user_id varchar references users(user_id),
                    term_id integer references terms(term_id)
                );

                insert into terms (name, pronunciation, definition, use_case, user_id)
                values 

                ('meenoo', 'MEEnoo', 'A cat.', '"Cha meenoo, come here and get you a treat"', 'enw183x2okwe3onlc'),

                ('mais yeah', 'MAY yeh', 'Showing affirmation to a question that the person answering believes is an obvious answer', '"Hey man, did you see the Saints play yesterday?"\n"Mais yeah, I never miss a game."', 'enw183x2okwe3onlc'),

                ('boudin', 'BOOdah', 'Sausage casing stuffed with rice, meat and vegetables', '"Nothing beats a hot plate of boudin after a long day."', 'enw183x2okwe3onlc'),

                ('ahnvee', 'AHNvee', 'Hunger, craving', '"I got me a strong ahnvee for some étouffée right about now."', 'enw183x2okwe3onlc'),

                ('boude', 'booDAY', 'To whine our pout', '"I don/t wanna hear you boude, do your homework and do it right."', 'enw183x2okwe3onlc'),

                ('domion', 'dohMEEawn', 'A peeping tom', '"I hear Cherie say that Bubba down the road is a domion. She caught him staring outside her window the other night"', 'enw183x2okwe3onlc'),

                ('each a one', 'eech A wun', 'One each', '"There are plenty of snacks to go around, get you each a one."', 'enw183x2okwe3onlc'),

                ('drawz', 'DRAWZ', 'Underwear', '"Boy, pick ya damn drawz up off the floor! I been telling you this for a week now."', 'enw183x2okwe3onlc'),

                ('fais do-do', 'fay DOH-doh', 'Go to sleep', '"Hey, it/s 9pm, that means it/s fais do-do time."', 'enw183x2okwe3onlc'),

                ('ga lee', 'GAH lee', 'An expression of surprise or astonishment', '"I went to get me a new mower today but ga lee boy them mowers are expensive."', 'enw183x2okwe3onlc'),

                ('hont', 'HAWN', 'A feeling of embarassment', '"I ripped my pants at the family reunion. Imagine the hont I felt after that."', 'enw183x2okwe3onlc'),

                ('nanan', 'nahNAHN', 'Term of endearment used to describe one/s godmother, synonymous with "Nanny"', '"Your Pa and I are going Zydeco dancing tonight, Nanan is gonna be watching you for til we get back"', 'enw183x2okwe3onlc'),

                ('étoufée', 'ayTOOfay', 'French-creole dish that is typically served with shellfish over rice', '"Make sure you/re home in time for dinner, yer mama/s makin/ crawfish étoufée tonight."', 'enw183x2okwe3onlc'),

                ('parran', 'PARrah', 'Term of endearment used to describe one/s godfather', '"Hey Pa, Parran offered to take me fishing! Can I please go?"', 'enw183x2okwe3onlc')
                ;

            `
        )
        .then(dbRes => res.status(200).send('DB seeded'))
        .catch(err => console.log(err));
    },
    addLike: (req, res) => {
        const { user_id } = req.session.user;
        const termId = req.params.id;
        sequelize.query(
            `
                insert into likes (user_id, term_id)
                values ('${user_id}', '${termId}');
            `
        )
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => res.status(404).send("Error liking term"));
    },
    removeLike: (req, res) => {
        const { user_id } = req.session.user;
        const termId = req.params.term_id;
        console.log(user_id, termId)
        sequelize.query(
            `
                delete from likes where user_id='${user_id}' and term_id='${termId}';
            `
        )
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => res.status(404).send("Error removing like"));
    },
    checkLikes: (req, res) => {
        if (req.session.user) {
            let userId = req.session.user.user_id;
            let termId = req.params.term_id

            sequelize.query(
                `select * from likes where term_id='${termId}' and user_id='${userId}';`
            )
            .then(dbRes => res.status(200).send(dbRes[0]))
        }
    }
}
