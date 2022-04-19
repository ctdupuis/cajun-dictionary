import { getLikesByTerm, removeLike } from "../../../helpers/api-util";
const jwt = require('jsonwebtoken');
require('dotenv').config();

export default async function handler(req, res) {
    const { SECRET } = process.env;
    let term_id;
    switch (req.method) {
        case 'GET':
            term_id = +req.query.termId;
            const likes = await getLikesByTerm(term_id);
            res.json(likes);
        case 'DELETE':
            term_id = +req.query.termId;
            let token = req.headers.authorization.split(" ")[1];
            let user_id = jwt.verify(token, SECRET);
            let deletion = await removeLike(user_id, term_id);

            res.json({ deleted: true })
    }
}