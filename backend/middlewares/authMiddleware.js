// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ mensagem: 'Token não fornecido' });

  const token = authHeader.split(' ')[1]; // Assume formato "Bearer TOKEN"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.usuario; // Anexa o payload decodificado à requisição
    next(); // Continua para a próxima função middleware/rota
  } catch (error) {
    // Log do erro para depuração, mas não exiba para o cliente em produção por segurança
    console.error("Erro de validação do token:", error.message);
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;