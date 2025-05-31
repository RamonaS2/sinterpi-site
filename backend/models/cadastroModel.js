const cadastros = [];

module.exports = {
  adicionarCadastro: (dados) => {
    cadastros.push(dados);
    return dados;
  },
  listarCadastros: () => {
    return cadastros;
  }
};
