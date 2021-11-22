const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');

class User {
    constructor(username, password) {
        this.id = uniqid();
        this.username = username;

        
        const salt = bcrypt.genSaltSync(6);
        const encrypted = bcrypt.hashSync(password, salt);
        this.password = encrypted;


        this.constructor.all.push(this);
    };

    static all = [];

    static clearAll = () => {
        this.all = [];
    }

    authenticate = (password) => {
        return bcrypt.compareSync(password, this.password);
    }

};

module.exports = User;