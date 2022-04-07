import db from '../../helpers/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    db.query(
      `
      select t.term_id, t.name, t.pronunciation, t.definition, use_case, u.username 
      from terms t
      join users u
      on t.user_id = u.user_id
      order by name asc;
      `
    ).then(dbRes => res.status(200).json({ terms: dbRes[0] })); 
  }
}
