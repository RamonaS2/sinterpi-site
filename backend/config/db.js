const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); 

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Opcional: desabilita logs SQL do Sequelize
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Conectado ao banco de dados MySQL com Sequelize!'))
  .catch((err) => console.error('Erro ao conectar no banco de dados:', err));

module.exports = sequelize;