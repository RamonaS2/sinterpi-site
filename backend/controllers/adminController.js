const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const login = (req, res) => {
  const { usuario, senha } = req.body;


  if (usuario === 'admin' && senha === 'admin123') {
    const token = jwt.sign({ usuario: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
};

module.exports = {
  login,
};