import { getTermById } from "../../../helpers/api-util";

export default async function handler(req, res) {
    const term = await getTermById(req.query.id);

    if (term) {
        res.status(200).json({ term: term })
    } else {
        res.status(404).json({ alert: { type: 'error', message: 'Error fetching term'}})
    }
    
}