import { apiLogin } from "../../../helpers/api-util";

export default async function handler(req, res) {
    const { username, password } = req.body;

    const user = await apiLogin({ username, password });

    if (user.error) {
        res.status(404).json({ alert: { type: 'error', message: 'Inavlid username or password'}})
    } else {
        res.status(200).json(user)
    }
}