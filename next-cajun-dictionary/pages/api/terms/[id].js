import { getTermById, getTermLikes } from "../../../helpers/api-util";

export default async function handler(req, res) {
    const term = await getTermById(req.query.id);
    const likes = await getTermLikes(term.term_id);
    const termObj = Object.assign({}, ...term, likes);

    if (term) {
        res.status(200).json({ term: termObj })
    } else {
        res.status(404).json({ alert: { type: 'error', message: 'Error fetching term'}})
    }
    
}