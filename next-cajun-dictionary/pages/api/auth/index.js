import { getUserById } from '../../../helpers/api-util';

require('dotenv').config();
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    const { SECRET } = process.env;

    let token = req.headers.authorization.split(" ")[1]
    
    let decodedId = jwt.verify(token, SECRET);
    const user = await getUserById(decodedId)
    let safeUser = {...user}
    delete safeUser.password
    res.status(200).json({ user: safeUser })
}