import { getLikesByTerm, removeLike } from "../../../helpers/api-util";

export default async function handler(req, res) {
    let term_id;
    switch (req.method) {
        case 'GET':
            term_id = +req.query.termId;
            const likes = await getLikesByTerm(term_id);
            res.json(likes);
        case 'DELETE':
            term_id = +req.query.termId;
            const user_id = req.body.user_id;
            let deletion = await removeLike(user_id, term_id);

            res.json({ deleted: true })
        // default: res.status(400).json({ message: `Method ${req.method} Not Allowed`})
    }
}