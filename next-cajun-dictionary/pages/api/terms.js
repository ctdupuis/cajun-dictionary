// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_STRING, {
  dialect: 'postgres', 
  dialectOptions: {
      ssl: {
          rejectUnauthorized: false
      }
  }
})

const fetchAllTerms = async() => {
  sequelize.query(
    `
        select t.term_id, t.name, t.pronunciation, t.definition, use_case, u.username 
        from terms t
        join users u
        on t.user_id = u.user_id
        order by name asc;
    `
  ).then(dbRes => dbRes[0])
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    sequelize.query(
      `
      select t.term_id, t.name, t.pronunciation, t.definition, use_case, u.username 
      from terms t
      join users u
      on t.user_id = u.user_id
      order by name asc;
      `
    ).then(dbRes => res.status(200).json({ terms: dbRes[0]})); 
  }
}
