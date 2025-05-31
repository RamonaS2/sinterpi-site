const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const connection = require('../db');


// Configurar armazenamento com multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // pasta onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post(
  '/cadastro',
  upload.fields([
    { name: 'identidade', maxCount: 1 },
    { name: 'pedido', maxCount: 1 },
    { name: 'comprovante', maxCount: 1 }
  ]),
  (req, res) => {
    try {
      const {
        nome,
        cpf,
        rg,
        nascimento,
        email,
        telefone,
        endereco,
        municipio,
        cargo,
        localTrabalho,
        matricula,
        orgao,
        sindicalizar
      } = req.body;

      const arquivos = req.files;

      const sql = `
  INSERT INTO afiliados (
    nome, cpf, rg, data_nascimento, email, telefone, endereco,
    municipio, cargo, local_trabalho, matricula, orgao,
    deseja_sindicalizar, identidade_path, pedido_path, comprovante_path
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
  nome,
  cpf,
  rg,
  nascimento,
  email,
  telefone,
  endereco,
  municipio,
  cargo,
  localTrabalho,
  matricula,
  orgao,
  sindicalizar === 'true' ? 1 : 0,
  arquivos?.identidade?.[0]?.path || null,
  arquivos?.pedido?.[0]?.path || null,
  arquivos?.comprovante?.[0]?.path || null
];

connection.query(sql, values, (err, results) => {
  if (err) {
    console.error('Erro ao salvar no banco:', err);
    return res.status(500).json({ mensagem: 'Erro ao salvar no banco de dados.' });
  }

  console.log('Cadastro salvo com sucesso!');
  res.status(200).json({ mensagem: 'Cadastro salvo no banco com sucesso!' });
});

    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao processar cadastro.' });
    }
  }
);

// ✅ Rota de listagem dos afiliados
router.get('/afiliados', (req, res) => {
  const sql = 'SELECT * FROM afiliados';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar afiliados:', err);
      return res.status(500).json({ error: 'Erro ao buscar afiliados' });
    }
    res.status(200).json(results);
  });
  console.log('Rotas carregadas');
});


module.exports = router;
