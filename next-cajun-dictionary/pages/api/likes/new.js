import { createLike } from "../../../helpers/api-util";

export default async function handler(req, res) {
    const { term_id, user_id } = req.body;
    const insertion = await createLike(user_id, term_id);
    res.status(200).json({ created: true })
}