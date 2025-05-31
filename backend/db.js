const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sinterpi_user',       // ou 'root'
  password: 'senha123',        // a senha que você criou
  database: 'sinterpi_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL com sucesso!');
  }
});

module.exports = connection;
