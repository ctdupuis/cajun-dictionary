import { apiLogin } from "../../../helpers/api-util";
const jwt = require('jsonwebtoken');
require('dotenv').config();

export default async function handler(req, res) {
    const { SECRET } = process.env;
    const { username, password } = req.body;

    const user = await apiLogin({ username, password });

    if (user.error) {
        res.status(400).json({ alert: { type: 'error', message: 'Inavlid username or password'}})
    } else {
        // let token = jwt.sign({ user }, SECRET, { algorithm: 'RS256'})
        // res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        //    httpOnly: true, secure: process.env.NODE_ENV !== 'development', maxAge: 60 * 60 * 24 * 7, sameSite: 'strict', path: '/'
        // }))
        res.status(200).json(user)
    }
}