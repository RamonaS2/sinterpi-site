const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = (req, res) => {
  const { usuario, senha } = req.body;

  const ADMIN_USER = process.env.ADMIN_USER || 'admin_producao'; 
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'senha_forte_producao_123!';
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    console.error('JWT_SECRET não definido. Verifique seu arquivo .env');
    return res.status(500).json({ mensagem: 'Erro de configuração do servidor.' });
  }

  if (usuario === ADMIN_USER && senha === ADMIN_PASSWORD) {
    const token = jwt.sign({ usuario: ADMIN_USER }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
};

module.exports = {
  login,
};