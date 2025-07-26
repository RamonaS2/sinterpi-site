const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Afiliado = sequelize.define('Afiliado', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rg: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  nascimento: { 
    type: DataTypes.DATEONLY, // Usar DATEONLY para armazenar apenas a data (YYYY-MM-DD)
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  municipio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  localTrabalho: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  matricula: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  orgao: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  sindicalizar: { 
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  identidade: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  comprovante: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  pedido: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Afiliado;