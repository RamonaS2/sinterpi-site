const Afiliado = require('../models/Afiliado');
const path = require('path');
const fs = require('fs'); 

const cadastrarAfiliado = async (req, res) => {
  try {
    const { nome, cpf, rg, nascimento, email, telefone, municipio, cargo, localTrabalho, matricula, orgao, sindicalizar } = req.body; 
    
    // Verifique se req.files existe antes de acessar suas propriedades
    const identidade = req.files?.identidade?.[0]?.filename || null;
    const pedido = req.files?.pedido?.[0]?.filename || null;
    const comprovante = req.files?.comprovante?.[0]?.filename || null;

    const novoAfiliado = await Afiliado.create({
      nome, cpf, rg, nascimento, email, telefone, municipio, cargo, localTrabalho, matricula, orgao, sindicalizar, 
      identidade, pedido, comprovante
    });

    res.status(201).json(novoAfiliado);
  } catch (error) {
    console.error('Erro ao cadastrar afiliado:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar afiliado', detalhe: error.message });
  }
};

const listarAfiliados = async (req, res) => {
  try {
    const lista = await Afiliado.findAll();
    res.json(lista);
  } catch (error) {
    console.error('Erro ao listar afiliados:', error);
    res.status(500).json({ erro: 'Erro ao listar afiliados' });
  }
};

const excluirAfiliado = async (req, res) => {
  try {
    const id = req.params.id;
    const afiliado = await Afiliado.findByPk(id);

    if (!afiliado) {
      return res.status(404).json({ mensagem: 'Afiliado não encontrado' });
    }

    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (afiliado.identidade && fs.existsSync(path.join(uploadsDir, afiliado.identidade))) {
      fs.unlinkSync(path.join(uploadsDir, afiliado.identidade));
    }
    if (afiliado.pedido && fs.existsSync(path.join(uploadsDir, afiliado.pedido))) {
      fs.unlinkSync(path.join(uploadsDir, afiliado.pedido));
    }
    if (afiliado.comprovante && fs.existsSync(path.join(uploadsDir, afiliado.comprovante))) {
      fs.unlinkSync(path.join(uploadsDir, afiliado.comprovante));
    }

    await Afiliado.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao excluir afiliado:', error);
    res.status(500).json({ erro: 'Erro ao excluir afiliado' });
  }
};

const downloadDocumento = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', filename); // Caminho correto para a pasta 'uploads'

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`Arquivo não encontrado para download: ${filename}`, err);
      return res.status(404).json({ mensagem: 'Arquivo não encontrado.' });
    }
    res.download(filePath, (err) => {
      if (err) {
        console.error(`Erro ao fazer download do arquivo ${filename}:`, err);
        res.status(500).json({ mensagem: 'Erro ao baixar o arquivo.' });
      }
    });
  });
};


module.exports = {
  cadastrarAfiliado,
  listarAfiliados,
  excluirAfiliado,
  downloadDocumento, 
};