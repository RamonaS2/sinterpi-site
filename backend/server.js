const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const afiliadosRoutes = require('./routes/afiliadosRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/admin', adminRoutes);
app.use('/api/afiliados', afiliadosRoutes); // A rota de cadastro será /api/afiliados (POST)

sequelize.sync({ force: true }).then(() => { // Se precisar apagar e recriar, use { force: true } uma vez aqui
  console.log('Banco sincronizado');
  app.listen(process.env.PORT, () =>
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
  );
}).catch(err => {
  console.error('Erro na sincronização do banco de dados:', err);
});