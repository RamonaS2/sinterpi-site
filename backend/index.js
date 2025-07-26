const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(cors());

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Rota para receber dados do formulário
app.post(
  "/cadastro",
  upload.fields([
    { name: "rgFile", maxCount: 1 },
    { name: "afiliacaoFile", maxCount: 1 },
    { name: "enderecoFile", maxCount: 1 },
  ]),
  (req, res) => {
    const {
      nome,
      cpf,
      rg,
      dataNascimento,
      email,
      telefone,
      endereco,
      municipio,
      cargo,
      localTrabalho,
      matricula,
      orgao,
      desejaSindicalizar,
    } = req.body;

    const arquivos = {
      rgFile: req.files["rgFile"]?.[0]?.filename || null,
      afiliacaoFile: req.files["afiliacaoFile"]?.[0]?.filename || null,
      enderecoFile: req.files["enderecoFile"]?.[0]?.filename || null,
    };

    console.log("📩 Novo cadastro recebido:");
    console.log({
      nome,
      cpf,
      rg,
      dataNascimento,
      email,
      telefone,
      endereco,
      municipio,
      cargo,
      localTrabalho,
      matricula,
      orgao,
      desejaSindicalizar,
      arquivos,
    });

    res.json({ message: "Cadastro enviado com sucesso!" });
  }
);

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
});
