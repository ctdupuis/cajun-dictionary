import { createLike } from "../../../helpers/api-util";

export default async function handler(req, res) {
    res.status(200).json({ message: 'Create like endpoint'})
}