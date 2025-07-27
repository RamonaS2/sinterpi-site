const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); 

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Opcional: desabilita logs SQL do Sequelize
    dialectOptions: { // Render pode precisar de SSL para Postgres
        ssl: {
            require: true,
            rejectUnauthorized: false // Para Render, pode ser necessário para aceitar self-signed certs
        }
    }
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Conectado ao banco de dados PostgreSQL com Sequelize!'))
  .catch((err) => console.error('Erro ao conectar no banco de dados:', err));

module.exports = sequelize;