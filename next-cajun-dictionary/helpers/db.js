require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DB_STRING, {
  dialect: 'postgres', 
  dialectOptions: {
      ssl: {
          rejectUnauthorized: false
      }
  }
})

export default db;