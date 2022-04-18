import { apiLogin } from "../../../helpers/api-util";
require('dotenv').config();
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    const { SECRET } = process.env;
    const { username, password } = req.body;

    const user = await apiLogin({ username, password });

    if (user.error) {
        res.status(400).json({ alert: { type: 'error', message: 'Invalid username or password'}})
    } else {
        let safeUser = {...user};
        delete safeUser.password;
        let token = jwt.sign(user.user_id, SECRET);
        res.status(200).json({ user: safeUser, token: token });
    }
}