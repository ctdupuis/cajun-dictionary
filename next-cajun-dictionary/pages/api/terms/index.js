import { getAllTerms } from '../../../helpers/api-util';

export default async function handler(req, res) {
  const terms = await getAllTerms();
  if (terms) {
    res.status(200).json({ terms: terms })
  } else {
    res.status(404).json({ alert: { type: 'error', message: 'Error fetching terms'} })
  }
}
