const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  cadastrarAfiliado,
  listarAfiliados,
  excluirAfiliado,
  downloadDocumento, 
} = require('../controllers/afiliadoController'); 

const authMiddleware = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Rota para cadastro de afiliados (PÚBLICA)
router.post(
  '/', 
  upload.fields([
    { name: 'identidade', maxCount: 1 },
    { name: 'pedido', maxCount: 1 },
    { name: 'comprovante', maxCount: 1 },
  ]),
  cadastrarAfiliado // Não protegida
);

// Rotas protegidas (listar, excluir, download)
router.get('/', authMiddleware, listarAfiliados); // Acessada via /api/afiliados/
router.delete('/:id', authMiddleware, excluirAfiliado); // Acessada via /api/afiliados/:id
router.get('/download/:filename', authMiddleware, downloadDocumento); // Acessada via /api/afiliados/download/:tipo/:nomeArquivo

module.exports = router;